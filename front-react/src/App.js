import React, {Component} from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router'
import { connect } from 'react-redux'
import * as actions from './store/actions/index'
import InitialScreen from './components/initialScreen/initialScreen'
import LoggedScreen from './components/loggedScreen/loggedScreen'

class App extends Component {

  routes = (
    <Switch>
      <Route path="/start" exact component={InitialScreen}/>
      <Route path="/" exact component={LoggedScreen}/>
    </Switch>
  )


  componentDidMount(){
    this.redirectToProperPage()
  }

  redirectToProperPage = () => {
    let user = localStorage.getItem('user')
    if(!user){
      this.props.history.push('/start')
      return
    }
    this.props.login(user)
    this.props.history.push('/')
  }

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
