## Containers
Containers are Components or higher-order-components (HOC) that are "smart" or "aware" of a Data layer besides `props` or `state`
This could mean they have local state, that they pass down to children, or they connect to a MobX store. Children can 
be explicit (like in example one and two) or a HOC like in the third example

### MobX Container Component

```javascript
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import ListingList from './listing-list';

@inject('listing')
export default ListingContainer extends Component {
  render() {
    const {listing:listingStore} = this.props;
    const listings = listingStore.getListings();
    return (<ListingList listings={listings}/>)
  }
}
```
This `<ListingList/>` is a pure Component that renders a list of listings. The `ListingContainer` is the
"smart" component that provides the data from a MobX store

### Stateful container component

```javascript
import React, { Component } from 'react';
import ListingList from './listing-list';

export default ListingContainer extends Component {
  constructor() {
    this.state = {
      listings: []
    };
  }
  render() {
    const { listings } = this.state;
    return (<ListingList listings={listings}/>)
  }
}
```

This `<ListingList/>` is a pure Component that renders a list of listings. The `ListingContainer` is the
"smart" component that provides the data from it's local state

### MobX HOC Container Component

```javascript
import React, { Component } from 'react';
import { observer } from 'mobx-react';
import mobxNextInject from 'lib/stores/mobx-next-inject';

export default (ComponentToCompose) => {
  class LocationPage extends Component {
    static async getInitialProps(props, stores) {
      // ... get some data 
      return initialProps;
    }

    render() {
      return <ComponentToCompose {...this.props} />;
    }
  }
  const displayName = ComponentToCompose.displayName || ComponentToCompose.name || 'Component';
  LocationPage.displayName = `LocationPage(${displayName})`;
  LocationPage.ComposedComponent = ComponentToCompose;
  return mobxNextInject('location')(observer(LocationPage));
};

```
This HOC subscribes to the `location` store, and passes that down to the ComposedComponent