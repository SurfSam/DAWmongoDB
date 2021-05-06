# cleans docker bind mounts in
# ./database
# ./mongo_cluster
cd database
cd data1
find . -not -name '*.gitignore' | xargs rm -r
cd ..
cd data2
find . -not -name '*.gitignore' | xargs rm -r
cd ..
cd data3
find . -not -name '*.gitignore' | xargs rm -r
cd ..
cd data4
find . -not -name '*.gitignore' | xargs rm -r
cd ..
cd data5
find . -not -name '*.gitignore' | xargs rm -r
cd ..
cd data6
find . -not -name '*.gitignore' | xargs rm -r
cd ..
cd ..
cd mongo_cluster
cd config1
find . -not -name '*.gitignore' | xargs rm -r
cd ..
cd config2
find . -not -name '*.gitignore' | xargs rm -r
cd ..
cd config3
find . -not -name '*.gitignore' | xargs rm -r