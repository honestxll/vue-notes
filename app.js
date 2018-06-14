const Note = {
  props: ['entityObject'],
  template: `
    <div class="item">
      <div class="content">
        <h4 class="header">{{ entityObject.body || '新建笔记' }}</h4>
      </div>
    </div>
  `
}
const Notes = {
  data() {
    return {
      entities: []
    }
  },
  methods: {
    create() {
      loadCollection('notes')
        .then(collection => {
          const entity = collection.insert({
            body: ''
          });
          db.saveDatabase();
          this.entities.unshift(entity);
        })
    }
  },
  created() {
    loadCollection('notes')
      .then(collection => {
        const _entities = collection.chain()
          .find()
          .simplesort('$loki', 'isdesc')
          .data()
        this.entities = _entities;
        console.log(this.entities);
      })
  },
  components: {
    note: Note,
  },
  template: `
  <div class="ui container">
    <div class="ui hidden section"></div>
    <div class="ui horizontal divider header">
      <i class="paw teal icon"></i>
      Vue Notes App
    </div>
    <a class="ui right floated teal basic button"
      @click="create">
      添加笔记
    </a>
    <div class="ui divided items">
      <note
        v-for="entity in entities"
        :entityObject="entity"
        :key="entity.$loki"
        ></note>
    </div>
  </div>
  `
}
const app = new Vue({
  el: '#app',
  data: {},
  components: {
    notes: Notes,
  },
  template: `
    <notes></notes>
  `
})
