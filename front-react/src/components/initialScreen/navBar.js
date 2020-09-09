import React, { Component } from 'react'
import 'materialize-css/dist/css/materialize.min.css'
import M from 'materialize-css'
import '../../support/icons.css'
import Login from './login'
import Register from './register'

class NavBar extends Component {


    componentDidMount(){
        this.activateSideNav()
    }


    activateSideNav = () => {
        if(this.instanceSideNav){
            this.instanceSideNav.destroy()
        }
        M.Sidenav.init(this.sidenav, {});
        this.instanceSideNav = M.Sidenav.getInstance(this.sidenav)
    }

    openLoginModal = e => {
        e.preventDefault()
        this.childOpenLoginModal()
    }

    openRegisterModal = e => {
        e.preventDefault()
        this.childOpenRegisterModal()
    }


    render() {
        return (
            <div>
                <nav className="black">
                    <div className="nav-wrapper">
                        <a href="#" className="brand-logo">Cargo Track</a>
                        <a href="#" onClick={() => this.instanceSideNav.open()} className="sidenav-trigger"><i className="material-icons">menu</i></a>
                        <ul id="nav-mobile" className="right hide-on-med-and-down">
                            <li><a onClick={e => this.openRegisterModal(e)} href="#">Registrar</a></li>
                            <li><a onClick={e => this.openLoginModal(e)} href="#">Login</a></li>
                        </ul>
                    </div>
                </nav>
                <ul className="sidenav" ref={sidenav => this.sidenav = sidenav}>
                    <li><a onClick={e => this.openRegisterModal(e)} href="#">Registrar</a></li>
                    <li><a onClick={e => this.openLoginModal(e)} href="#">Login</a></li>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <li><div className="divider"></div></li>
                    <li><a onClick={() => this.instanceSideNav.close()} href="#">Fechar</a></li>
                </ul>
                <Login setOpenModal={f => this.childOpenLoginModal = f} />
                <Register setOpenModal={f => this.childOpenRegisterModal = f} />
            </div>

        )
    }

}

export default NavBar