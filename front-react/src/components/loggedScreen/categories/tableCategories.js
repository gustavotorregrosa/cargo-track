import React, { Component } from 'react'

class CategoriesTable extends Component {

    listItems = () => {
        if (this.props.categories) {
            let categories = [...this.props.categories]
            let tbl = categories.map(el => (<tr key={el.id}><td>{el.name}</td><td>{this.buttons(el)}</td></tr>))
            return tbl
        }
        return null
    }   

    buttons = el => {
        return (
            <div>
                <a href="#" onClick={(e) => this.activateEdition(e, el)}><i className="material-icons">edit</i></a>
                &nbsp;&nbsp;&nbsp;
                <a href="#" onClick={(e) => this.activateDeletion(e, el)}><i className="material-icons">delete</i></a>
            </div>
        )
    }

    activateEdition = (e, el) => {
        e.preventDefault()
        this.props.edit(el)
    }

    activateDeletion = (e, el) => {
        e.preventDefault()
        this.props.delete(el)
    }

    render() {
        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Categories</th>
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

export default CategoriesTable