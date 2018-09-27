import React, { Component } from 'react';
import { withRouter } from 'next/router';
import { inject, observer } from 'mobx-react';

class Profile extends Component {
  render() {
    return (
      <div>
        <span>Profile Page</span>
      </div>
    );
  }
}

export default withRouter(inject('store')(observer(Profile)));
export { Profile };
