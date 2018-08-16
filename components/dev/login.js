import React, { Component } from 'react';
import styled from 'styled-components';
import urlConfig from 'lib/common/url-config';
import axios from 'axios';
import { redirectTo } from 'lib/common/redirect-unauthenticated-user';

const FormCenterParent = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 28px;
`;

const Form = styled.form`
  display: flex;
  flex: 1;
  flex-direction: column;
  max-width: 300px;
  h4 {
    text-align: center;
    margin: 0;
    padding: 0;
    margin-bottom: 5px;
  }
  input {
    margin-bottom: 5px;
  }
  input,
  button {
    padding: 5px;
  }
`;

export default class DevLoginForm extends Component {
  state = {
    username: '',
    password: '',
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    event.preventDefault();
  };

  onSubmit = async event => {
    const { username, password } = this.state;
    const { auth: authStore } = this.props;
    const { auth: authModule } = authStore.sdk.user;
    event.preventDefault();
    const result = await axios({
      method: 'POST',
      url: urlConfig.oauthLogin,
      data: {
        grant_type: 'password',
        scope: 'user',
        username,
        password,
      },
    });
    const { data } = result;
    authModule.updateTokens({
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
    });
    authModule.flush();
    redirectTo({}, '/');
  };

  render() {
    const { username, password } = this.state;
    return (
      <FormCenterParent>
        <Form onSubmit={this.onSubmit}>
          <h4>Dev localhost login</h4>
          <input
            name="username"
            onChange={this.onChange}
            value={username}
            type="text"
            placeholder="Username"
          />
          <input
            name="password"
            onChange={this.onChange}
            value={password}
            type="password"
            placeholder="Password"
          />
          <button onClick={this.onSubmit}>Login</button>
        </Form>
      </FormCenterParent>
    );
  }
}
