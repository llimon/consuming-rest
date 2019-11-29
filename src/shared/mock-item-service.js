
class ItemService {

  constructor() {
    this.items = [
      {link:1, name:"test1", summary:"Summary Test 1", year:"2001", country:"us", price:"1000", description:"Desc 1"},
      {link:2, name:"test2", summary:"Summary Test 2", year:"2002", country:"uk", price:"2000", description:"Desc 2"},
      {link:3, name:"test3", summary:"Summary Test 3", year:"2003", country:"cz", price:"3000", description:"Desc 3"},
    ];
  }

  async retrieveItems() {
      return Promise.resolve(this.items);
  }

  async getItem(itemLink) {
    console.log("ItemService.getItem():");
    for(var i = 0; i < this.items.length; i++) {
      if ( this.items[i].link === itemLink) {
        return Promise.resolve(this.items[i]);
      }
    }

    return null;
  }

  async createItem(item) {
    console.log("ItemService.createItem():");

    const uuidv1 = require('uuid/v1');
    var newUUID = uuidv1()
    console.log("ItemService.createItem().newUUID:" + newUUID );
    item.link = newUUID;

    this.items.push(item);
    console.log(item);
    return Promise.resolve(item);
  }

  async deleteItem(itemLink) {
    console.log("ItemService.deleteItem():");
    console.log("ItemService.deleteItem():itemLink" + itemLink);
    for(var i = 0; i < this.items.length; i++) {
      if ( this.items[i].link === itemLink) {
        this.items.splice(i, 1);
      }
    }
    console.log("item ID:" + itemLink);
  }

  async updateItem(item) {
    console.log("ItemService.updateItem():");
    for(var i = 0; i < this.items.length; i++) {
      if ( this.items[i].link === item.link) {
        this.items[i] = item;
      }
    }
    console.log(item);
  }

}

export default ItemService;
