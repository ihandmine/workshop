import requests
from anti_header import Header
from parsel import Selector

from dbhandler import init_connection, execute_insert, execute_query


AREA = "hz"


def data_format_save(data):
    # init_connection(user='root', password='123456', database='crawler', host='172.16.9.133')
    init_connection(user='root', password='123456', database='crawler', host='39.108.239.68')
    cols, values = zip(*data.items())
    table = "%s_changfang_detail" % AREA
    # table = "hz_changfang_index"
    # table = "dg_changfang_index"
    sql = "INSERT INTO `{}` ({}) VALUES ({})".format(
        table,
        ','.join(cols),
        ','.join(['%s'] * len(values))
    )
    execute_insert(sql, values)


def get_html(item) -> str:
    """
    http://www.sfcfw68.com/sz/cfcz/35277.html
    """
    base_url: str = f"http://www.sfcfw68.com/{AREA}/cfcz/{item['item_id']}.html"
    headers: dict = Header(browser='chrome', connection=True).base.to_unicode_dict()
    response = requests.get(base_url, headers=headers)
    # print(response.content.decode('utf-8'))
    # print(response.status_code)
    return response.content.decode('utf-8')


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
                "img_url": ",".join(parser.xpath('//div[@class="box_list2"]/div/img/@src').extract()),
                "detail": parser.xpath('//div[@class="box_list2"]/span//text()').get(),
                "area": item['area'],
                "gongdian":  parser.xpath('//ul[@class="listconn_3_Rr_c"]/li[1]/p[3]/label/text()').get(),
                "xinjiu": parser.xpath('//ul[@class="listconn_3_Rr_c"]/li[2]/p[1]/label/text()').get(),
                "bangonshi": parser.xpath('//ul[@class="listconn_3_Rr_c"]/li[2]/p[2]/label/text()').get(),
                "dianfei": parser.xpath('//ul[@class="listconn_3_Rr_c"]/li[2]/p[3]/label/text()').get(),
                "shitang": parser.xpath('//ul[@class="listconn_3_Rr_c"]/li[3]/p[1]/label/text()').get(),
                "sushe": parser.xpath('//ul[@class="listconn_3_Rr_c"]/li[3]/p[2]/label/text()').get(),
                "dianti": parser.xpath('//ul[@class="listconn_3_Rr_c"]/li[3]/p[3]/label/text()').get(),
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
    _sql = "select * from %s_changfang_index" % AREA
    # init_connection(user='root', password='123456', database='crawler', host='172.16.9.133')
    init_connection(user='root', password='123456', database='crawler', host='39.108.239.68')
    data = execute_query(_sql)
    for item in data:
        parse_html(get_html(item=item), item)


if __name__ == '__main__':
    run()
