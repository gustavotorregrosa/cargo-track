import React, { Component } from 'react'
import 'materialize-css/dist/css/materialize.min.css'
import M from 'materialize-css'
import { url } from '../../../support/misc'

class DeleteProduct extends Component {

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

    componentDidMount() {
        this.elem = document.getElementById('modal-delete-product')
        this.instance = M.Modal.init(this.elem, {
            onCloseEnd: () => this.setState({
                loading: false,
                id: "",
                name: ""
            })
        })
        this.props.setOpenModal(this.openModal)
    }

    openModal = (prd) => {
        let {id, name} = prd 
        this.setState({
            id,
            name
        })
        this.instance.open()
    }

    closeModal = () => {
        this.instance.close()
    }

    deleteProduct = e => {
        e.preventDefault()
        this.setState({
            loading: true
        })
        let myHeaders = new Headers
        myHeaders.set("Content-Type", "application/json")
        let options = {
            url: url('products/' + this.state.id),
            method: 'delete',
            headers: myHeaders
        }
        setTimeout(() => {
            fetch(options.url, options).then(r => r.json()).then(r => {
                M.toast({ html: r.message })
                this.closeModal()
                this.props.listProducts()
            }).catch(r => {
                M.toast({ html: r.message })
                this.closeModal()
            })
        }, 1000);
    }

    render() {
        return (
            <div id="modal-delete-product" className="modal">
                <div className="modal-content">
                    <div className="input-field col s6">
                        <p>Delete the product {this.state.name} ?</p>
                    </div>
                </div>
                <div className="modal-footer">
                    <a onClick={e => this.deleteProduct(e)} href="#" className="waves-effect waves-green btn-flat">Delete</a>
                    
                </div>
                {this.state.loading ? (<div className="progress"><div className="indeterminate"></div></div>) : null}

            </div>
        )
    }
}

export default DeleteProduct