import React, { Component } from 'react'
import { connect } from 'react-redux'
import Chart from 'chart.js'
import * as actions from '../../../store/actions/index'
import 'materialize-css/dist/css/materialize.min.css'
import M from 'materialize-css'
import { url, JWTHelper } from '../../../support/misc'

class ModalChart extends Component {
    
    constructor(props) {
        super(props)
        this.elem = null
        this.instance = null
        this.openModal = this.openModal.bind(this)
        this.chart = null
        this.ctx = null
    }

    state = {
        loading: false,
        productId: null,
        points: [],
    }

    getUser = () => this.props.user

    _login = user => this.props.login(user)

    getData = () => {
        let data = this.state.points.map(point => {
            return {
                x: new Date(point.date),
                y: point.value
            }
        })

     return data
    }

    updatePoints = () => {
        console.log(this.state.productId)
        this.jwtHelper.fetchJWTPromise(url("movements/positions/" + this.state.productId)).then(points => {
            console.log(points)
            this.setState({
                points: points.positions
            })
            this.createChart()

         })
    }

    createChart = () => {
        this.chart = new Chart(this.ctx, {
            // The type of chart we want to create
            type: 'line',

            data: {
                datasets: [
                    {
                        label: 'Stock over time',
                        data: this.getData(),
                    }
                ]
            },
        
            options: {
                scales: {
                    xAxes: [{
                        type: 'time',
                        distribution: 'linear'
                    }]
                }
            }
        });

    }

    componentDidMount() {
        this.elem = document.getElementById('modal-chart')
        this.instance = M.Modal.init(this.elem, {
            onCloseEnd: () => this.setState({
                loading: false,
                productId: null,
                points: "",
            })
        })
        this.props.setOpenModal(this.openModal)

        this.jwtHelper = new JWTHelper(() => this.getUser(), (user) => this._login(user))
        
        this.ctx = document.getElementById('myChart').getContext('2d');
        // this.createChart()
        
    
    }

    openModal = product => {
        console.log(product)
        this.instance.open()
        this.setState({
            productId: product
        })
        setTimeout(() => {
            this.updatePoints()
        }, 1000)
        
    }

    closeModal = () => {
        this.instance.close()
    }


    render() {
        return (
            <div id="modal-chart" className="modal">
                <div className="modal-content">
                    <canvas id="myChart"></canvas>
                </div>
                {this.state.loading ? (<div className="progress"><div className="indeterminate"></div></div>) : null}

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

export default connect(mapStateToProps, mapDispatchToProps)(ModalChart)
