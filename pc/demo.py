import math
import platform
import re

import uvicorn
from fastapi import FastAPI
from fastapi import Form
from fastapi import Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from starlette.requests import Request
from starlette.templating import Jinja2Templates

from dbhandler import execute_query, init_connection

app = FastAPI()

app.mount('/static', StaticFiles(directory='static'), name='static')


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 挂载模版文件夹
templates = Jinja2Templates(directory='templates')

address_mapping = {
    "深圳": ['龙岗', '横岗', '坪山', '坪地', '坑梓', '平湖', '观澜', '龙华', '布吉', '坂田', '民治', '大浪', '新安', '西乡', '福永', '沙井', '松岗', '石岩',
           '光明', '公明', '沙头角', '海山', '盐田', '梅沙', '葵涌', '大鹏', '南澳'],
    "东莞": ["塘厦", "清溪", "黄江", "大朗", "虎门", "大岭山", "石排", "横沥", "企石", "常平", "桥头", "凤岗", "樟木头", "谢岗", "东坑", "寮步", "茶山", "长安",
           "沙田", "厚街", "东城", "南城", "莞城", "石龙", "石碣", "高埗", "望牛墩", "洪梅", "万江", "道滘", "中堂", "麻涌"],
    "惠州": ["新圩", "镇隆", "秋长", "淡水", "沙田", "永湖", "良井", "平潭", "三和", "霞涌", "澳头", "西区", "陈江", "惠环", "沥林", "潼侨", "潼湖", "桥东",
           "桥西", "江南", "江北", "龙丰", "水口", "河南岸", "小金口", "马安", "横沥", "芦洲", "汝湖", "三栋", "平山", "大岭", "白花", "梁化", "稔山", "铁涌",
           "平海", "吉隆", "黄埠", "多祝", "白盆珠", "安墩", "高潭", "宝口", "罗阳", "龙溪", "龙华", "园洲", "石湾", "福田", "长宁", "湖镇", "横河", "柏塘",
           "公庄", "观音阁", "杨侨", "麻陂", "石坝", "泰美", "杨村", "平陵", "龙城", "地派", "龙田", "麻榨", "龙江", "龙潭"]

}


if platform.system() != "Linux":
    db_host = "39.108.239.68"
    db_password = 'Q#az132..'
else:
    db_host = "172.16.9.133"
    db_password = '123456'


@app.get("/")
async def index(request: Request):
    _sql_sz = """
        select * from sz_changfang_index order by auto_id desc limit 13
    """
    _sql_hz = """
        select * from hz_changfang_index order by auto_id desc limit 13
    """
    _sql_dg = """
        select * from dg_changfang_index order by auto_id desc limit 13
    """
    _sql_sz_xiezi = """
        select * from sz_xiezilou_index order by auto_id desc limit 13
    """
    _sql_sz_xiezi_title = """
        select DISTINCT title from sz_xiezilou_index limit 12
    """
    init_connection(user='root', password=db_password, database='crawler', host=db_host)
    data_sz = execute_query(_sql_sz)
    data_hz = execute_query(_sql_hz)
    data_dg = execute_query(_sql_dg)
    data_xiezi = execute_query(_sql_sz_xiezi)
    data_xiezi_title = execute_query(_sql_sz_xiezi_title)
    data = {
        "map": address_mapping,
        "data_sz": data_sz,
        "data_hz": data_hz,
        "data_dg": data_dg,
        "data_xiezi": data_xiezi,
        "data_xiezi_title": data_xiezi_title,
    }
    return templates.TemplateResponse("index.html", {"request": request, "data": data})


@app.get("/index")
async def index(request: Request):
    _sql_sz = """
        select * from sz_changfang_index order by auto_id desc limit 13
    """
    _sql_hz = """
        select * from hz_changfang_index order by auto_id desc limit 13
    """
    _sql_dg = """
        select * from dg_changfang_index order by auto_id desc limit 13
    """
    _sql_sz_xiezi = """
        select * from sz_xiezilou_index order by auto_id desc limit 13
    """
    _sql_sz_xiezi_title = """
        select DISTINCT title from sz_xiezilou_index limit 12
    """
    init_connection(user='root', password=db_password, database='crawler', host=db_host)
    data_sz = execute_query(_sql_sz)
    data_hz = execute_query(_sql_hz)
    data_dg = execute_query(_sql_dg)
    data_xiezi = execute_query(_sql_sz_xiezi)
    data_xiezi_title = execute_query(_sql_sz_xiezi_title)
    data = {
        "map": address_mapping,
        "data_sz": data_sz,
        "data_hz": data_hz,
        "data_dg": data_dg,
        "data_xiezi": data_xiezi,
        "data_xiezi_title": data_xiezi_title,
    }
    return templates.TemplateResponse("index.html", {"request": request, "data": data})


