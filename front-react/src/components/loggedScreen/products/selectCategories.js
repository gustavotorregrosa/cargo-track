import React, { Component } from 'react'
import M from 'materialize-css'

class SelectCategories extends Component {

    constructor(props){
        super(props)
        this.selectImposedCategory = this.selectImposedCategory.bind(this)
    }

    componentDidMount() {
        if(this.props.imposeCategory){
            this.props.imposeCategory(this.selectImposedCategory)
        }
       
        this.instance = M.FormSelect.init(this.elem, {})
    }

    selectImposedCategory(c){
        this.instance.destroy()  
        this.elem.value = c   
        this.instance = M.FormSelect.init(this.elem, {})
    }

    generateOptions = () => {
        let categories = []

        if (this.props.categories) {
            categories = this.props.categories.map(el => (<option value={el.id}>{el.name}</option>))
        }

        return categories
    }

    sendSelectedCategory = () => {
        this.instance.destroy()
        this.instance = M.FormSelect.init(this.elem, {})
        let i = this.instance.getSelectedValues()[0]
        if (this.props.updateOption) {
            if(i === "0"){
                i = null
            }
            this.props.updateOption(i)
        }
    }


    componentWillUnmount() {
        this.instance.destroy()
    }

    componentDidUpdate() {
        this.instance.destroy();
        this.instance = M.FormSelect.init(this.elem, {})
    }

    render() {
        return (
            <div className="input-field col s12">
                <select ref={
                    select => this.elem = select
                }
                    onChange={() => this.sendSelectedCategory()}>
                    {this.props.all ? (<option value="0" selected>All</option>) : (<option value="" disabled selected>Chose a category</option>)}
                    {this.generateOptions()}
                </select>
                <label>Categorias</label>
            </div>
        )
    }

}

export default SelectCategories