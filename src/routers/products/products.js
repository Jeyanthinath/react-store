import React, { Component } from 'react';
import axios from 'axios';

class ProductsContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            products: []
        };
        // this.ListProducts = this.ListProducts.bind(this);
    }
    componentDidMount() {
        this.ListProducts();
    }

    ListProducts() {
        var self = this
        axios.get('http://localhost:3000/')
        .then(function (response) {
            console.log(response.data.result);
            self.setState({ products: response.data.result })
          }).catch(err => console.log('error', err));
    }

    render() {
        console.log('products is ',this.state.products)
        return (
            <div>
                <h1> Products Home </h1>
                {this.state.products.map((data, index) => {
                    return <li key={index}> {data.type} </li>
                })
                }
            </div>
        );
    }
}

export default ProductsContainer;