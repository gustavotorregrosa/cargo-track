import React, { Component } from 'react'
import 'materialize-css/dist/css/materialize.min.css'
import M from 'materialize-css'

class MovementCreateModal extends Component {


    state = {
        loading: false
    }

    constructor(props) {
        super(props)
        this.elem = null
        this.instance = null
        this.openModal = this.openModal.bind(this)

    }


    componentDidMount() {
        this.instance = M.Modal.init(this.elem, {
            onCloseEnd: () => this.setState({
                loading: false,
                category: ""
            })
        })
        this.props.setOpenModal(this.openModal)

        // this.jwtHelper = new JWTHelper(() => this.getUser(), (user) => this._login(user))
    }

    openModal = () => {
        this.instance.open()
    }

    closeModal = () => {
        this.instance.close()
    }




    render() {
        return (
            <div ref={modal => this.elem = modal} className="modal">
                <div className="modal-content">
                    <div className="input-field col s6">
                        <input id="new-category-input" type="text" className="validate" />
                        <label htmlFor="new-category-input">New category</label>
                    </div>
                </div>
                <div className="modal-footer">
                    <a href="#" className="waves-effect waves-green btn-flat">Save</a>
                </div>
                {this.state.loading ? (<div className="progress"><div className="indeterminate"></div></div>) : null}

            </div>
        )
    }


}

export default MovementCreateModal