## 将一个对象数组转化成一棵树
> 利用JavaScript的引用特性实现
```bash
let input = {
    h3: {
        parent: 'h2',
        name: '副总经理(市场)'
    },h1: {
        parent: 'h0',
        name: '公司机构'
    },h7: {
        parent: 'h6',
        name: '副总经理(总务)'
    },h4: {
        parent: 'h3',
        name: '销售经理'
    },h2: {
        parent: 'h1',
        name: '总经理'
    },h8: {
        parent: 'h0',
        name: '财务总监'
    },h6: {
        parent: 'h4',
        name: '仓管总监'
    },h5: {
        parent: 'h4',
        name: '销售代表'
    },h0: {
        parent: '',
        name: 'root'
    }
};
```
