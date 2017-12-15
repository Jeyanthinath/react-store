import React, { Component } from 'react';
import axios from 'axios';

class ProductsContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            products: [],
            cart: []
        };
        this.handleClick = this.handleClick.bind(this);
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

    handleClick(e) {
        e.preventDefault();
        let new_cart=this.state.cart
        var itemName = e.target.id;
        new_cart.push({'item': itemName})
        this.setState({cart: new_cart})
      }


    render() {
        return (
            <div>
                <h1> <u>Products Home</u> </h1>
                <div className='cart'>
                    ({this.state.cart.length} items in cart)
                    { this.state.cart.length > 0 ?
                        <a href='/checkout'> <u> Checkout </u> </a> : null
                    }
                </div>
                {this.state.products.map((data, index) => {
                    return (<div key={index}>
                                <span> <h3> {data.name}  </h3> <h4> {data.meta.display_price.with_tax.formatted} </h4> </span>
                                <button id={data.id} onClick={this.handleClick}> Add to Cart </button>
                                <hr style={{width: 40+'%'}}/>
                            </div>
                    );
                })
                }
            </div>
        );
    }
}

export default ProductsContainer;