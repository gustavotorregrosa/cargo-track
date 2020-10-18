import React, { Component } from 'react'
import { withRouter} from 'react-router'

class ProductsTable extends Component {


    listItems = () => {
        let propducts = this.props.products
        let tbl = null
        if(propducts){
            tbl = propducts.map(el => (<tr key={el.id}><td>{el.name}</td><td>{this.buttons(el)}</td></tr>))
        } 
        return tbl
    }

    activateEdition = (e, el) => {
        e.preventDefault()
        this.props.edit(el)
    }

    activateDeletion = (e, el) => {
        e.preventDefault()
        this.props.delete(el)
    }

    goToMovements = (e, el) => {
        e.preventDefault()
        this.props.history.push('/movements/' + el.id)

    }

    buttons = el => (
        <div>
            <a href="#" onClick={(e) => this.activateEdition(e, el)}><i class="material-icons">edit</i></a>
            &nbsp;&nbsp;&nbsp;
            <a href="#" onClick={(e) => this.activateDeletion(e, el)} ><i class="material-icons">delete</i></a>
            &nbsp;&nbsp;&nbsp;
            <a href="#" onClick={(e) => this.goToMovements(e, el)} ><i class="material-icons">money</i></a>
        </div>
    )


    render() {
        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Products</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {this.listItems()}
                    </tbody>
                </table>
            </div>
        )
    }

}


export default withRouter(ProductsTable)