import React, { Component } from 'react'
import 'materialize-css/dist/css/materialize.min.css'
import M from 'materialize-css'
import '../../support/icons.css'
import Logout from './logout'
import { withRouter} from 'react-router'


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

                        } } href="#">Categories</a></li>
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

export default withRouter(NavBar)