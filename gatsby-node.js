const Promise = require('bluebird')
const path = require('path')
const fetch = require('node-fetch')

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  //Change/remove this chunk of code
  const productComponent = path.resolve('./src/components/product')
  const products = await fetch('http://localhost:8888/api/products').then(res => res.json())
  products.forEach(product => {
    const id = product.ref['@ref'].id
    createPage({
      path: `/products/${id}`,
      component: productComponent,
      context: id
    })
  })

  return new Promise((resolve, reject) => {
    const blogPost = path.resolve('./src/templates/blog-post.js')
    const about = path.resolve('./src/pages/about.js')

    resolve(
      graphql(
        `
          {
            allContentfulBlogPost {
              edges {
                node {
                  title
                  slug
                }
              }
            }
            allContentfulPages {
              nodes {
                title
                aboutText {
                  aboutText
                }
              }
            }
          }
          `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        const posts = result.data.allContentfulBlogPost.edges
        posts.forEach((post, index) => {
          createPage({
            path: `/blog/${post.node.slug}/`,
            component: blogPost,
            context: {
              slug: post.node.slug
            },
          })
        })
      })
    )
  })
}
