# encoding:utf-8
import requests
import time

# 此处需要ak，ak申请地址：https://lbs.amap.com/dev/key/app
ak = "ETLXgCxIoVixggHcAk6mKpMd"

headers = {
    'X-Requested-With': 'XMLHttpRequest',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) '
                  'Chrome/56.0.2924.87 Safari/537.36',
    'Referer': 'https://restapi.amap.com/'
}


# 地理信息解析
def amp_geocode(addr=None):
    url = "https://restapi.amap.com/v3/geocode/geo?parameters"
    params = {"key": ak,
              "address": addr}
    response = requests.get(url, params=params, headers=headers)
    print(response.text)
    # if response.status_code == 200:
    #     # loc_info = response.json()["geocodes"][0]["location"]
    #     lng = loc_info.split(",")[0]
    #     lat = loc_info.split(",")[1]
    #     print(loc_info)
    #     time.sleep(0.25)
    #     return lng, lat
    # else:
    #     print("========>", response.status_code)
    #     time.sleep(5)
    #     return None


if __name__ == '__main__':
    print(amp_geocode("深圳-横岗"))
