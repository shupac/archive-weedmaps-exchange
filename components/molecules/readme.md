## Molecules definition from atomic
Things start getting more interesting and tangible when we start combining atoms together.
Molecules are groups of atoms bonded together and are the smallest fundamental units of a compound.
These molecules take on their own properties and serve as the backbone of our design systems.

### Molecules Component Example

For example, a form label, input or button aren’t too useful by themselves,
but combine them together as a form and now they can actually do something together.

```javascript
import React from 'react';

export SearchComponent = ({ label }) => (
  <div className='search-bar'>
    <SearchInput/>
    <Button label={label}/>
  </div>
);

export default Search
```

## Stateful Molecule Component

```javascript

import React, { Component } from 'react';
import SearchInput from '../molecules/search-input'
import Button from '../atoms/button'

export default SearchComponent extends Component {

  constructor() {
    super();

    this.handleSearch = this.handleSearch.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      searchTerm: ''
    };
  };

  handleSearch(searchTerm) {
    this.setState({
      searchTerm
    })
  }

  render() {
    const {searchTerm} = this.state;
    return (
    <div className='search-bar'>
      <SearchInput search={this.search}/>
      <label> {searchTerm} </label>
      <Button label={this.props.label}/>
    </div>
    )
  }
}