@app.get("/chuzu")
async def index(request: Request, page=Query(1), area=Query("深圳"), area_id=Query(""), price=Query(""), space=Query(""),
                strc=Query(''), floor=Query(""), keyword=Query("")):
    table_prefix = area == "深圳" and "sz" or area == "东莞" and "dg" or area == "惠州" and "hz"
    if page is None or page == 1:
        _sql = "select * from %s_changfang_index limit 0, 10" % table_prefix
    else:
        _sql = "select * from %s_changfang_index limit %s, 10" % (table_prefix, int(page) * 10)
    count_sql = "select count(*) from %s_changfang_index" % table_prefix
    if area_id or price or space or strc or floor or keyword:
        price_start, price_end = 0, 100
        space_start, space_end = 0, 99999
        if price:
            price_start, price_end = price.split(',')
        if space:
            space_start, space_end = space.split(',')
        _sql = """
            SELECT
                * 
            FROM
                %s_changfang_index 
            WHERE
                locate( '%s', address ) > 0 
                AND locate( '%s', detail ) > 0 
                AND locate( '%s', structure ) > 0 
                AND locate( '%s', floor ) > 0 
                AND price_month >=% s 
                AND price_month <= % s AND area >=% s 
                AND area <= % s 
                LIMIT 0,
                10
        """ % (
            table_prefix, area_id, keyword, strc, floor, price_start, price_end, space_start, space_end)
        count_sql = """
            SELECT
                count(*) 
            FROM
                %s_changfang_index 
            WHERE
                locate( '%s', address ) > 0 
                AND locate( '%s', detail ) > 0 
                AND locate( '%s', structure ) > 0 
                AND locate( '%s', floor ) > 0 
                AND price_month >=% s 
                AND price_month <= % s AND area >=% s 
                AND area <= %s
        """ % (
            table_prefix, area_id, keyword, strc, floor, price_start, price_end, space_start, space_end)
    init_connection(user='root', password=db_password, database='crawler', host=db_host)
    data = execute_query(_sql)
    print(_sql)
    total_count = execute_query(count_sql)[0]["count(*)"]
    page_count = math.floor(total_count / 10) if total_count >= 10 else 1
    other = {
        "total": total_count,
        "page": page_count,
        "current_page": int(page) or 1,
        "areas": address_mapping[area],
        "area_id": area_id,
        "price": price,
        "space": space,
        "strc": strc,
        "floor": floor,
        "keyword": keyword,
        "area": area
    }
    return templates.TemplateResponse("chuzu.html", {"request": request, "data": data[:10], "other": other})


@app.get("/xiezilou")
async def index(request: Request, page=Query(1), area=Query("深圳"), area_id=Query(""), price=Query(""), space=Query(""),
                keyword=Query("")):
    if page is None or page == 1:
        _sql = "select * from sz_xiezilou_index limit 0, 10"
    else:
        _sql = "select * from sz_xiezilou_index limit %s, 10" % (int(page) * 10)
    count_sql = "select count(*) from sz_xiezilou_index"
    if area_id or price or space or keyword:
        price_start, price_end = 0, 100000
        space_start, space_end = 0, 99999
        if price:
            price_start, price_end = price.split(',')
        if space:
            space_start, space_end = space.split(',')
        _sql = """
            SELECT
                * 
            FROM
                sz_xiezilou_index 
            WHERE
                locate( '%s', address ) > 0 
                AND locate( '%s', detail ) > 0 
                AND price_month >=% s 
                AND price_month <= % s AND area >=% s 
                AND area <= % s 
                LIMIT 0,
                10
        """ % (
            area_id, keyword, price_start, price_end, space_start, space_end)
        count_sql = """
            SELECT
                count(*) 
            FROM
                sz_xiezilou_index 
            WHERE
                locate( '%s', address ) > 0 
                AND locate( '%s', detail ) > 0 
                AND price_month >= %s 
                AND price_month <= %s AND area >= %s 
                AND area <= %s
        """ % (
            area_id, keyword, price_start, price_end, space_start, space_end)
    init_connection(user='root', password=db_password, database='crawler', host=db_host)
    data = execute_query(_sql)
    print(_sql)
    total_count = execute_query(count_sql)[0]["count(*)"]
    page_count = math.floor(total_count / 10) if total_count >= 10 else 1
    other = {
        "total": total_count,
        "page": page_count,
        "current_page": int(page) or 1,
        "areas": address_mapping[area],
        "area_id": area_id,
        "price": price,
        "space": space,
        "keyword": keyword,
        "area": area
    }
    return templates.TemplateResponse("xiezilou.html", {"request": request, "data": data[:10], "other": other})


