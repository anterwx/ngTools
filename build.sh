
echo 'ng-packagr 开始打包'

# 执行scripts/build/packing.js
node --max_old_space_size=4096 scripts/build/packing util

# 切换目录
# cd dist/package-list/util/

# 执行打包
# npm pack

echo '打包结束'