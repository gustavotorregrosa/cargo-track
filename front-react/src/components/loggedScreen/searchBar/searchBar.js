import React, { Component } from 'react'
import style from './style.module.css'

class SearchBar extends Component {
    
    state = {
        text: null,
        activateColor: false
    }

    changeSearchText = e => {
        let text = e.target.value
        let activateColor = text != ""
        this.setState({
            text,
            activateColor
        })
        this.props.informSearchText(text)
    }

    render(){
        let classesList = ['card', style.inputframe]
        if(this.state.activateColor){
            classesList.push(style.active)
        }
        classesList = classesList.join(' ')
        return (
            <div>
                <div className={classesList}>
                    <input 
                    onChange={e => this.changeSearchText(e)}
                    type="text"
                    placeholder="Search"
                    />
                </div>
            </div>
        )
    }

}

export default SearchBar