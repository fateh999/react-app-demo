import React, { Component } from 'react';
import { connect } from 'react-redux';
import signupActions from '../Redux/actions/signupActions';
import { Link } from 'react-router-dom';

class SignupPage extends Component {
  componentDidMount() {
    console.log('Signup props', this.props);
  }

  updateState = (key, value) => {
    this.props.updateState(key, value);
  };

  signup = () => {
    const { name, email, password } = this.props.signupState;
    const user = {
      name,
      email,
      password
    };
    [
      { key: 'Name', value: name },
      { key: 'Email', value: email },
      { key: 'Password', value: password }
    ].forEach(data => {
      if (data.value === '') {
        alert(`${data.key} is required`);
      }
    });
    if (name && email && password) this.props.signup(user);
  };

  render() {
    const { signupState } = this.props;
    const { name, email, password, loading } = signupState;
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
        <h1>Signup Page</h1>
        <br />
        <input
          type={'name'}
          value={name}
          placeholder={'Name'}
          onChange={ev => this.updateState('name', ev.target.value)}
        />
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
          <button type="button" onClick={this.signup}>
            Signup
          </button>
        )}
        <Link to="login">Login</Link>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    signupState: state.signupState
  };
};

const mapDispatchToProps = {
  ...signupActions
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignupPage);
