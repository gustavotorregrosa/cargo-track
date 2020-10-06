import React, { Component } from 'react'
import SearchBar from '../searchBar/searchBar'
import SelectCategories from './selectCategories'
import PaginationList from '../searchBar/paginationList'
import ProductsTable from './tableProducts'
import CreateEditProduct from './createEditProduct'
import DeleteProduct from './deleteProduct'
import { url } from '../../../support/misc'

class Products extends Component {

    state = {
        categories: [],
        selection: null,
        search: null,
        products: [],
        page: 1
    }

    numItemsPerPage = 5

    componentDidMount() {
        this.completeListCategories()
        this.completeListProducts()
    }


    changePage = (page = null) => {
        this.setState({
            page
        })
    }

    getProducts = () => {
        let products = this.state.products
        return products
    }

    filteredListProducts = () => {
        let products = this.state.products
        let category = this.state.selection
        let search = this.state.search
       

        if (products.length) {
            if (category) {
                products = products.filter(el => el.categoryId == category)
            }
        }

        if(search){
            products = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
        }

        return products

    }

    pagedListProducts = () => {
        let page = this.state.page
        let products = this.filteredListProducts()
        let productsF = null
        if (products) {
            productsF = products.filter((el, i) => {
                let startOn = (page - 1) * this.numItemsPerPage
                let endOn = page * this.numItemsPerPage - 1
                if ((i >= startOn) && (i <= endOn)) {
                    return true
                }
                return false
            })
        }
        return productsF

    }

    completeListProducts = () => {
        fetch(url("products")).then(products => products.json()).then(products => {
            this.setState({
                products
            })
            if(products.length <= this.numItemsPerPage){
                this.setState({
                    page: 1
                })
            }
        })
    }


    completeListCategories = () => {
        fetch(url("categories")).then(r => r.json()).then(categories => {
            this.setState({
                categories
            })
        })
    }


    openModalEdit = el => {
        this.childOpenModalCreateEditProduct(el)
    }

    openModalDelete = el => {
        this.childOpenModalDeleteProduct(el)
    }

    openModalCreate = e => {
        e.preventDefault()
        this.childOpenModalCreateEditProduct()
    }

    listProducts = () => {
        this.childListProducts()
    }

    updatedSelectionOption = selection => {
        this.setState({
            selection,
            page: 1
        })
    }

    changeSearchText = search => {
        this.setState({
            search,
            page: 1
        })
    }

    


    render(){
        return (
            <div>
            <br />
            <br />
            <div className="row">
                <div className="col s5"><h5>Products</h5></div>
                <div className="col s6">
                    <SearchBar informSearchText={(t) => this.changeSearchText(t) } />
                </div>
                <div className="col s1">
                    <a
                        onClick={e => this.openModalCreate(e)}
                        style={{
                            marginTop: "1em"
                        }} className="btn-floating btn-large waves-effect waves-light red"><i className="material-icons">add</i></a>
                </div>
            </div>

            <div className="row">
                <div className="col s4">
                    <SelectCategories all={true} updateOption={(op) => this.updatedSelectionOption(op)} categories={this.state.categories} />
                </div>
                <div className="col s4">
                    <PaginationList page={this.state.page} changePage={(p) => this.changePage(p)} numItemsPerPage={this.numItemsPerPage} items={this.getProducts()} />
                </div>
            </div>
            <br />
            <br />
            <ProductsTable products={this.pagedListProducts()} edit={(el) => this.openModalEdit(el)} delete={(el) => this.openModalDelete(el)} />
            <CreateEditProduct listProducts={() => this.completeListProducts()} categories={this.state.categories} setOpenModal={f => this.childOpenModalCreateEditProduct = f} />
            <DeleteProduct setOpenModal={f => this.childOpenModalDeleteProduct = f} listProducts={() => this.completeListProducts()} />
             
        </div>
        )
    }

}

export default Products