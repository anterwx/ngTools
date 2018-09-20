## 封装通用组件、服务、函数
函数直接导出，组件、服务封装到Angular模块中

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
在类中直接使用函数
```bash
    import { Trie, objToTree } from '@zjmy/util';
    ...
    const o = new Trie();

```