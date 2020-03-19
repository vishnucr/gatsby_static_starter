/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
// Implement the Gatsby API “createPages”. This is called once the
// data layer is bootstrapped to let plugins create pages from data.
const path = require("path")
exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  // Query for markdown nodes to use in creating pages.
  const result = await graphql(
    `
      query {
        allDataJson {
          edges {
            node {
              metadata {
                domain
                locale
                language
                logo_image
                favicon_image
                brand_color
                button_color
                email
                phone
              }
              navigation {
                top {
                  left {
                    title
                    slug
                  }
                  right {
                    title
                    slug
                  }
                }
                bottom {
                  left {
                    title
                    slug
                  }
                  copyright
                }
              }
              pages {
                url
                title
                meta {
                  canonical
                  lang
                  keywords
                  description
                  url
                  og {
                    locale
                    type
                    title
                    description
                    url
                    site
                    image
                  }
                  twitter {
                    card
                    site
                    creator
                    url
                    title
                    description
                    image
                  }
                  favicon {
                    default
                    favicon_128
                    favicon_144
                    favicon_152
                  }
                  data {
                    domain
                    url
                    title
                    description
                    image
                    logo
                    social
                  }
                }
                content {
                  content_type
                  images {
                    id
                    content_id
                    name
                    alt
                    created_at
                    updated_at
                    path
                  }
                  text_content
                  small_text
                  cta_button {
                    name
                    link
                  }
                }
              }
            }
          }
        }
      }
    `
  )

  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  // Create pages for each markdown file.
  const pageTemplate = path.resolve(`src/templates/page.js`)
  result.data.allDataJson.edges[0].node.pages.forEach(page => {
    console.log(page.url)
    const path = page.url
    createPage({
      path,
      component: pageTemplate,
      // In your blog post template's graphql query, you can use pagePath
      // as a GraphQL variable to query for data from the markdown file.
      context: {
        pagePath: path,
        meta: page.meta,
        content: page.content,
        title: page.title,
        navigation: result.data.allDataJson.edges[0].node.navigation,
        golbal_metadata: result.data.allDataJson.edges[0].node.metadata
      },
    })
  })
}
