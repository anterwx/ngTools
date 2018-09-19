/**
 * 接口类
 */
export interface ITrie {
    /**
     * 插入单词
     * @param data
     */
    insertData(data: string): void;
    /**
     * 删除单词
     * @param data
     */
    deleteData(data: string): Trie;
    /**
     * 查找单词
     * @param data
     */
    searchData(data: string): boolean;
    /**
     * 输出单词列表
     */
    printData(): void;
}

/**
 * 基类
 */
export class TrieBase {
    /**
     * 本类不能实例化对象，能被继承
     */
    protected constructor() { }

    /**
     * 占个位，去派生类中重写
     * @param stringData
     */
    protected deleteData(stringData) {
        return;
    }

    /**
     * 递归插入单词
     * @param stringData
     * @param node
     */
    protected insert(stringData, node) {
        if (stringData === '') {
            return;
        }
        const children = node.children;
        let haveData = null;
        for (const i in children) {
            if (children[i].key === stringData[0]) {
                haveData = children[i];
            }
        }
        if (haveData) {
            this.insert(stringData.substring(1), haveData); // 说明找到了对应的元素
        } else { // 那如果没有找到
            if (children.length === 0) {
                // 当前没有子元素，所以应该判断一下
                // tslint:disable-next-line:no-shadowed-variable
                const node = new TrieNode(stringData[0]);
                children.push(node);
                this.insert(stringData.substring(1), node); // 对吧，此时应该将该元素插入子元素中
            } else { // 当前子元素的长度不为零，需要查找一个合适的位置去插入元素
                let validPosition = 0;
                for (const j in children) {
                    if (children[j].key < stringData[0]) {
                        validPosition++;
                    }
                }
                // tslint:disable-next-line:no-shadowed-variable
                const node = new TrieNode(stringData[0]);
                children.splice(validPosition, 0, node);
                this.insert(stringData.substring(1), node); // 对吧，此时应该将该元素插入子元素中
            }
        }
    }

    /**
     * 先递归查找到字符串的叶子节点，然后从字符串的叶子节点逐级向根节点递归删除叶子节点，直到删除字符串
     * @param parent 父节点
     * @param index 子节点在父节点children数组中的索引位置
     * @param stringData 递归遍历中的字符串
     * @param delStr 调用deleteData方法时的原始字符串
     */
    protected delNext(parent, index, stringData, delStr) {
        // 当前节点对象
        const node = parent.children[index];
        // 若字符与节点key不相等，则不匹配
        if (stringData[0] !== node.key) {
            return false;
        } else { // 若与key相等，继续判断
            const children = node.children;
            if (children.length === 0 && stringData.length === 1) { // 叶子节点，最后一个字符，则完全匹配
                // 删除叶子节点，利用父节点删除子节点原理
                parent.children.splice(index, 1);
                // 字符串从尾部移除一个字符后，继续遍历删除方法
                this.deleteData(delStr.substring(0, delStr.length - 1));
            } else if (children.length > 0 && stringData.length > 1) { // 既不是叶子节点，也不是最后一个字符，则继续递归查找
                for (const i in children) {
                    if (children[i].key === stringData[1]) {
                        return this.delNext(node, i, stringData.substring(1), delStr); // 记得return 递归函数，否则获取的返回值为undefined
                    }
                }
            }
        }
    }

    /**
     * 递归查找单词
     * @param node
     * @param stringData
     */
    protected searchNext(node, stringData) {
        // 若字符与节点key不相等，则不匹配
        if (stringData[0] !== node.key) {
            return false;
        } else { // 若与key相等，继续判断
            const children = node.children;
            if (children.length === 0 && stringData.length === 1) { // 叶子节点，最后一个字符，则完全匹配
                return true;
            } else if (children.length > 0 && stringData.length > 1) { // 既不是叶子节点，也不是最后一个字符，则继续递归查找
                for (const i in children) {
                    if (children[i].key === stringData[1]) {
                        return this.searchNext(children[i], stringData.substring(1)); // 记得return 递归函数，否则获取的返回值为undefined
                    }
                }
            } else { // C1：叶子节点，C2：最后一个字符；若只满足其中一个条件，则不匹配
                return false;
            }
        }
    }

    /**
     * 递归打印单词
     * @param node
     * @param data
     */
    protected printHelper(node, data) {
        if (node.children.length === 0) {
            console.log('>', data.join(''));
            return;
        }
        // tslint:disable-next-line:forin
        for (const i in node.children) {
            data.push(node.children[i].key);
            this.printHelper(node.children[i], data);
            data.pop();
        }
    }

    /**
     * 类型保护，以免typescript报错，或使用类型断言
     * @param node
     */
    protected isTrieNode(node: TrieNode): node is TrieNode {
        return (<TrieNode>node).key !== undefined;
    }
}

/**
 * 节点
 */
export class TrieNode {
    key: string;
    children: Array<any> = [];
    constructor(key) {
        this.key = key; // 节点字符
        this.children = []; // 子节点集合
    }
}

/**
 * Trie类
 */
export class Trie extends TrieBase implements ITrie {
    root: TrieNode;
    constructor() {
        super();
        this.root = new TrieNode(null);
    }
    // 插入单词（字符串）
    insertData(stringData): void {
        this.insert(stringData, this.root);
    }
    // 删除单词
    deleteData(stringData): Trie {
        if (this.searchData(stringData)) { // 判断是否存在该单词（字符串）
            for (const i in this.root.children) {
                if (this.delNext(this.root, i, stringData, stringData)) {
                    return;
                }
            }
        }
        return this;
    }
    // 查找单词（字符串）
    searchData(queryData): boolean {
        if (queryData === '' || this.root.children.length === 0) {
            return false;
        }
        for (const i in this.root.children) {
            if (this.searchNext(this.root.children[i], queryData)) {
                return true;
            }
        }
        return false;
    }
    // 输出所有单词（字符串）
    printData(): void {
        // tslint:disable-next-line:forin
        for (const i in this.root.children) {
            // 为了让代码工作，第二个参数，我使用了类型断言，避免TS编译报错，找不到key属性，也可以使用类型保护函数（从TrieBase类继承过来的isTrieNode函数判断）
            this.printHelper(this.root.children[i], [(<TrieNode>this.root.children[i]).key]);
        }
    }
}

/**
 * 测试
 */
// let trieObj = new Trie();

// trieObj.insertData('我爱你');
// trieObj.insertData('我爱你中国');
// trieObj.insertData('我爱你宝贝');
// trieObj.insertData('我爱你中原');
// trieObj.insertData('爱你一万年');
// trieObj.insertData('永远爱你');
// trieObj.insertData('爱你真的好难');

// trieObj.printData();

// // console：
// // > 我爱你中原
// // > 我爱你中国
// // > 我爱你宝贝
// // > 永远爱你
// // > 爱你一万年
// // > 爱你真的好难

// console.log(trieObj.searchData('我爱你')); // false
// console.log(trieObj.searchData('我爱你中国')); // true
// console.log(trieObj.searchData('我爱你宝宝')); // false
// console.log(trieObj.searchData('我爱你宝贝')); // true

// console.log(JSON.stringify(trieObj.deleteData('爱你真的好难')));
