import React, { Component } from 'react'
import 'materialize-css/dist/css/materialize.min.css'
import M from 'materialize-css'
import { url } from '../../../support/misc'

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
        let myHeaders = new Headers
        myHeaders.set("Content-Type", "application/json")
        let options = {
            url: url("categories/" + this.state.id),
            method: 'put',
            body: JSON.stringify({
                name: this.state.name
            }),
            headers: myHeaders
        }
        setTimeout(() => {
            fetch(options.url, options).then(r => r.json()).then(r => {
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

export default ModalEditCategory