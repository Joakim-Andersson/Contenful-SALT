import React from 'react';
import { Link } from 'gatsby';
import { Helmet } from 'react-helmet'

const Product = ({ name, description, price, id }) => {
  return (
    <article>
      <h3>{name}</h3>
      <p>{description}</p>
      <p>
        <small>$</small>
        <strong>{price}</strong>
      </p>
    </article>
  )
}

export default Product;
