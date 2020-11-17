import React from 'react';
import { Link } from 'gatsby';
import Layout from '../components/layout'
import { Helmet } from 'react-helmet'
import Product from '../components/product'
import Productpage from './productpage'

class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: undefined
    }
  }

  componentDidMount() {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => this.setState({products: data}))
  }
    
  render() {
    return (
      <Layout>
        <div>
          {this.state.products 
            ? this.state.products.map(product => 
              <Link to={`../products/${product.ref['@ref'].id}`}>
                <Product id={product.ref['@ref'].id} name={product.data.name} description={product.data.description} price={product.data.price} />
              </Link>
            ) 
            : "No products"
          }
        </div>
      </Layout>
    )
  }
}

export default Products;