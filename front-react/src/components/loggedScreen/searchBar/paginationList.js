import React, { Component } from 'react'
import 'materialize-css/dist/css/materialize.min.css'


class PaginationList extends Component {

    getNumPages = () => {
        let num = 0
        if(this.props.items){
            let totalNum = this.props.items.length
            num = Math.ceil(totalNum / this.props.numItemsPerPage)
        }
        return num
    }

    changePage = (e, p) => {
        e.preventDefault()
        if(p > 0 && p <= this.getNumPages()){
            this.props.changePage(p)
        }
    }

    getItemsList = () => {
        let JSXlist = null
        if(this.getNumPages() > 1){
            let list = []
            for(let i = 1; i <= this.getNumPages(); i++){
                let classHTML = "waves-effect"
                if(i == this.props.page){
                    classHTML = "active"
                }
                list.push(
                    <li onClick={(e) => this.changePage(e, i)} className={classHTML}><a href="#!">{i}</a></li>
                )
            }
            let leftClass = "waves-effect"
            let rightClass = "waves-effect"
            if(this.props.page == 1){
                leftClass = "disabled"
            }
            if(this.props.page == this.getNumPages()){
                rightClass = "disabled"
            } 
            JSXlist = (
                <div>
                    <ul className="pagination">
                        <li onClick={(e) => this.changePage(e, (this.props.page -1))} className={leftClass}><a href="#"><i className="material-icons">chevron_left</i></a></li>
                            {list}
                        <li onClick={(e) => this.changePage(e, (this.props.page +1))} className={rightClass}><a href="#"><i className="material-icons">chevron_right</i></a></li>
                    </ul>
                </div>
            )
        }
        return JSXlist
    }

    render() {
        return this.getItemsList()
    }
    
}

export default PaginationList