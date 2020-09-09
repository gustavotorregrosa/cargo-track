import React, { Component } from 'react'
import { connect } from 'react-redux'
import NavBar from './navBar'

class InitialScreen extends Component {

    render(){
        return (
           <NavBar />
        )
    }

}


const mapStateToProps = state => {
    return {
      user: state.auth.user
    }
  }

export default connect(mapStateToProps)(InitialScreen)