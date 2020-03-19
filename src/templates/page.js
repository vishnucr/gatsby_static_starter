import React from "react"
import ReactHtmlParser from 'react-html-parser';
import Layout from '../components/layout'

export default ({ pageContext }) => (
  <Layout>
    <section className="section" id="about">
      <div className="section-heading">
        {
          pageContext.content.map((content,index) => {
            let footer_link = {
                backgroundColor: pageContext.golbal_metadata.button_color,
                color: '#fff'};
            return (
              <section className="section" key={index}>

                {/* Text */}
                {
                  content.content_type === 'text' && 
                  <div className="columns" v-if="content.content_type === 'text'">
                    <div className="column">
                      <div className="card">
                        <div className="card-content">
                            { ReactHtmlParser(content.text_content) }
                        </div>
                      </div>
                    </div>
                  </div>
                }


                {/* Slider */}
                {
                  content.content_type === 'slider' &&
                  <div className="columns slider-section">
                    <div className="column is-5">
                      <h1 className="title">Slider Goes Here</h1>
                    </div>
                    <div className="column">
                      <div className="card">
                        <div className="card-content">
                            { ReactHtmlParser(content.small_text) }
                        </div>
                        <footer className="card-footer">
                          <p className="card-footer-item">
                            <a
                              className="button is-rounded is-large"
                              href={`http://${content.cta_button.link}`}
                              target="_blank"
                              style={footer_link}
                            >
                              <span>{content.cta_button.name}</span>
                            </a>
                          </p>
                        </footer>
                      </div>
                    </div>
                  </div>
                }
              </section>
            )
          })

        }

      </div>
    </section>
  </Layout>
)
