import { Component } from 'react';

import CardList from './components/CardList/CardList.component';
import SearchBox from './components/SearchBox/SearchBox.component';

import './App.css';

class App extends Component {
  constructor() {
    super();
  
    this.state = {
      monsters: [],
      searchField: ""
    }
  }
  
  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) => this.setState(() => {
        return {
          monsters: users
        }}
      ))
  }
  
  onSearchChange = (event) => {
    const searchField = event.target.value.toLocaleLowerCase();
    this.setState({searchField});
  }

  render() {
    const { monsters, searchField } = this.state;
    const { onSearchChange } = this;

    const filteredMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField);
    });

    return (
      <div className="App">
        <h1 className="app-title">Monsters Rolodex</h1>
        <SearchBox 
          className="monsters-search-box"
          placeholder="search monsters"
          onChangeHandler={onSearchChange}
        />
        <CardList monsters={filteredMonsters} />
      </div>
    );
  }
}

export default App;