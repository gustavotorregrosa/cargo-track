import React, { Component } from 'react'
import M from 'materialize-css'
import SelectCategories from './selectCategories'
import { url, JWTHelper } from '../../../support/misc'
import { connect } from 'react-redux'
import * as actions from '../../../store/actions/index'

class CreateEditProduct extends Component {

    constructor(props) {
        super(props)
        this.elem = null
        this.instance = null
        this.openModal = this.openModal.bind(this)
        this.inputName = null
    }

    state = {
            loading: null,
            id: null,
            name: null,
            categoryId: null
    }


    getUser = () => this.props.user

    _login = user => this.props.login(user)


    imposeCategorySelection = (c = null) => {
        this.childSelectCategory(c)
    }

    clearEelments = () => {
        this.inputName.value = null
        this.imposeCategorySelection()
    }

    setInitialState = () => {
        this.setState({
            loading: null,
            id: null,
            name: null,
            category: null,

        })

    }

    componentDidMount() {
        this.elem = document.getElementById('modal-new-product')
        this.instance = M.Modal.init(this.elem, {
            onCloseStart: () => {
                this.clearEelments()
                this.setInitialState()
            }
        })
        this.props.setOpenModal(this.openModal)

        this.jwtHelper = new JWTHelper(() => this.getUser(), (user) => this._login(user))

    }

    openModal = (p = null) => {
        this.instance.open()
        if (p) {
            this.inputName.value = p.name
            M.updateTextFields()
            this.imposeCategorySelection(p.categoryId)
            this.setState({
                ...p
            })
        }
    }

    updateState = obj => {
        this.setState(obj).call(this)
    }


    closeModal = () => {
        this.instance.close()
    }

    updateCategory = category => {
        this.setState({
            category
        })
    }

    saveProduct = e => {
        e.preventDefault()
        this.setState({
            loading: true
        })
       
        setTimeout(() => {
            this.jwtHelper.fetchJWTPromise(url('products'), 'post', { ...this.state }).then(r => {
                M.toast({ html: r.message })
                this.props.listProducts()
                this.closeModal()
            }).catch(r => {
                M.toast({ html: r.message })
                this.closeModal()
            })
        }, 1000);

    }

    changeProductName = e => {
        let name = e.target.value
        this.setState({
            name
        })
    }


    render() {
        return (
            <div id="modal-new-product" className="modal">
                <div className="modal-content">
                    <div className="row">
                        <div className="input-field col s6">
                            <input
                                ref={
                                    input => this.inputName = input
                                }
                                onChange={e => this.changeProductName(e)} id="new-product" type="text" />
                            <label htmlFor="new-product">New product</label>
                        </div>
                        <div className="col s6">
                            <SelectCategories imposeCategory={f => this.childSelectCategory = f} updateOption={(op) => this.updateCategory(op)} categories={this.props.categories} />
                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <a href="#" onClick={e => this.saveProduct(e)} className="waves-effect waves-green btn-flat">Save</a>

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

export default connect(mapStateToProps, mapDispatchToProps)(CreateEditProduct)