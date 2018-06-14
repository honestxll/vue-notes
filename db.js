const databaseInitalize = () => {
  const notes = db.getCollection('notes');
  notes || db.addCollection('notes');
}

const db = new loki('notes', {
  autoload: true,
  autoloadCallback: databaseInitalize,
  autosave: true,
  autosaveInterval: 3000
});

// lokijs 的 curd 方法和 mongodb 基本一样
// 可以使用 notes.clear() 来清空数据库

const loadCollection = (collection) => {
  return new Promise(resolve => {
    db.loadDatabase({}, () => {
      const _collection = db.getCollection(collection) || db.addCollection(collection);
      resolve(_collection);
    });
  })
}
