import React, {Component} from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router'
import { connect } from 'react-redux'
import * as actions from './store/actions/index'
import InitialScreen from './components/initialScreen/initialScreen'

class App extends Component {

  routes = (
    <Switch>
      <Route path="/start" exact component={InitialScreen}/>
    </Switch>
  )

  componentDidMount(){
//     if(this.props.user.email){
//         this.props.history.push('/logged')
//     }
    this.props.history.push('/start')
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
