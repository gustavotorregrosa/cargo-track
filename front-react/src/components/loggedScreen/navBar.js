import React, { Component } from 'react'
import { connect } from 'react-redux'
import 'materialize-css/dist/css/materialize.min.css'
import M from 'materialize-css'
import '../../support/icons.css'
import Logout from './logout'
import { withRouter} from 'react-router'
import * as actions from '../../store/actions/index'


class NavBar extends Component {


    constructor(props){
        super(props)
        this.sidenav = null
    }

    componentDidMount(){
        this.activateSideNav()
        document.addEventListener('openLogin',() => this.logUserOut())
    }



    logUserOut = () => {
        this.props.logout()
        M.toast({ html: 'Please login again' })
    }

    activateSideNav = () => {
        try{
            if(this.instanceSideNav){
                this.instanceSideNav.destroy()
            }
            M.Sidenav.init(this.sidenav, {});
            this.instanceSideNav = M.Sidenav.getInstance(this.sidenav)
        }catch(e){
            console.log(e)
        }
        
    }

    openLogoutModal = e => {
        e.preventDefault()
        this.childOpenLogoutModal()
    }


    render() {
        return (
            <div>
                <nav className="black">
                    <div className="nav-wrapper">
                        <a href="#" className="brand-logo">Cargo Track</a>
                        <a href="#" onClick={() => this.instanceSideNav.open()} style={{
                            display: 'block'
                        }} className="sidenav-trigger"><i className="material-icons">menu</i></a>
                        {/* <ul id="nav-mobile" className="right hide-on-med-and-down">
                            <li><a onClick={e => this.openLogoutModal(e) } href="#">Logout</a></li>
                        </ul> */}
                    </div>
                </nav>
                <ul className="sidenav" ref={sidenav => this.sidenav = sidenav}>
                    <li><a onClick={e => {
                        e.preventDefault()
                        this.props.history.push('/categories')
                        this.instanceSideNav.close()

                        }} href="#">Categories</a></li>
                    <li><a onClick={e => {
                    e.preventDefault()
                    this.props.history.push('/products')
                    this.instanceSideNav.close()

                    }} href="#">Products</a></li>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <li><div className="divider"></div></li>
                    <li><a onClick={e => this.openLogoutModal(e) } href="#">Logout</a></li>
                    <li><a onClick={() => this.instanceSideNav.close()} href="#">Fechar</a></li>
                </ul>
                <Logout setOpenModal={f => this.childOpenLogoutModal = f} />
               
            </div>

        )
    }

}

const mapStateToProps = state => {
    return {
      user: state.auth.user
    }
  }

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(actions.logout()),
        
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar))