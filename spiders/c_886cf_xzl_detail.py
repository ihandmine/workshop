import requests
from anti_header import Header
from parsel import Selector

from dbhandler import init_connection, execute_insert, execute_query


def data_format_save(data):
    init_connection(user='root', password='123456', database='crawler', host='172.16.9.133')
    cols, values = zip(*data.items())
    table = "sz_xiezilou_detail"
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
        "other_info": parser.xpath('//td/text()').get(),
        "detail": '\n'.join([li.xpath('./span[1]/text()').get() + li.xpath('./span[2]/text()').get() for li in parser.xpath('//ul[@class="miaoshu-ul"]/li')]),
        "img_url": ','.join(parser.xpath('//div[@id="bz_photo"]/img/@src').extract()),
        "zhuangxiu": parser.xpath('//div[@class="info-box clearfix"][2]/dl[1]/dt/text()').get(),
        "mianzu": parser.xpath('//div[@class="info-box clearfix"][2]/dl[2]/dt/text()').get(),
        "loupan": parser.xpath('//a[@class="a1"]/text()').get(),
        "zhuce": parser.xpath('//span[@class="colorGreen note"]/text()').get(),
        "fenge": parser.xpath('//span[@class="colorRed note"][1]/text()').get(),
        "shangwuqu": parser.xpath('//span[@class="colorBlue note"]/text()').get(),
        "chewei": parser.xpath('//span[@class="colorRed note"][2]/text()').get(),
    }
    collects.append(_item)
    print(_item)
    data_format_save(_item)
    return collects


def unit_test():
    cookies = {
        'Hm_lvt_69214bfe022204d284415be8d2b7d049': '1676269321',
        'Hm_lpvt_69214bfe022204d284415be8d2b7d049': '1676859492',
    }

    headers = {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Host': 'www.sfcfw68.com',
        # 'Cookie': 'Hm_lvt_69214bfe022204d284415be8d2b7d049=1676269321; Hm_lpvt_69214bfe022204d284415be8d2b7d049=1676859492',
        'Pragma': 'no-cache',
        'Referer': 'http://www.sfcfw68.com/sz/index.html',
        'Upgrade-Insecure-Requests': '1',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36',
    }

    response = requests.get('http://www.sfcfw68.com/sz/index_2.html', cookies=cookies, headers=headers, verify=False)
    print(response.text)
    print(response.status_code)
    response = requests.get('http://www.sfcfw68.com/sz/index_2.html', cookies=cookies, headers=headers, verify=False)
    print(response.content.decode('utf-8'))
    print(response.status_code)


def run():
    _sql = "select * from sz_xiezilou_index"
    init_connection(user='root', password='123456', database='crawler', host='172.16.9.133')
    data = execute_query(_sql)
    for item in data:
        parse_html(get_html(item=item), item)


if __name__ == '__main__':
    run()
