var app = new Vue({
  el: '#admin',
  data: {
    id: "",
    avatar: "",
    handle: "",
    timestamp: "",
    source: "",
    score: "",
    isStarred: false,
    isTrashed: false,
    content: "",

    file: null,
    addItem: null,
    items: [],
    findId: "",
    findItem: null,
  },
  created() {
    this.getItems();
  },
  computed: {
    suggestions() {
      return this.items.filter(item => item.id.startsWith(this.findId));
    }
  },
  methods: {
    async upload() {
      try {
        let r2 = await axios.post('/api/items', {
          id: this.id,
          avatar: this.avatar,
          handle: this.handle,
          timestamp: this.timestamp,
          source: this.source,
          score: this.score,
          isStarred: this.isStarred,
          isTrashed: false,
          content: this.content,
        });
        this.addItem = r2.data;
      } catch (error) {
        console.log(error);
      }
    },
    async getItems() {
      try {
        let response = await axios.get("/api/items");
        this.items = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    selectItem(item) {
      this.findId = "";
      this.findItem = item;
    },
    async deleteItem(item) {
      try {
        let response = axios.delete("/api/items/" + item._id);
        this.findItem = null;
        this.getItems();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async editItem(item) {
      try {
        let response = await axios.put("/api/items/" + item._id, {
          id: this.findItem.id,
          content: this.content,
          isStarred: this.findItem.isStarred,
        });
        this.findItem = null;
        this.content = "";
        this.getItems();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  }
});
