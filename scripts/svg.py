import os
import re

src_path = os.path.join(os.path.dirname(__file__), "../public/images")

svgs = []
for dirpath, dirnames, filenames in os.walk(src_path):
    for filename in filenames:
        base, ext = os.path.splitext(filename)
        if ext == ".svg":
            svgs.append(os.path.join(dirpath, filename))

for filename in svgs:
    text = ""
    with open(filename, "r") as f:
        text = (
            f.read()
            .replace("rgb(255, 255, 255)", "rgba(255, 255, 255, 0)")
            .replace("rgb(0, 0, 0)", "#777")
            .replace("#000000", "#777")
        )
        text = re.sub(r"\n<!--.*?-->", "", text)
        text = re.sub(r"data-[a-z]{6}-colors=.*?;\s\"\s", "", text)
        text = re.sub(r"[a-z]{4}\.[a-z]{2}.*?\s", "", text)
    with open(filename, "w") as f:
        f.write(text)
