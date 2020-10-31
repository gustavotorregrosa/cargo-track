import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../../store/actions/index'
import 'materialize-css/dist/css/materialize.min.css'
import M from 'materialize-css'
import { url, JWTHelper } from '../../../support/misc'

class ModalDeleteMovement extends Component {
    
    constructor(props) {
        super(props)
        this.elem = null
        this.instance = null
        this.openModal = this.openModal.bind(this)
    }

    state = {
        loading: false,
        id: "",
        type: "",
        date: "",
        amount: ""
    }

    getUser = () => this.props.user

    _login = user => this.props.login(user)

    componentDidMount() {
        this.elem = document.getElementById('modal-delete-movement')
        this.instance = M.Modal.init(this.elem, {
            onCloseEnd: () => this.setState({
                loading: false,
                id: "",
                type: "",
                date: "",
                amount: ""
            })
        })
        this.props.setOpenModal(this.openModal)

        this.jwtHelper = new JWTHelper(() => this.getUser(), (user) => this._login(user))
    }

    openModal = movement => {
        this.instance.open()
        this.setState({
            ...movement
        })
    }

    closeModal = () => {
        this.instance.close()
    }


    deleteMovement = e => {
        e.preventDefault()
        this.setState({
            loading: true
        })
        setTimeout(() => {
            this.jwtHelper.fetchJWTPromise(url("movements/" + this.state.id), 'delete').then(r => {
                M.toast({ html: r.message })
                this.closeModal()
                this.props.listMovements()
            }).catch(r => {
                M.toast({ html: r.message })
                this.closeModal()
            })
        }, 1000);
    }

    render() {
        return (
            <div id="modal-delete-movement" className="modal">
                <div className="modal-content">
                    <div className="input-field col s6">
                        <p>Delete movement of {this.state.type} {this.state.amount} on {this.state.dueDate} ?</p>
                    </div>
                </div>
                <div className="modal-footer">
                    <a onClick={e => this.deleteMovement(e)} href="#" className="waves-effect waves-green btn-flat">Delete</a>
                    
                </div>
                {this.state.loading ? (<div className="progress"><div className="indeterminate"></div></div>) : null}

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
        login: (user) => dispatch(actions.login(user)),
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalDeleteMovement)
