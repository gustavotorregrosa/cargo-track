import React, { Component } from 'react'

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

    buttons = el => (
        <div>
            <a href="#" onClick={(e) => this.activateEdition(e, el)}><i class="material-icons">edit</i></a>
            &nbsp;&nbsp;&nbsp;
                <a href="#" onClick={(e) => this.activateDeletion(e, el)} ><i class="material-icons">delete</i></a>
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


export default ProductsTable