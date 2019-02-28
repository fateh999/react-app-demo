import React, { Component, Fragment } from 'react';
import { Route, BrowserRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import LoginPage from './Pages/LoginPage';
import HomePage from './Pages/HomePage';
import SignupPage from './Pages/SignupPage';
import DataStore from './DataStore/DataStore';
import appActions from './Redux/actions/appActions';

class Router extends Component {
  componentWillMount() {
    const token = DataStore.get('token');
    console.log(token);
    if (token) {
      this.props.updateAppState('loggedin', true);
    }
  }

  componentDidMount() {
    console.log('props', this.props);
  }

  render() {
    const { appState } = this.props;
    const { loggedin } = appState;
    return (
      <BrowserRouter>
        <Fragment>
          <Route
            path="/"
            exact
            render={() =>
              loggedin === true ? <HomePage /> : <Redirect to="login" />
            }
          />
          <Route
            path="/login"
            exact
            render={() =>
              loggedin === true ? <Redirect to="" /> : <LoginPage />
            }
          />
          <Route
            path="/signup"
            exact
            render={() =>
              loggedin === true ? <Redirect to="" /> : <SignupPage />
            }
          />
        </Fragment>
      </BrowserRouter>
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
)(Router);
