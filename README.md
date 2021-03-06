# 演示 ng-packagr 构建 Angular组件库
 通常在开发过程中，我们会把通用的组件、服务、函数等封装到模块中并对外提供自己的API，供业务模块调用。[ng-packagr](https://www.npmjs.com/package/ng-packagr) 是一个将库透明化为Angular包格式的工具，这样构建出来的Angular包很容易应用到angular-cli项目中。<br>
这个项目是基于 [Angular CLI](https://github.com/angular/angular-cli) version 6.0.3。另外，官方提供了ng g library方式构建，本文主要是通过自定义的方式实现，针对复杂过程可实现扩展。

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
[packing.js](https://github.com/anterwx/ngTools/blob/master/scripts/build/packing.js) 自定义打包过程：
```bash
    const path = require('path');
    const ngPackage = require('ng-packagr');

    const name = process.argv[2];
    const target = path.resolve(__dirname, `../../packages/${name}`);

    console.time(`${name}:time`);

    ngPackage
    .ngPackagr()
    .forProject(path.resolve(target, `ng-package.json`))
    .withTsConfig(path.resolve(target, 'tsconfig.lib.json'))
    .build()
    .then(() => {
        # 返回 promise，处理打包后业务
        console.timeEnd(`${name}:time`);
    })
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
```
[build.sh](https://github.com/anterwx/ngTools/blob/master/build.sh) 执行打包命令：
```bash
    # 执行ng-packagr，生成dist目录 dist/packages-dist/util/
    node scripts/build/packing uitl

    # 切换
    cd dist/packages-dist/util/

    # 打包组件库，在此目录下生成包 xxx-versions.tgz，就可以上传到NPM发布
    npm pack
```
## 发布
> 没有 [npm](https://www.npmjs.com/) 账号？去[注册](https://www.npmjs.com/signup)一个，记得把源切换回来（npm config set registry=https://registry.npmjs.org）
```bash
    # 登录 npm
    npm login
    # 检测是否登录成功,成功会打印当前登录的用户名
    npm whoami
    # 发布
    npm publish
    # 注意，应用我的包名以'@'开头，所以是一个范围包，发布的时候需要特殊处理下，默认情况下NPM会你注册名或者加入的组织为一个scope范围，所以包名是@zjmy/util的话，注册名或组织名称就应该是zjmy，才能顺利发布到NPM上
    npm publish --access=public

```

## 如何使用
首先，安装模块
```bash
    yarn add @zjmy/util
```
然后，在 [app.module.ts](https://github.com/anterwx/ngTools/blob/master/src/app/app.module.ts) 中导入模块
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
### 使用组件
使用 [ZJMYUtilModule](https://github.com/anterwx/ngTools/blob/master/packages/util/util.module.ts) 模块中导出的组件和服务了，以下以组件为例。

+ 添加、导出组件
```bash
    # 添加一个简单打招呼组件
    src/hello/helloComponent.ts

    # 在uitl.module.ts模块中导出
    exports: [helloComponent]
```
+ 在 [app.component.html](https://github.com/anterwx/ngTools/blob/master/src/app/app.component.html) 模板中使用
```bash
    <app-hello name="xiaoming" age="6"></app-hello>
    <app-hello name="xiaohong" age="8"></app-hello>
```
+ 结果如下：<br>
![app-hello](/src/assets/img/hello.png)
<br>
当然除了组件以外，我们还可以添加服务接口等，服务需提供 providers 配置项导出，接口、类也一样。
<br>

### 使用函数、类 

使用导出的函数、类，如 [trie](https://github.com/anterwx/ngTools/tree/master/packages/util/src/trie)、[convert](https://github.com/anterwx/ngTools/tree/master/packages/util/src/convert) 。

```bash
    import { Trie } from '@zjmy/util';
    ...

    const o = new Trie();
    // 插入
    o.insertData('我爱你中国');
    o.insertData('我爱你');
    o.insertData('我爱你中国');
    o.insertData('我爱你宝贝');
    o.insertData('我爱你中原');
    o.insertData('爱你一万年');
    o.insertData('永远爱你');
    o.insertData('爱你真的好难');

    // 打印
    o.printData();
    
    // 运行 console 输出：
    > 我爱你中原
    > 我爱你中国
    > 我爱你宝贝
    > 永远爱你
    > 爱你一万年
    > 爱你真的好难
```
    