import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTruckFast } from '@fortawesome/free-solid-svg-icons'
import { faTwitter, faInstagram, faFacebook, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faPhone } from '@fortawesome/free-solid-svg-icons'

function Footer() {
  return (
    <div className="bg-secondary text-light mt-5 py-5">
      <Container>

        <Row className="gy-4">

          {/* Left section */}
          <Col md={4}>
            <h5 className="fw-bold">
              <FontAwesomeIcon icon={faTruckFast} className="me-2" />
              Daily cart
            </h5>
            <p className='mt-3'>
              Designed and built with all the love in the world by the Luminar team with the help of our contributors.
              <br /><br />
              Code licensed Luminar, docs CC BY 3.0.
              <br />
              Currently v5.3.2.
            </p>
          </Col>

          {/* Links */}
          <Col md={2}>
            <h5 className="fw-bold">Links</h5>
            <ul className="list-unstyled mt-3">
              <li>Landing Page</li>
              <li>Home Page</li>
              <li>Watch History Page</li>
            </ul>
          </Col>

          {/* Guides */}
          <Col md={2}>
            <h5 className="fw-bold">Guides</h5>
            <ul className="list-unstyled mt-3">
              <li>React</li>
              <li>React Bootstrap</li>
              <li>React Router</li>
            </ul>
          </Col>

          {/* Contact */}
          <Col md={4}>
            <h5 className="fw-bold">Contact Us</h5>

            <div className="d-flex mt-3">
              <input
                type="text"
                placeholder="Enter your email here"
                className="form-control"
              />
              <button className="btn btn-light ms-2">➤</button>
            </div>

            <div className="d-flex gap-3 mt-4 fs-5">
              <FontAwesomeIcon icon={faTwitter} />
              <FontAwesomeIcon icon={faInstagram} />
              <FontAwesomeIcon icon={faFacebook} />
              <FontAwesomeIcon icon={faLinkedin} />
              <FontAwesomeIcon icon={faPhone} />
            </div>
          </Col>

        </Row>

        <hr className="border-light mt-4" />

        <p className="text-center mt-3 mb-0">
          Copyright © July 2024 Batch, Daily Cart. Built with React Redux.
        </p>

      </Container>
    </div>
  )
}

export default Footer
