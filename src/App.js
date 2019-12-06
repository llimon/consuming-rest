import React, { Component } from 'react';
import './App.css';
import ItemDetails from './item-details';
import NewItem from './new-item';
import EditItem from './edit-item';
//import ItemService from './shared/mock-item-service';
import ItemService from './shared/item-service';

class App extends Component {

  constructor(props) {
    super(props);
    this.itemService = new ItemService();
    this.onSelect = this.onSelect.bind(this);
    this.onNewItem = this.onNewItem.bind(this);
    this.onEditItem = this.onEditItem.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onCancelEdit = this.onCancelEdit.bind(this);
    this.onCreateItem = this.onCreateItem.bind(this);
    this.onUpdateItem = this.onUpdateItem.bind(this);
    this.onDeleteItem = this.onDeleteItem.bind(this);
    this.state = {
      showDetails: false,
      editItem: false,
      selectedItem: null,
      newItem: null
    }
  }

  componentDidMount() {
      console.log("componentDidMount");
      this.getItems();
  }

  render() {
    const items = this.state.items;
    if(!items) return null;
    const showDetails = this.state.showDetails;
    const selectedItem = this.state.selectedItem;
    const newItem = this.state.newItem;
    const editItem = this.state.editItem;
    const listItems = items.map((item) =>
      <li key={item.link} onClick={() => this.onSelect(item.link)}>
         <span className="item-name">{item.name}</span>&nbsp;|&nbsp; {item.summary}
      </li>
    );

    return (
      <div className="App">
          <ul className="items">
            {listItems}
          </ul>
          <br/>
          <button type="button" name="button" onClick={() => this.onNewItem()}>New Item</button>
          <br/>
            {newItem && <NewItem onSubmit={this.onCreateItem} onCancel={this.onCancel}/>}
            {showDetails && selectedItem && <ItemDetails item={selectedItem} onEdit={this.onEditItem}  onDelete={this.onDeleteItem} />}
            {editItem && selectedItem && <EditItem onSubmit={this.onUpdateItem} onCancel={this.onCancelEdit} item={selectedItem} />}
      </div>
    );
  }

  getItems() {
    console.log("getItems");
    this.itemService.retrieveItems().then(items => {
          this.setState({items: items});
        }
    );
  }

  onSelect(itemLink) {
    console.log( "onSelect");
    this.clearState();
    this.itemService.getItem(itemLink).then(item => {
      this.setState({
          showDetails: true,
          selectedItem: item
        });
      }
    );
  }

  onCancel() {
    console.log("onCancel");
    this.clearState();
  }

  onNewItem() {
    console.log( "OnNewItem");
    this.clearState();
    this.setState({
      newItem: true
    });
  }

  onEditItem() {
    console.log( "onEditItem");
    this.setState({
      showDetails: false,
      editItem: true,
      newItem: null
    });
  }

  onCancelEdit() {
    console.log("onCancelEdit");
    this.setState({
      showDetails: true,
      editItem: false,
      newItem: null
    });
  }

  onUpdateItem(item) {
    console.log("onUpdateItem");
    this.clearState();
    this.itemService.updateItem(item).then(item => {
        this.getItems();
      }
    );
  }

  onCreateItem(newItem) {
    console.log( "onCreateItem");
    this.clearState();
    this.itemService.createItem(newItem).then(item => {
        this.getItems();
      }
    );
  }

  onDeleteItem(itemLink) {
    console.log("onDeleteItem");
    this.clearState();
    this.itemService.deleteItem(itemLink).then(res => {
        this.getItems();
      }
    );
  }

  clearState() {
    console.log("clearState");
    this.setState({
      showDetails: false,
      selectedItem: null,
      editItem: false,
      newItem: null
    });
  }
}

export default App;
