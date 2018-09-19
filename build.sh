# 执行scripts/build/packing.js

echo 'ng-packagr 开始打包'

node --max_old_space_size=4096 scripts/build/packing util

cd dist/package-list/

npm pack

echo '打包结束'