import uvicorn
import sys

from app.app_main import app
from pc.demo import app as pc_app


def run_app():
    uvicorn.run(app, port=8080, host='0.0.0.0')


def run_pc():
    uvicorn.run(pc_app, port=8080, host='0.0.0.0')


if __name__ == '__main__':
    if sys.argv[1] == "app":
        run_app()
    elif sys.argv[1] == "pc":
        run_pc()
    else:
        raise Exception("not supported args")
