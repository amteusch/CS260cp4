var app = new Vue({
  el: '#app',
  data: {
    items: [],
    message: '',
    show: 'all',
  },
  computed: {
    starredItems() {
      return this.items.filter(item => {
        return item.isStarred; //meta
    }).length;
  }
},
created() {
  this.getItems();
},
  methods: {
      async starItem(item) {
        try {
          let response = await axios.put("/api/items/" + item._id, {
            id: item.id,
            content: item.content,
            isStarred: !item.isStarred, //meta
          });
          this.getItems();
          return true;
        } catch (error) {
          console.log(error);
        }
      },
      format_date(value){
         if (value) {
           return moment(String(value)).format('LL')
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
  },
});
