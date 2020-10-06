import React, { Component } from 'react'
import SearchBar from '../searchBar/searchBar'
import PaginationList from '../searchBar/paginationList'
import { url } from '../../../support/misc'
import TableCategories from './tableCategories'
import ModalNewCategory from './modalNewCategory'
import ModalEditCategory from './modalEditCategory'
import ModalDeleteCategory from './modalDeleteCategory'

class Categories extends Component {

    state = {
        categories: null,
        searchText: null,
        page: 1
    }

    itemsPerPage = 5

    changeSearchText = (t) => {
        let texto = t ? t : null
        this.setState({
            searchText: texto,
            page: 1
        })
    }

    changePage = page => {
        this.setState({
            page
        })
    }

    completeCategoriesList = () => {
        fetch(url("categories")).then(categories => categories.json()).then(categories => {
            this.setState({
                categories,
                page: 1
            })
        })

        
    }

    componentDidMount() {
        setTimeout(() => {
            this.completeCategoriesList()
        }, 100)
    }

    getCategories = () => {
        let categories = this.state.categories
        let t = this.state.searchText
        if (t) {
            categories = Array.from(this.state.categories).filter(c => c.name.toLowerCase().includes(t.toLowerCase()))
        }
        return categories
    }

    getPagedCategories = () => {
        let page = this.state.page
        let categoriesF = null
        let categories = this.getCategories()
        if (categories) {
            categoriesF = Array.from(categories).filter((el, i) => {
                let startAt = (page - 1) * this.itemsPerPage
                let endAt = page * this.itemsPerPage - 1
                if ((i >= startAt) && (i <= endAt)) {
                    return true
                }
                return false
            })
        }
        return categoriesF
    }

    changeSearchText = (t) => {
        let searchText = t ? t : null
        this.setState({
            searchText,
            page: 1
        })
    }

    openModalCreateCategory = e => {
        e.preventDefault()
        this.childOpenModalCreateCategory()
    }

    openModalEditCategory = category => {
        this.childOpenModalEditCategory(category)
    }

    openModalDeleteCategory = category => {
        this.childOpenModalDeleteCategory(category)
    }


    render(){
        return (
            <div>
                <div className="row">
                    <div className="col s5"><h5>Categories</h5></div>
                    <div className="col s6">
                        <SearchBar informSearchText={(t) => { this.changeSearchText(t) }} />
                    </div>
                    <div className="col s1">
                        <a
                            onClick={e => this.openModalCreateCategory(e)}
                            style={{
                                marginTop: "1em"
                            }} className="btn-floating btn-large waves-effect waves-light red"><i className="material-icons">add</i></a>
                    </div>
                    
                </div>
                <div className="row">
                    <div className="col s4 offset-s8">
                        <PaginationList page={this.state.page} changePage={(p) => this.changePage(p)} numItemsPerPage={this.itemsPerPage} items={this.getCategories()} />
                        
            </div>
                </div>
                <br />
                <br />
                <TableCategories delete={(el) => this.openModalDeleteCategory(el)} edit={(el) => this.openModalEditCategory(el)} categories={this.getPagedCategories()} />
                <ModalNewCategory listCategories={() => this.completeCategoriesList()} setOpenModal={f => this.childOpenModalCreateCategory = f} />
                <ModalEditCategory listCategories={() => this.completeCategoriesList()} setOpenModal={f => this.childOpenModalEditCategory = f} />
                <ModalDeleteCategory listCategories={() => this.completeCategoriesList()} setOpenModal={f => this.childOpenModalDeleteCategory = f} />
            </div>
        )
    }

}

export default Categories