import requests
import re

from anti_header import Header
from parsel import Selector

from dbhandler import init_connection, execute_insert


def data_format_save(data):
    init_connection(user='root', password='123456', database='crawler', host='172.16.9.133')
    cols, values = zip(*data.items())
    table = "sz_xiezilou_index"
    sql = "INSERT INTO `{}` ({}) VALUES ({})".format(
        table,
        ','.join(cols),
        ','.join(['%s'] * len(values))
    )
    execute_insert(sql, values)


def get_html() -> str:
    base_url: str = "http://xzl.886cf.com/xzllist-sz/?page=2"
    headers: dict = Header(browser='chrome', connection=True, platform='windows').base.to_unicode_dict()
    response = requests.get(base_url, headers=headers)
    # print(response.content.decode('utf-8'))
    # print(response.status_code)
    # return response.content.decode('utf-8')
    return response.text


def parse_html(html: str) -> list:
    parser: Selector = Selector(html)
    """
    parse response content to dict type
    """
    collects = []
    for left_fen in parser.xpath('//*[@id="list-content"]/a'):
        _item = {
            'detail': left_fen.xpath('.//dt[@class="item-title"]/@title').get(),
            'item_id': ''.join(re.findall(r"/(\d+)-\d+.html", left_fen.xpath('.//@href').get())),
            'title': left_fen.xpath(".//dl/dd[1]/span[1]/text()").get(),
            'address': left_fen.xpath('.//dl/dd[1]/span[2]/text()').get(),
            'img_url': left_fen.xpath('.//img/@src').get(),
            'structure': "",
            'floor': "",
            # 'price_day': "",
            'area': ''.join(re.findall(r"\d+", left_fen.xpath('.//dd[@class="mianji"]/span/text()').get())) or 0
        }
        price_month = ''.join(re.findall(r"\d+", left_fen.xpath('.//span[@class="price-b"]/text()').get())) or 0
        if "面议" in price_month:
            price_month = 0
        _item['price_month'] = price_month
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


if __name__ == '__main__':
    # unit_test()
    # get_html()
    parse_html(get_html())
