# 演示ng-packagr 构建Angular组件库

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
    # 发布
    npm publish
    # 注意，应用我的包名以'@'开头，所以是一个范围包，发布的时候需要特殊处理下，默认情况下NPM会你注册名或者加入的组织为一个scope范围，所以包名是@zjmy/util的话，注册名就应该是zjmy，才能顺利发布到NPM上
    npm publish --access=public

```

## 使用
```bash
    # 安装
    yarn add @zjmy/util
```
在src/app/app.module.ts中导入模块
```bash
    import { ZJMYUtilModule } from '@zjmy/util';
    @NgModule({
        imports:[
            ...
            ZJMYUtilModule.forRoot()
            ...
        ],
        ...
    })
```
+ 这样我们就可以使用ZJMYUtilModule模块中导出的组件和服务了<br>（虽然还没有任何组件、服务，接下来我会往模块添加组件、服务了）<br>
+ 同时我们也可以使用导出的函数，如Trie、convert中的函数。
```bash
    import { Trie } from '@zjmy/util';
    ...

    const o = new Trie();
    o.insertData('我爱你中国');
    o.insertData('我爱你');
    o.insertData('我爱你中国');
    o.insertData('我爱你宝贝');
    o.insertData('我爱你中原');
    o.insertData('爱你一万年');
    o.insertData('永远爱你');
    o.insertData('爱你真的好难');

    o.printData();

    // console 输出：
    // > 我爱你中原
    // > 我爱你中国
    // > 我爱你宝贝
    // > 永远爱你
    // > 爱你一万年
    // > 爱你真的好难
```