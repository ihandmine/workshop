import requests
import re

from anti_header import Header
from parsel import Selector

from dbhandler import init_connection, execute_insert


def data_format_save(data):
    init_connection(user='root', database='crawler', host='39.108.239.68')
    cols, values = zip(*data.items())
    table = "xiezilou_index"
    sql = "INSERT INTO `{}` ({}) VALUES ({})".format(
        table,
        ','.join(cols),
        ','.join(['%s'] * len(values))
    )
    execute_insert(sql, values)


def get_html() -> str:
    base_url: str = "http://xzl.886cf.com/xzllist-sz-lh/?page=2"
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
            'item_url': left_fen.xpath('.//@href').get(),
            'structure': "",
            'floor': "",
            'cityp': "sz",
            # 'price_day': "",
            'area': ''.join(re.findall(r"\d+", left_fen.xpath('.//dd[@class="mianji"]/span/text()').get())) or 0
        }
        price_month = ''.join(re.findall(r"\d+", left_fen.xpath('.//span[@class="price-b"]/text()').get())) or 0
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
    parse_html(get_html())
