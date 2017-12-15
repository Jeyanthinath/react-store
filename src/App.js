import React, { Component } from 'react';
import './App.css';
// import { cart } from '../public/cart.png'
import { Switch, Route } from 'react-router-dom';
import StoreHome from './routers/home/home'
import ProductsContainer from './routers/products/products'
import NotFound from './routers/shared/shared'

class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to TV Shop {this.props.cart1} </h1>
        </header>
        <Switch>
          <Route exact path="/" component={StoreHome} />
          <Route path="/products" component={ProductsContainer} handler={this.handler}/>
          <Route path="*" component={NotFound} />
        </Switch>
        <p className="App-intro">
        </p>
          <footer>
            <hr/>
            &copy; jeyanthi <code>2017</code>
          </footer>
      </div>
    );
  }
}

export default App;
