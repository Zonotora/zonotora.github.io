import os
import shutil

IN = "build/server/pages"
OUT="temporary"
STATIC_IN="build/static"
STATIC_OUT="temporary/_next/static"

def get_files():
    ret = []
    for root, dirs, files in os.walk(IN):
        for file in files:
            if file.endswith(".html") and "500.html" not in file:
                ret.append(os.path.join(root, file)[len(IN)+1:])
    return ret

def build():
    files = get_files()
    basenames = []
    for file in files:
        dir_name = os.path.dirname(file)
        base_name = os.path.basename(file)
        src = f"{IN}/{file}"
        dst = f"{OUT}/{dir_name}"
        os.makedirs(dst, exist_ok=True)
        dst += f"/{base_name}"
        shutil.copyfile(src, dst)
        dir_name = dir_name + "/" if dir_name != "" else ""
        basenames.append(dir_name  + os.path.splitext(base_name)[0] + ".json")

    shutil.copytree(STATIC_IN, STATIC_OUT, dirs_exist_ok=True)

    for file in os.listdir(STATIC_OUT):
        if file not in ["chunks", "css"]:
            src=f"{STATIC_OUT}/{file}"
            dst=f"{STATIC_OUT}/data/{file}"
            shutil.move(src, dst)

    for file in basenames:
        src = IN + "/"  + file
        dir_name = os.path.dirname(file)
        os.makedirs(dst + "/" + dir_name, exist_ok=True)
        try:
            shutil.copyfile(src, dst + "/" + file)
        except:
            pass
    print(basenames)





if __name__ == "__main__":
    build()