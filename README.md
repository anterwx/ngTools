# NgTools 演示ng-packagr 构建Angular组件库

## [ng-packagr](https://www.npmjs.com/package/ng-packagr)<br>

这个项目是基于 [Angular CLI](https://github.com/angular/angular-cli) version 6.0.3.

## 代码
```bash
    # 克隆
    git clone git@github.com:anterwx/ngTools.git

    # 切换目录
    cd ngTools

    # 安装
    yarn
```
## 构建
```bash
    # 执行ng-packagr，生成dist目录 dist/packages-dist/util/
    node scripts/build/packing uitl

    # 切换
    cd dist/packages-dist/util/

    # 打包组件库，在此目录下生成包 xxx-versions.tgz，就可以上传到NPM发布
    npm pack
```
## 发布
```bash
    # 有两种方式：

    1、登录npm官网，上传xxx-versions.tgz包

    2、npm publish

```

## 使用
> 略…