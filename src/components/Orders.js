import React, { Component } from 'react'
import {fetchOrders} from '../actions/orderActions'
import { connect } from 'react-redux'
import formatCurrency from '../util';

 class Orders extends Component {
    componentDidMount(){
        this.props.fetchOrders();
    }
    render() {
        const {orders}=this.props;        
        return !orders ? <div>Orders</div>:
            <div className="orders">
                <h2>Orders</h2>
                <table>
                    <thead>
                        <tr>
                            <td>
                                ID
                            </td>
                            <td>
                                DATE
                            </td>
                            <td>
                                TOTAL
                            </td>
                            <td>
                                NAME
                            </td>
                            <td>
                                EMAIL
                            </td>
                            <td>
                                ADDRESS
                            </td>
                            <td>
                                ITEMS
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order=>(
                            <tr>
                                <td>{order._id}</td>
                                <td>{order.createdAt}</td>
                                <td>{formatCurrency(order.total)}</td>
                                <td>{order.name}</td>
                                <td>{order.email}</td>
                                <td>{order.address}</td>
                                <td>{order.cartItems.map(item=>
                                    <div>
                                        {item.count}{" x "}{item.title}
                                    </div>
                                    )}</td>
                            </tr>                            
                        ))}

                    </tbody>
                </table>
            </div>
            
        
    }
}

const mapProps=(state)=>{
    console.log('state')
    console.log(state)
    return {    
    orders:state.order.orders
}}

const mapActions={
    fetchOrders
}

export default connect(mapProps,mapActions)(Orders)