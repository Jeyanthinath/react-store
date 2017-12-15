import React, { Component } from 'react';
import axios from 'axios';

class CheckoutAndPay extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cart: [],
            checkout: 0,
            order_id: ''
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleClick1 = this.handleClick1.bind(this);
    }

    componentDidMount() {
        this.getCart();
    }

    getCart() {
        console.log("get cart ...")
        var self = this
        axios.get('http://localhost:3000/get_cart')
            .then(function (response) {
                console.log(response);
                self.setState({ cart: response.data.result })
            }).catch(err => console.log('error', err));
    }

    checkOut() {
        console.log("checking out the cart ...")
        var self = this
        axios.get('http://localhost:3000/checkout')
            .then(function (response) {
                console.log(response);
                alert("checkout completed...")
                self.setState({ 'order_id': response.data.data.id })
                self.setState({ 'checkout': 1 })
            }).catch(err => console.log('error', err));
    }

    pay() {
        var self = this
        alert('your order with order id ' + self.state.order_id + 'processed :)')
        return true
    }

    handleClick(e) {
        e.preventDefault();

        //checkout cart  & pay
        this.checkOut()
    }

    handleClick1(e) {
        e.preventDefault();

        //checkout cart  & pay
        this.pay()
    }


    render() {
        return (
            <div>
                <h1> Checkout </h1>
                <h2> Order Details </h2>
                {this.state.cart.map((data, index) => {
                    return (<div key={index}>
                        <span> <b>{data.name}</b> x 1 => {data.value.amount} </span>
                    </div>
                    );
                })
                }
                <br />
                <br />
                <form>
                    <label>
                        Address:
                    <input type="text" name="name" />
                    </label>
                    <br />
                    <label>
                        Credit Card Number:
                    <input type="text" name="name" />
                    </label>
                    <br />
                    {this.state.checkout === 0 ?
                        <input type="button" value="Checkout" onClick={this.handleClick} /> :
                        <input type="button" value="Pay" onClick={this.handleClick1} />
                    }
                </form>
                <div>
                    {this.state.order_id} is order_id
                </div>
            </div >
        );
    }
}

export default CheckoutAndPay;