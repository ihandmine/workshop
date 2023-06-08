import os


def findall_img_file():
    for file in os.listdir('../downloads'):
        print(file)


if __name__ == '__main__':
    findall_img_file()
