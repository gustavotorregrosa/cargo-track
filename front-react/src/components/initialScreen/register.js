import React, { Component } from 'react'
import { withRouter } from 'react-router'
import 'materialize-css/dist/css/materialize.min.css'
import M from 'materialize-css'
import { connect } from 'react-redux'
import * as actions from '../../store/actions/index'
import { url } from '../../support/misc'

class Register extends Component {


    state = {
        loading: false,
        user: {}
    }

    componentDidMount(){
        this.activateModal()
    }

    validateFields = () => {
        const user = {
            ...this.state.user
        }

        const vName = user.name && user.name.length > 5
        const vEmail = user.email && user.email.length > 5 && user.email.includes("@")
        const vPassword = user.password && user.password2 && user.password == user.password2 && user.password.length > 5

        return vName && vEmail && vPassword
    }

    activateModal = () => {
        this.instance = M.Modal.init(this.modal, {
            onCloseEnd: () => this.setState({
                loading: false,
                user:{}
            })

        })
        this.props.setOpenModal(this.openModal)
    }

    openModal = () => {
        this.instance.open()
        M.updateTextFields()
        this.setState({
            loading: false
        })
    }

    alterField = (e, fieldName) => {
        let user = {...this.state.user}
        user[fieldName] = e.target.value
        this.setState({
            user
        })
    }

    register = e => {
        e.preventDefault()
        this.setState({
            loading: true
        })
        let myHeaders = new Headers
        myHeaders.set("Content-Type", "application/json")
        fetch(url('auth/register'), {
            method: 'post',
            body: JSON.stringify({...this.state.user}),
            headers: myHeaders,
            mode:  'cors',
        }).then(r => {
            if(r.status == 401){
                throw new Error()
            }
            return r.json()
        }).then(user => {
            this.props.login(user)
            M.toast({html: user.email + ' logged in'})
            this.props.history.push('/')
          
        }).catch(e => {
            M.toast({html: 'Unauthorized'})
        }).finally(() => {
            this.setState({
                loading: false
            })
            this.instance.close()
        })

    }

    render() {
        return (
            <div>
                <div ref={modal => this.modal = modal} className="modal" style={{maxHeight: '100%', width: '80%', overflow: 'visible'}}>
                    <div className="modal-content">
                        <div className="row">
                            <div className="input-field col s12">
                                <input id="nameRegister" onChange={e => this.alterField(e, 'name')} type="text" className="validate" />
                                <label htmlFor="nameRegister">Nome</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input id="emailRegister" onChange={e => this.alterField(e, 'email')} type="email" className="validate" />
                                <label htmlFor="emailRegister">E-mail</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input id="passwordRegister" onChange={e => this.alterField(e, 'password')}  type="password" minLength="8" className="validate" />
                                <label htmlFor="passwordRegister">Password</label>
                                <span className="helper-text" data-error="8 caracteres ou mais"></span>

                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input id="passwordConfirmationRegister" onChange={e => this.alterField(e, 'password2')}  type="password" />
                                <label htmlFor="passwordConfirmationRegister">Password Confirmation</label>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <a onClick={e => this.register(e)} href="#" disabled={!this.validateFields()} className="waves-effect waves-green btn-flat">Registrar</a>
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

export default withRouter(connect(null, mapDispatchToProps)(Register))