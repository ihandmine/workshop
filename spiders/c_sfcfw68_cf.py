import requests
import re

from anti_header import Header
from parsel import Selector

from dbhandler import init_connection, execute_insert


def data_format_save(data, area):
    init_connection(user='root', password='123456', database='crawler', host='172.16.9.133')
    # init_connection(user='root', password='123456', database='crawler', host='39.108.239.68')
    cols, values = zip(*data.items())
    # table = "sz_changfang_index"
    table = "%s_changfang_index" % area
    # table = "dg_changfang_index"
    sql = "INSERT INTO `{}` ({}) VALUES ({})".format(
        table,
        ','.join(cols),
        ','.join(['%s'] * len(values))
    )
    execute_insert(sql, values)


def get_html(area) -> str:
    base_url: str = f"http://www.sfcfw68.com/{area}/index_2.html"
    headers: dict = Header(browser='chrome', connection=True).base.to_unicode_dict()
    response = requests.get(base_url, headers=headers)
    # print(response.content.decode('utf-8'))
    # print(response.status_code)
    return response.content.decode('utf-8')


def parse_html(html: str, area: str) -> list:
    parser: Selector = Selector(html)
    """
    parse response content to dict type
    """
    collects = []
    for left_fen in parser.xpath('//div[@class="listLeft_fen"]'):
        string_node_sf = left_fen.xpath('.//div[@class="listLeft_fen_word_3"]/text()').get().split("\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0")
        _item = {
            'title': left_fen.xpath('.//div[@class="listLeft_fen_word_1"]/a/text()').get(),
            'item_id': ''.join(re.findall(r"\d+", left_fen.xpath('.//div[@class="listLeft_fen_pic"]/a/@href').get())),
            'detail': left_fen.xpath(".//div[@class='listLeft_fen_word_2']/text()").get(),
            'address': left_fen.xpath('.//div[@class="listLeft_fen_zi"]//b/text()').get(),
            'img_url': left_fen.xpath('.//div[@class="listLeft_fen_pic"]//img/@src').get(),
            'structure': string_node_sf[0],
            'floor': string_node_sf[1],
            # 'price_day': "",
            'area': left_fen.xpath('.//div[@class="listLeft_fen_zi"]//label[2]/text()').get()
        }
        price_month = left_fen.xpath('.//div[@class="listLeft_fen_zi"]//label[1]/text()').get()
        if "面议" in price_month:
            price_month = 0
        _item['price_month'] = price_month
        collects.append(_item)
        print(_item)
        headers: dict = Header(browser='chrome', connection=True).base.to_unicode_dict()
        response = requests.get(_item['img_url'], headers=headers)
        with open(f'../downloads/{_item["item_id"]}.jpg', 'wb') as f:
            f.write(response.content)
        data_format_save(_item, area)
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
    for base_area in ["sz", "hz", "dg"]:
        parse_html(get_html(base_area), area=base_area)
