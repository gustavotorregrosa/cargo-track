import React, { Component } from 'react'
import 'materialize-css/dist/css/materialize.min.css'
import M from 'materialize-css'
import { url, JWTHelper } from '../../../support/misc'
import { connect } from 'react-redux'
import * as actions from '../../../store/actions/index'

class ModalEditCategory extends Component {


    constructor(props) {
        super(props)
        this.elem = null
        this.instance = null
        this.openModal = this.openModal.bind(this)
    }

    state = {
        loading: false,
        id: "",
        name: ""
    }

    getUser = () => this.props.user

    _login = user => this.props.login(user)

    openModal = category => {
        this.instance.open()
        this.setState({
            ...category
        })
        setTimeout(() => {
            M.updateTextFields()
        }, 100)
    }


    componentDidMount() {
       
        this.instance = M.Modal.init(this.elem, {
            onCloseEnd: () => {
                this.setState({
                    loading: false,
                    id: "",
                    name: ""
                })
                setTimeout(() => {
                    M.updateTextFields()
                }, 100)
            }
        })
        this.props.setOpenModal(this.openModal)

        this.jwtHelper = new JWTHelper(() => this.getUser(), (user) => this._login(user))

    }


    closeModal = () => {
        this.instance.close()
    }

    changeCategoryText = e => {
        let name = e.target.value
        this.setState({
            name
        })
    }

    saveCategory = e => {
        e.preventDefault()
        this.setState({
            loading: true
        })
       
        setTimeout(() => {
            this.jwtHelper.fetchJWTPromise(url("categories/" + this.state.id), 'put', {
                name: this.state.name
            }).then(r => {
                M.toast({ html: r.message })
                this.closeModal()
                this.props.listCategories()
            }).catch(r => {
                M.toast({ html: r.message })
                this.closeModal()
            })
            
        }, 1000);
    }

    render() {
        return (
            <div ref={modal => this.elem = modal} className="modal">
                <div className="modal-content">
                    <div className="input-field col s6">
                        <input value={this.state.name} onChange={(e) => this.changeCategoryText(e)} id="new-name-category" type="text" className="validate" />
                        <label htmlFor="new-name-category">Edit category</label>
                    </div>
                </div>
                <div className="modal-footer">
                    <a onClick={e => this.saveCategory(e)} href="#" className="waves-effect waves-green btn-flat">Save</a>

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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditCategory)