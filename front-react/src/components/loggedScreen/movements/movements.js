import React, { Component } from 'react'
import MovementCreateModal from './createMovements'
import DeleteMovementModal from './modalDeleteMovement'
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import { url, JWTHelper } from '../../../support/misc'
import { connect } from 'react-redux'
import * as actions from '../../../store/actions/index'

class Movements extends Component {

    state = {
        product: null,
        movements: null
    }

    getUser = () => this.props.user

    _login = user => this.props.login(user)

    componentDidMount(){
        const product = this.props.match.params.productID
        this.setState({product})
        this.jwtHelper = new JWTHelper(() => this.getUser(), (user) => this._login(user))
        setTimeout(() => {
            this.listMovements()
        }, 100)
 

    }

    listMovements = () => {
        this.jwtHelper.fetchJWTPromise(url("movements/" + this.state.product)).then(response => {
            this.setState({
                movements: response.moviments
            })
        })
    }

    deleteButton = movement => (
        <div>
            <a href="#" onClick={(e) => this.activateDeletion(e, movement)}><i className="material-icons">delete</i></a>
        </div>
    )

    activateDeletion = (e, movement) => {
        e.preventDefault()
        console.log(movement)
        this.childOpenModalDeleteMovement(movement)
    }

    tableMovements = () => {
        let movements = []
        if(this.state.movements){
            movements = this.state.movements.map(m => (<tr key={m.id}><td>{m.type}</td><td>{m.dueDate}</td><td>{m.amount}</td><td>{this.deleteButton(m)}</td></tr>))
        }
        return movements
    }

    openModalCreate = e => {
        e.preventDefault()
        this.childOpenModalCreateMovement(this.state.product)
    }

    


    render(){
        return(
            <div>
                <br/>
                <br/>

                <div className="row">
                    <div className="col s5"><h5>Movements</h5></div>
                    <div className="col s6"><h5>{this.state.product && (this.state.product.name)}</h5></div>
                    
                    <div className="col s1">
                        <a
                            onClick={e => this.openModalCreate(e)}
                            style={{
                                marginTop: "1em"
                            }} className="btn-floating btn-large waves-effect waves-light red"><i className="material-icons">add</i></a>
                    </div>  
                </div>

                <br/>
                <br/>


                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>Type</th>
                                <th>Date</th>
                                <th>Amount</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {this.tableMovements()}
                        </tbody>
                    </table>
                </div>
                <DeleteMovementModal listMovements={() => this.listMovements()} setOpenModal={f => this.childOpenModalDeleteMovement = f} />
                <MovementCreateModal listMovements={() => this.listMovements()} setOpenModal={f => this.childOpenModalCreateMovement = f} />
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


export default connect(mapStateToProps, mapDispatchToProps)(Movements)
