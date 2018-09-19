/**
 *  将对象转成一颗树
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
