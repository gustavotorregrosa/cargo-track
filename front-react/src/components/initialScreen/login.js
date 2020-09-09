import React, {Component} from 'react'
import 'materialize-css/dist/css/materialize.min.css'
import M from 'materialize-css'
import { connect } from 'react-redux'
import * as actions from '../../store/actions/index'

class Login extends Component {

    constructor(props){
        super(props)
    }

    state = {
        loading: false,
        user: {}
    }

    openModal = () => {
        this.instanceModal.open()
        M.updateTextFields()
    }

    componentDidMount(){
        this.activateModal()
    }

    activateModal = () => {
        this.instanceModal = M.Modal.init(this.modal, {
            onCloseEnd: () => this.setState({
                user: {},
                loading: false
            })
        })     
        this.props.setOpenModal(this.openModal)   
    }

    alterField = (e, fieldName) => {
        let user = {...this.state.user}
        user[fieldName] = e.target.value
        this.setState({
            user
        })
    }

    login = e => {
        e.preventDefault()
        console.log(this.state)
    }

    render() {
        return (
            <div>
                <div ref={modal => this.modal = modal} className="modal">
                    <div className="modal-content">
                        <div className="row">
                            <div className="input-field col s12">
                                <input id="email" onChange={e => this.alterField(e, 'email')} type="email" className="validate" />
                                <label htmlFor="email">E-mail</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input id="password" onChange={e => this.alterField(e, 'password')} type="password" className="validate" />
                                <label htmlFor="password">Password</label>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <a href="#!" onClick={e => this.login(e)} className="waves-effect waves-green btn-flat">Login</a>
                        </div>
                        {this.state.loading ? (<div className="progress"><div className="indeterminate"></div></div>) : null}
                    </div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        login: (user) => dispatch(actions.login(user)),
        
    }
}

export default connect(null, mapDispatchToProps)(Login)