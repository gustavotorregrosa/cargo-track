import React, {Component} from 'react'
import 'materialize-css/dist/css/materialize.min.css'
import M from 'materialize-css'
import { connect } from 'react-redux'
import * as actions from '../../store/actions/index'
import { url } from '../../support/misc'

class Logout extends Component {

    constructor(props){
        super(props)
    }

    state = {
        loading: false,
    }

    openModal = () => {
        this.instanceModal.open()
        M.updateTextFields()
        this.setState({
            loading: false
        })
    }

    componentDidMount(){
        this.activateModal()
    }

    activateModal = () => {
        this.instanceModal = M.Modal.init(this.modal, {
            onCloseEnd: () => this.setState({
                loading: false
            })
        })     
        this.props.setOpenModal(this.openModal)   
    }

 
    logout = e => {
        e.preventDefault()

        this.setState({
            loading: true
        })

        setTimeout(() => {
            this.props.logout()
            this.instanceModal.close()
            M.toast({html: 'User logged out'})

        }, 1000)

    }

    render() {
        return (
            <div>
                <div ref={modal => this.modal = modal} className="modal">
                    <div className="modal-content">
                        <div className="row">
                            <div className="input-field col s12">
                                <p>Logout from {this.props.user.email}</p>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <a href="#!" onClick={e => this.logout(e)} className="waves-effect waves-green btn-flat">Logout</a>
                        </div>
                        {this.state.loading ? (<div className="progress"><div className="indeterminate"></div></div>) : null}
                    </div>
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

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(actions.logout()),
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout)