from PIL import Image

path = "test.jpg"
img = Image.open(path)

logo_path = "logo.jpg"
mark_img = Image.open(logo_path)

result_path = "result.jpg"
img.paste(mark_img, (img.width - mark_img.width - 10, img.height - mark_img.height - 10))
img.save(result_path)
img.show()
