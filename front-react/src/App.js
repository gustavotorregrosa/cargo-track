import React, {Component} from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router'
import { connect } from 'react-redux'
import * as actions from './store/actions/index'

class App extends Component {

  componentDidMount(){
    setInterval(() => {
      console.log(this.props.user)
    }, 1000)

    setTimeout(() => {
      this.props.login({
        name: 'gustavo'
      })
    }, 3000)

    setTimeout(() => {
      this.props.logout()
    }, 7000)
  }

  render(){
    return (<h2>ola mundo</h2>)
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
