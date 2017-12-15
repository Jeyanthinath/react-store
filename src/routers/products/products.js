import React, { Component } from 'react';
import axios from 'axios';

class ProductsContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            products: [],
            cart: [],
            message: ''
        };
        this.handleClick = this.handleClick.bind(this);
    }
    componentDidMount() {
        this.ListProducts();
        this.getCart();
    }

    ListProducts() {
        var self = this
        self.setState({ 'message': "Adding to cart..." })
        axios.get('http://localhost:3000/')
            .then(function (response) {
                console.log(response.data.result);
                self.setState({ products: response.data.result })
            }).catch(err => console.log('error', err));
        self.setState({ 'message': "" })
    }

    updateCart(itemId) {
        var self = this
        console.log("updating cart ...")
        self.setState({ 'message': "retriving cart...." })
        var req_url = 'http://localhost:3000/add/' + itemId
        axios.get(req_url)
            .then(function (response) {
                self.getCart();
            }).catch(err => console.log('error', err))
        self.setState({ 'message': "" })
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


    handleClick(e) {
        e.preventDefault();
        var itemId = e.target.id;

        //update cart items
        this.updateCart(itemId)
    }


    render() {
        return (
            <div>
                <h1> <u>Products Home</u> </h1>
                <div className='cart'>
                    {this.state.message}
                    ({this.state.cart.length} items in cart)
                    {this.state.cart.length > 0 ?
                        <a href="/checkout"> <u> Review & Checkout </u> </a> : null
                    }
                </div>
                {this.state.products.map((data, index) => {
                    return (<div key={index}>
                        <span> <h3> {data.name}  </h3> <h4> {data.meta.display_price.with_tax.formatted} </h4> </span>
                        <button id={data.id} onClick={this.handleClick}> Add to Cart </button>
                        <hr style={{ width: 40 + '%' }} />
                    </div>
                    );
                })
                }
            </div>
        );
    }
}

export default ProductsContainer;