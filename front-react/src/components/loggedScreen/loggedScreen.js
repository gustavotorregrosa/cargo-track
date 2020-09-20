import React, { Component } from 'react'
import { connect } from 'react-redux'
import NavBar from './navBar'

class LoggedScreen extends Component {

    render(){
        return (
            <div>
                <NavBar />
                <h3>ola mundo</h3>
            </div>
          

           
        )
    }

}


const mapStateToProps = state => {
    return {
      user: state.auth.user
    }
  }

export default connect(mapStateToProps)(LoggedScreen)