@app.get("/keywords")
async def index(request: Request, keyword=Query(""), page_type=Query("changfang"), area=Query('深圳')):
    _sql = """
            SELECT
                * 
            FROM
                sz_%s_index 
            WHERE
                locate( '%s', detail ) > 0 
                LIMIT 0,
                10
    """ % (page_type, keyword)

    count_sql = """
            SELECT
                count(*) 
            FROM
                sz_%s_index 
            WHERE
                locate( '%s', detail ) > 0 
    """ % (page_type, keyword)
    init_connection(user='root', password=db_password, database='crawler', host=db_host)
    data = execute_query(_sql)
    print(_sql)
    total_count = execute_query(count_sql)[0]["count(*)"]
    page_count = math.floor(total_count / 10) if total_count >= 10 else 1
    other = {
        "total": total_count,
        "page": page_count,
        "current_page": 1,
        "areas": address_mapping[area],
        "area_id": "",
        "price": "",
        "space": "",
        "keyword": keyword,
        "area": area
    }
    if page_type == "xiezilou":
        return templates.TemplateResponse("xiezilou.html", {"request": request, "data": data[:10], "other": other})
    else:
        return templates.TemplateResponse("chuzu.html", {"request": request, "data": data[:10], "other": other})


@app.get("/item")
async def index(request: Request, item_id=Query(""), area=Query("深圳")):
    table_prefix = area == "深圳" and "sz" or area == "东莞" and "dg" or area == "惠州" and "hz"
    _sql = """
        select * from %s_changfang_detail where item_id='%s'
    """ % (table_prefix, item_id)
    init_connection(user='root', password=db_password, database='crawler', host=db_host)
    data = execute_query(_sql)[0]
    data['images'] = data['img_url'].split(',')

    _sql_recommand = """
            SELECT
                * 
            FROM
                %s_changfang_index 
            WHERE
                locate( '%s', address) > 0 
                LIMIT 5
    """ % (table_prefix, data['address'])
    data_recommand = execute_query(_sql_recommand)
    other = {
        "recommand": data_recommand,
        "area": area
    }
    return templates.TemplateResponse("detail.html", {"request": request, "data": data, "other": other})


@app.get("/xzl_item")
async def index(request: Request, item_id=Query("")):
    _sql = """
        select * from sz_xiezilou_detail where item_id='%s'
    """ % item_id
    init_connection(user='root', password=db_password, database='crawler', host=db_host)
    data = execute_query(_sql)[0]
    data['images'] = re.findall(r"http://img.*?\.jpg", data['img_url'])

    _sql_recommand = """
            SELECT
                * 
            FROM
                sz_xiezilou_index 
            WHERE
                locate( '%s', address) > 0 
                LIMIT 5
    """ % (data['address'])
    data_recommand = execute_query(_sql_recommand)
    other = {
        "recommand": data_recommand
    }
    return templates.TemplateResponse("xiezilou_detail.html", {"request": request, "data": data, "other": other})

# @app.get('/', response_class=HTMLResponse)
# async def index_block():  # async加了就支持异步  把Request赋值给request
#     with open('templates/index.html', 'r', encoding='utf-8') as f:
#         _html = f.read()
#     return _html


@app.post("/data")
async def get_data(
        request: Request,
        zid: str = Form(...),
        sid: str = Form(None),
        company_id: str = Form(None),
        start: str = Form(None),
        end: str = Form(None)
):
    """"
    sql 查询出来的数据 return出去
    """
    print(zid, sid, company_id, start, end)
    import time
    time.sleep(10)

    # return {
    #     "code": 1,
    #     "msg": "test 异常",
    #     "count": 10,
    #     "data": []
    # }
    return {
        "code": 1,
        "msg": "test 异常",
        "count": 10,
        "data": [
            {
                "zid": 1,
                "sid": 108,
                "date": "2022-08-23",
                "ordered": 305
            },
            {
                "zid": 1,
                "sid": 105,
                "date": "2022-08-24",
                "ordered": 316
            },
        ]
    }


if __name__ == '__main__':
    uvicorn.run(app, port=8081, host='0.0.0.0')
