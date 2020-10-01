from os import listdir, mkdir
from os.path import isfile, join

mypath = "/home/andres/Insync/luis.andradec14@gmail.com/Google Drive/7mo-Semestre/AplicacionesWeb/wb-andrade-cabrera-luis-andrade/03-examen/examen/src"
list_contents = listdir(mypath)
onlyfiles = [f for f in list_contents if isfile(join(mypath, f))]
for file_item in onlyfiles:
    list_contents.remove(file_item)

for directory in list_contents:
    full_path = join(mypath, directory)
    list_new_files = [
        join(full_path, directory + ".entity.ts"),
        join(full_path, directory + ".module.ts"),
        join(full_path, directory + ".service.ts"),
    ]
    for create_file in list_new_files:
        with open(create_file, "w+") as new_file:
            new_file.write("")
    mkdir(join(full_path, "dto"))
    sub_files = [
        join(full_path, "dto", directory) + ".create.DTO.ts",
        join(full_path, "dto", directory) + ".update.DTO.ts",
    ]

    for create_sub_file in sub_files:
        with open(create_sub_file, "w+") as new_file:
            new_file.write("")
