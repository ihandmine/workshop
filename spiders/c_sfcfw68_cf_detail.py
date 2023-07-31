import requests
from anti_header import Header
from parsel import Selector

from dbhandler import init_connection, execute_insert, execute_query


def data_format_save(data):
    init_connection(user='root', database='crawler', host='39.108.239.68')
    cols, values = zip(*data.items())
    table = "changfang_detail"
    sql = "INSERT INTO `{}` ({}) VALUES ({})".format(
        table,
        ','.join(cols),
        ','.join(['%s'] * len(values))
    )
    execute_insert(sql, values)


def get_html(item, area) -> str:
    """
    http://www.sfcfw68.com/sz/cfcz/35277.html
    """
    base_url: str = f"http://www.sfcfw68.com/{area}/cfcz/{item['item_id']}.html"
    headers: dict = Header(browser='chrome', connection=True).base.to_unicode_dict()
    response = requests.get(base_url, headers=headers)
    # print(response.content.decode('utf-8'))
    # print(response.status_code)
    return response.content.decode('utf-8')


def parse_html(html: str, item: dict, area: str) -> list:
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
                'cityp': area,
                "img_url": ",".join(parser.xpath('//div[@class="box_list2"]/div/img/@src').extract()),
                "img_url_local": "",
                "detail": parser.xpath('//div[@class="box_list2"]/span//text()').get() or " ",
                "area": item['area'],
                "gongdian":  parser.xpath('//ul[@class="listconn_3_Rr_c"]/li[1]/p[3]/label/text()').get() or " ",
                "xinjiu": parser.xpath('//ul[@class="listconn_3_Rr_c"]/li[2]/p[1]/label/text()').get() or " ",
                "bangonshi": parser.xpath('//ul[@class="listconn_3_Rr_c"]/li[2]/p[2]/label/text()').get() or " ",
                "dianfei": parser.xpath('//ul[@class="listconn_3_Rr_c"]/li[2]/p[3]/label/text()').get() or " ",
                "shitang": parser.xpath('//ul[@class="listconn_3_Rr_c"]/li[3]/p[1]/label/text()').get() or " ",
                "sushe": parser.xpath('//ul[@class="listconn_3_Rr_c"]/li[3]/p[2]/label/text()').get() or " ",
                "dianti": parser.xpath('//ul[@class="listconn_3_Rr_c"]/li[3]/p[3]/label/text()').get() or " ",
    }
    collects.append(_item)
    print(_item)
    if _item['img_url']:
        for index, _url in enumerate(_item['img_url'].split(',http')):
            headers: dict = Header(browser='chrome', connection=True).base.to_unicode_dict()
            uml = f"http{_url}" if not _url.startswith('http') else _url
            response = requests.get(uml, headers=headers)
            with open(f'../downloads/{_item["item_id"]}_{index}.jpg', 'wb') as f:
                f.write(response.content)
    data_format_save(_item)
    return collects


def run():
    _sql = "select * from changfang_index"
    init_connection(user='root', database='crawler', host='39.108.239.68')
    data = execute_query(_sql)
    for item in data:
        parse_html(get_html(item=item, area=item['cityp']), item, item['cityp'])


if __name__ == '__main__':
    run()
