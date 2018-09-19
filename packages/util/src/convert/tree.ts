/**
 *  将对象转成一颗树
var input = {
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
 * @param obj 如上结构
 */
export default function objToTree(obj) {
    let key, res;
    // tslint:disable-next-line:forin
    for (key in obj) {
        const parent = obj[key].parent;
        if (parent === '') {
            res = obj[key];
        } else {
            obj[parent][key] = obj[key];
        }
    }
    return res;
}
