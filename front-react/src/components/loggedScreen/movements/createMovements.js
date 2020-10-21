import React, { Component } from 'react'
import { connect } from 'react-redux'
import 'materialize-css/dist/css/materialize.min.css'
import * as actions from '../../../store/actions/index'
import { url, JWTHelper } from '../../../support/misc'
import M from 'materialize-css'

class MovementCreateModal extends Component {


    state = {
        loading: false,
        type: '',
        date: '',
        amount: 0,
    }

    constructor(props) {
        super(props)
        this.elem = null
        this.instance = null
        this.selectInstance = null
        this.selectElem = null
        this.datePickerElem = null
        this.datePickerInstance = null
        this.amountInput = null
        this.openModal = this.openModal.bind(this)

    }

    componentDidMount() {
        this.instance = M.Modal.init(this.elem, {
            onCloseEnd: () => this.setState({
                loading: false,
                type: '',
                date: '',
                amount: 0,

            })
        })

        this.selectInstance = M.FormSelect.init(this.selectElem, {})

        this.datePickerInstance = M.Datepicker.init(this.datePickerElem, {
            onOpen: () => {
                this.elem.style.height = '60%'
            },

            onClose: () => {
                this.elem.style.height = '15em'
            },

            onSelect: d => {
                this.datePickerChange(d)
            }


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

    changeSelect = e => {
        e.preventDefault()
        this.selectInstance.destroy()
        this.selectInstance = M.FormSelect.init(this.selectElem, {})
        const type = this.selectInstance.getSelectedValues()[0]
        this.setState({
            type
        })
    }

    datePickerChange = date => {
        this.setState({
            date: date.toISOString()
        })
    }

    amountChange = e => {
        let amount = e.target.value
        this.setState({
            amount
        })
    }
    
    saveMovement = e => {
        e.preventDefault()
        this.setState({
            loading: true
        })
        setTimeout(() => {

            this.jwtHelper.fetchJWTPromise(url("movements/"), 'post', {
                ...this.state
            }).then(r => {
                M.toast({ html: r.message })
                this.closeModal()
                // this.props.listCategories()
            }).catch(r => {
                M.toast({ html: r.message })
                this.closeModal()
            })
        }, 1000);
        console.log(this.state)
    }


    render() {
        return (
            <div ref={modal => this.elem = modal} className="modal" style={{width: '80%', height: '15em'}}>
                <div className="modal-content">
                    <div className="row">
                        <div className="input-field col s4">
                            <select onChange={e => this.changeSelect(e)} ref={select => this.selectElem = select}>
                                <option value="" disabled selected>Sell/ Buy</option>
                                <option value="sell">Sell</option>
                                <option value="buy">Buy</option>
                            </select>
                            <label>Movement type</label>
                        </div>

                        <div className="input-field col s4">
                            <input onChange={ e => this.datePickerChange(e)} ref={input => this.datePickerElem = input} type="text" className="datepicker"/>
                            <label>Date</label>
                        </div>

                        <div className="input-field col s4">
                            <input onChange={ e => this.amountChange(e)} ref={input => this.amountInput = input} type="number"/>
                            <label>Amount</label>
                        </div>
                    </div>
                    
                </div>
                <div className="modal-footer">
                    <a href="#" disabled={this.state.type == ""} onClick={e => this.saveMovement(e)} className="waves-effect waves-green btn-flat">Save</a>
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


export default connect(mapStateToProps, mapDispatchToProps)(MovementCreateModal)