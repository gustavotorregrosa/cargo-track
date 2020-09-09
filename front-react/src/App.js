import React, {Component} from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router'
import { connect } from 'react-redux'
import * as actions from './store/actions/index'
import InitialScreen from './components/initialScreen/initialScreen'

class App extends Component {

  routes = (
    <Switch>
      <Route path="/" exact component={InitialScreen}/>
    </Switch>
  )

  render(){
    return this.routes
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login: (user) => dispatch(actions.login(user)),
    logout: () => dispatch(actions.logout())
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
