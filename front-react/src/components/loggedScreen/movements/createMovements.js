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
        this.selectInstance = null
        this.selectElem = null
        this.datePickerElem = null
        this.datePickerInstance = null
        this.openModal = this.openModal.bind(this)

    }


    componentDidMount() {
        this.instance = M.Modal.init(this.elem, {
            onCloseEnd: () => this.setState({
                loading: false,
                category: ""
            })
        })

        this.selectInstance = M.FormSelect.init(this.selectElem, {})

        this.datePickerInstance = M.Datepicker.init(this.datePickerElem, {
            onOpen: () => {
                this.elem.style.height = '60%'
            },

            onClose: () => {
                this.elem.style.height = '15em'
            }
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
            <div ref={modal => this.elem = modal} className="modal" style={{width: '80%', height: '15em'}}>
                <div className="modal-content">
                    <div className="row">
                        <div className="input-field col s4">
                            <select ref={select => this.selectElem = select}>
                                <option value="" disabled selected>Sell/ Buy</option>
                                <option value="sell">Sell</option>
                                <option value="buy">Buy</option>
                            </select>
                            <label>Movement type</label>
                        </div>

                        <div className="input-field col s4">
                            <input ref={input => this.datePickerElem = input} type="text" className="datepicker"/>
                            <label>Date</label>
                        </div>
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