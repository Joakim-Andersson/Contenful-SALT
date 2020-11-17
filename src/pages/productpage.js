import React, { useEffect, useState } from 'react';
import { Link } from 'gatsby';
import { Helmet } from 'react-helmet'
import Layout from '../components/layout'
import Product from '../components/product'

const Productpage = ({ pageContext: { id } }) => {
  const[product, setProduct] = useState(undefined)

  useEffect(() => {
    console.log("PAGE ID                    ", id);
    fetch(`/api/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data))
      .catch(err => console.log(err))
  }, [])

  return (
    <Layout>
      {product ? 
          <Product 
            id={product.ref['@ref'].id} 
            name={product.data.name} 
            description={product.data.description} 
            price={product.data.price} 
          />
      : "No product"}
    </Layout>
  )
}

export default Productpage;
