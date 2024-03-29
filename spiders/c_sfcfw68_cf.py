import requests
import re

from anti_header import Header
from parsel import Selector

from dbhandler import init_connection, execute_insert


def data_format_save(data):
    init_connection(user='root', database='crawler', host='39.108.239.68')
    cols, values = zip(*data.items())
    table = "changfang_index"
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
            'cityp': area,
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
        data_format_save(_item)
    return collects


if __name__ == '__main__':
    # unit_test()
    # get_html()
    for base_area in ["sz", "hz", "dg"]:
        parse_html(get_html(base_area), area=base_area)
