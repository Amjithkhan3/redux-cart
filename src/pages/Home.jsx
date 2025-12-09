import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts } from '../redux/slices/productSlice'
import { faBackward, faForward } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Home() {

  const dispatch = useDispatch();
  const { loading, allProducts, error } = useSelector((state) => state.productReducer);

  const [searchTerm, setSearchTerm] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  useEffect(() => {
    if (allProducts.length > 0) {
      sessionStorage.setItem("products", JSON.stringify(allProducts));
    }
  }, [allProducts]);

  // ⭐ Filter products
  const filteredProducts = allProducts.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ⭐ Reset pagination when searching
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // ⭐ Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage);

  const goToPrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const goToNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <>
      <Header insideHome={true} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <div className="container py-5">

        {loading ? (

          <div className='text-center my-5 fw-bold fs-5'>
            <img width="80px" className='me-2'
              src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExd3VpOTlwcWR4N2xmbDVlN3ViNTN2YWphZTY4bmlqdThpOTZodHVlMSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/17mNCcKU1mJlrbXodo/giphy.gif"
              alt="loading..."
            />
          </div>

        ) : (

          <div className="row my-5">

            {currentProducts.length > 0 ? (
              currentProducts.map(product => (
                <div key={product.id} className="col-md-3 mb-2">

                  <Card>
                    <Card.Img height={'250px'} variant="top" src={product.thumbnail} />
                    <Card.Body className="text-center">
                      <Card.Title>{product.title}</Card.Title>

                      <Link
                        to={`/products/${product.id}/view`}
                        className="btn btn-secondary"
                      >
                        View More..
                      </Link>
                    </Card.Body>
                  </Card>

                </div>
              ))
            ) : (
              <p className='fs-5 fw-bold my-5 text-center'>No Matching Products</p>
            )}

            {/* ⭐ Pagination Controls */}
            {filteredProducts.length > productsPerPage && (
              <div className="d-flex justify-content-center mt-4">

                <button
                  className='btn btn-outline-dark'
                  disabled={currentPage === 1}
                  onClick={goToPrevious}
                >
                  <FontAwesomeIcon icon={faBackward} />
                </button>

                <span className='fw-bold mx-3'>
                  Page {currentPage} of {totalPages}
                </span>

                <button
                  className='btn btn-outline-dark'
                  disabled={currentPage === totalPages}
                  onClick={goToNext}
                >
                  <FontAwesomeIcon icon={faForward} />
                </button>

              </div>
            )}

          </div>

        )}

      </div>
    </>
  )
}

export default Home
