import React, { Component } from 'react';
import { connect } from 'react-redux';
import appActions from '../Redux/actions/appActions';
import DataStore from '../DataStore/DataStore';

class HomePage extends Component {
  componentDidMount() {
    this.props.getDetails();
  }

  logout = () => {
    DataStore.clear();
    this.props.updateAppState('loggedin', false);
  };

  render() {
    const { loading, email, name } = this.props.appState;

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
        <h1>Home Page</h1>
        {loading ? (
          <p>loading...</p>
        ) : (
          <div>
            Email: {email}
            <br />
            Name: {name}
          </div>
        )}
        <button onClick={this.logout}>Logout</button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    appState: state.appState
  };
};

const mapDispatchToProps = {
  ...appActions
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
