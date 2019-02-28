import React, { Component } from 'react';
import { connect } from 'react-redux';
import loginActions from '../Redux/actions/loginActions';
import { Link } from 'react-router-dom';

class LoginPage extends Component {
  componentDidMount() {
    console.log('Login props', this.props);
  }

  updateState = (key, value) => {
    this.props.updateState(key, value);
  };

  login = () => {
    const { email, password } = this.props.loginState;
    const user = {
      email,
      password
    };
    [
      { key: 'Email', value: email },
      { key: 'Password', value: password }
    ].forEach(data => {
      if (data.value === '') {
        alert(`${data.key} is required`);
      }
    });
    if (email && password) this.props.login(user);
  };

  render() {
    const { loginState } = this.props;
    const { email, password, loading } = loginState;
    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column'
        }}
      >
        <h1>Login Page</h1>
        <br />
        <input
          type={'email'}
          value={email}
          placeholder={'Email'}
          onChange={ev => this.updateState('email', ev.target.value)}
        />
        <br />
        <input
          type={'password'}
          value={password}
          placeholder={'Password'}
          onChange={ev => this.updateState('password', ev.target.value)}
        />
        <br />
        {loading === true ? (
          <p>Loading...</p>
        ) : (
          <button type="button" onClick={this.login}>
            Login
          </button>
        )}
        <Link to="signup">Signup</Link>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loginState: state.loginState
  };
};

const mapDispatchToProps = {
  ...loginActions
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage);
