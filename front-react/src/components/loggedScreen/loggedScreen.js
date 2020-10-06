import React, { Component } from 'react'
import { connect } from 'react-redux'
import NavBar from './navBar'
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import Categories from './categories/categories'
import Products from './products/products'

class LoggedScreen extends Component {

    render(){
        return (
            <div>
                <NavBar />
                <br/>
                <br/>
                <br/>
                <div className="container">
                    <Switch>
                        <Route path="/categories" component={Categories} />
                        <Route path="/products" component={Products} />
                        <Redirect from="/*" to="/" />
                    </Switch>
                </div>
              
                
                
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