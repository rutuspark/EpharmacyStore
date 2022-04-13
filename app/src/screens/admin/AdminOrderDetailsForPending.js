import {Link} from 'react-router-dom'
import React, { Component } from 'react'
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer"; 
import ApiCustomerService from "../../services/customer/ApiCustomerService";

class AdminOrderDetailsForPendingScreen extends Component{

    constructor(props) {
        super(props)
        this.state = {
            orderDetails :[],
      }
        this.getOrdersDetails = this.getOrdersDetails.bind(this);
        this.backToOrderHistory = this.backToOrderHistory.bind(this);
    }
    
    componentDidMount() {
      this.getOrdersDetails();
      console.log(this.state.orderDetails);
    }

    getOrdersDetails() {
        ApiCustomerService.fetchOrdersdetails(window.localStorage.getItem("orderIdForDetails"))
        .then((res) => {
            this.setState({orderDetails : res.data.result})
        }); 
    }

    backToOrderHistory(){
        this.props.history.push('/pendingorderforadmin');
    }

    deliverDetails(){
        this.state.orderInfo = {orderId : JSON.parse(window.localStorage.getItem("orderIdForDetails"))};
        ApiCustomerService.deliver(this.state.orderInfo);
    }

    deliver() {
        this.deliverDetails();
        alert('Order Delivered Successfully')
        window.localStorage.removeItem("cart_size");
        window.localStorage.removeItem("deliveryBoyId");
        window.localStorage.removeItem("orderIdForDetails");

        this.props.history.push('/pendingorderforadmin');
    }


    render() {
    return (
       <div>
           <Navigation/>
            <div className="container">
        <h2 className="text-center">Orders Details</h2>
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Product Name</th>
                    <th>QTY</th>
                    <th>Price</th>
                    <th>Final Price</th>
                </tr>
            </thead>
            <tbody>
                {this.state.orderDetails.orderItems?.map(
                        order =>
                            <tr>
                                <td>{order.product.name}</td>
                                <td>{order.quantity}</td>
                                <td>{order.price}</td>
                                <td>{order.total}</td>
                            </tr>
                    )
                }
            </tbody>    
            <td><button className="btn4 btn-success" onClick={() => this.backToOrderHistory()}>Back</button></td>    
            <td><button className="btn4 btn-success" onClick={() => this.deliver()}>Deliver</button></td>                   
        </table>
        
    </div>
       </div>
    );
    }
}
export default AdminOrderDetailsForPendingScreen