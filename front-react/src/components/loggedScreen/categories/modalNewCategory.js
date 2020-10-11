import React, { Component } from 'react'
import 'materialize-css/dist/css/materialize.min.css'
import M from 'materialize-css'
import { url, JWTHelper } from '../../../support/misc'
import { connect } from 'react-redux'
import * as actions from '../../../store/actions/index'

class ModalNewCategory extends Component {

    constructor(props) {
        super(props)
        this.elem = null
        this.instance = null
        this.openModal = this.openModal.bind(this)

    }

    state = {
        loading: false,
        category: ""
    }

    getUser = () => this.props.user

    _login = user => this.props.login(user)

    componentDidMount() {
        this.instance = M.Modal.init(this.elem, {
            onCloseEnd: () => this.setState({
                loading: false,
                category: ""
            })
        })
        this.props.setOpenModal(this.openModal)

        this.jwtHelper = new JWTHelper(() => this.getUser(), (user) => this._login(user))
    }

    openModal = () => {
        this.instance.open()
    }

    closeModal = () => {
        this.instance.close()
    }

    changeCategoryText = e => {
        let category = e.target.value
        this.setState({
            category
        })
    }

    saveCategory = e => {
        e.preventDefault()
        this.setState({
            loading: true
        })
        let myHeaders = new Headers
        myHeaders.set("Content-Type", "application/json")
        let options = {
            url: url("categories"),
            method: 'post',
            body: JSON.stringify({
                name: this.state.category
            }),
            headers: myHeaders
        }
        setTimeout(() => {

            this.jwtHelper.fetchJWTPromise(url("categories/"), 'post', {
                name: this.state.category
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
                        <input id="new-category-input" value={this.state.category} onChange={(e) => this.changeCategoryText(e)} type="text" className="validate" />
                        <label htmlFor="new-category-input">New category</label>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalNewCategory)
