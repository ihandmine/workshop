import requests
from anti_header import Header
from parsel import Selector

from dbhandler import init_connection, execute_insert, execute_query


def data_format_save(data):
    init_connection(user='root', database='crawler', host='39.108.239.68')
    cols, values = zip(*data.items())
    table = "xiezilou_detail"
    sql = "INSERT INTO `{}` ({}) VALUES ({})".format(
        table,
        ','.join(cols),
        ','.join(['%s'] * len(values))
    )
    execute_insert(sql, values)


def get_html(item: dict=None) -> str:
    base_url: str = item['item_url']
    headers: dict = Header(browser='chrome', connection=True, platform='windows').base.to_unicode_dict()
    response = requests.get(base_url, headers=headers)
    # print(response.content.decode('utf-8'))
    # print(response.status_code)
    # return response.content.decode('utf-8')
    return response.text


def parse_html(html: str, item: dict) -> list:
    parser: Selector = Selector(html)
    """
    parse response content to dict type
    """
    collects = []
    _item = {
        'index_id': item['auto_id'],
        'item_id': item['item_id'],
        "title": item['title'],
        "address": item['address'],
        "structure": item['structure'],
        "floor": item['floor'],
        "price_day": item['price_day'],
        "price_month": item['price_month'],
        "area": item['area'],
        'cityp': item['cityp'],
        "other_info": parser.xpath('//td/text()').get() or "",
        "detail": '\n'.join([li.xpath('./span[1]/text()').get() + li.xpath('./span[2]/text()').get() for li in parser.xpath('//ul[@class="miaoshu-ul"]/li')]),
        "img_url": ','.join(parser.xpath('//div[@id="bz_photo"]/img/@src').extract()) or "",
        'img_url_local': '',
        "zhuangxiu": parser.xpath('//div[@class="info-box clearfix"][2]/dl[1]/dt/text()').get() or "",
        "mianzu": parser.xpath('//div[@class="info-box clearfix"][2]/dl[2]/dt/text()').get() or "",
        "loupan": parser.xpath('//a[@class="a1"]/text()').get() or "",
        "zhuce": parser.xpath('//span[@class="colorGreen note"]/text()').get() or "",
        "fenge": parser.xpath('//span[@class="colorRed note"][1]/text()').get() or "",
        "shangwuqu": parser.xpath('//span[@class="colorBlue note"]/text()').get() or "",
        "chewei": parser.xpath('//span[@class="colorRed note"][2]/text()').get() or "",
    }
    collects.append(_item)
    print(_item)
    for index, _url in enumerate(_item['img_url'].split(',http')):
        headers: dict = Header(browser='chrome', connection=True).base.to_unicode_dict()
        if _url:
            uml = f"http{_url}" if not _url.startswith('http') else _url
            response = requests.get(uml, headers=headers)
            with open(f'../downloads/{_item["item_id"]}_{index}.jpg', 'wb') as f:
                f.write(response.content)
    data_format_save(_item)
    return collects


def run():
    _sql = "select * from xiezilou_index"
    init_connection(user='root', database='crawler', host='39.108.239.68')
    data = execute_query(_sql)
    for item in data:
        parse_html(get_html(item=item), item)


if __name__ == '__main__':
    run()
