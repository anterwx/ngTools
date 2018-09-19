## js实现Trie前缀树的插入、查找、删除等操作

```bash
/**
 * 测试
 */
let trieObj = new Trie();

trieObj.insertData('我爱你');
trieObj.insertData('我爱你中国');
trieObj.insertData('我爱你宝贝');
trieObj.insertData('我爱你中原');
trieObj.insertData('爱你一万年');
trieObj.insertData('永远爱你');
trieObj.insertData('爱你真的好难');

trieObj.printData();

// console：
// > 我爱你中原
// > 我爱你中国
// > 我爱你宝贝
// > 永远爱你
// > 爱你一万年
// > 爱你真的好难

console.log(trieObj.searchData('我爱你')); // false
console.log(trieObj.searchData('我爱你中国')); // true
console.log(trieObj.searchData('我爱你宝宝')); // false
console.log(trieObj.searchData('我爱你宝贝')); // true

console.log(JSON.stringify(trieObj.deleteData('爱你真的好难')));


```