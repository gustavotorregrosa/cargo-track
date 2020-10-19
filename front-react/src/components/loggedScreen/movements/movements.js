import React, { Component } from 'react'
import MovementCreateModal from './createMovements'

class Movements extends Component {

    state = {
        product: null,
        movements: null
    }

    tableMovements = () => {
        let movements = []
        if(this.state.movements){
            movements = this.state.movements.map(m => (<tr key={m.type}><td>{m.date}</td><td>{m.amount}</td></tr>) )
        }
        return movements
    }

    openModalCreate = e => {
        e.preventDefault()
        this.childOpenModalCreateMovement()
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
                            </tr>
                        </thead>

                        <tbody>
                            {this.tableMovements()}
                        </tbody>
                    </table>
                </div>

                <MovementCreateModal setOpenModal={f => this.childOpenModalCreateMovement = f} />
            </div>
        )
    }

}

export default Movements