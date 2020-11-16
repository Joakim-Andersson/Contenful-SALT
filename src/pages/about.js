import React from 'react';
import Layout from '../components/layout'
import get from 'lodash/get'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'

class About extends React.Component {
  render() {
  const test = get(this, 'props.data')
  const text = get(this, 'props.data.allContentfulPages.nodes[0].aboutText.aboutText')
  const siteTitle = get(this, 'props.data.site.siteMetadata.title')
  const title = get(this, 'props.data.allContentfulPages.nodes[0].title')

  return (
    <Layout>
      <Helmet title={siteTitle} />
      <h1>{title}</h1>
      <p>{text}</p>
    </Layout>
  )
}
}

export default About;

export const pageQuery = graphql`
  query AboutQuery {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulPages {
        nodes {
          aboutText {
            aboutText
          }
          title
      }
    }
  }
`