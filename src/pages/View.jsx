import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { addToWishlist } from "../redux/slices/wishlistSlice"; 
import { addToCart } from "../redux/slices/cartSlice";          
import Swal from "sweetalert2";

function View() {

  const userWishlist = useSelector((state) => state.wishlistReducer);
  const userCart = useSelector((state) => state.cartReducer); 
  const dispatch = useDispatch();

  // get product id from url
  const { id } = useParams();

  // state for storing product to be view
  const [product, setProduct] = useState({});

  // FIXED useEffect
  useEffect(() => {
    if (sessionStorage.getItem("products")) {
      const allProducts = JSON.parse(sessionStorage.getItem("products"));
      setProduct(allProducts.find((item) => item.id == id));
    }
  }, [id]); // ✅ added dependency

  const handleWishlist = () => {
    const existingProduct = userWishlist?.find(item => item.id == id);

    if (existingProduct) {
      Swal.fire({
        title: 'Sorry!!',
        text: 'Product already in your wishlist...',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    } else {
      dispatch(addToWishlist(product));
    }
  };

  const handleCart = () => {
  const existingProduct = userCart?.find(item => item.id == id);

  dispatch(addToCart(product));

  Swal.fire({
    title: 'Completed!',
    text: existingProduct
      ? `Quantity of ${product.title}, is updated successfully`
      : `Product added to your cart...`,
    icon: 'success',
    confirmButtonText: 'Ok'
  });
};


  return (
    <>
      <Header />

      <div className="container py-5">
        <div className="row my-5">

          {/* LEFT SIDE IMAGE + BUTTONS */}
          <div className="col-md-6 text-center">
            <img
              className="img-fluid"
              src={product?.thumbnail}
              alt="product"
            />

            <div className="d-flex justify-content-evenly mt-5">
              <button onClick={handleWishlist} className="btn btn-primary">ADD TO WISHLIST</button>
              <button className="btn btn-success" onClick={handleCart}>ADD TO CART</button>
            </div>
          </div>

          {/* RIGHT SIDE DETAILS */}
          <div className="col-md-6 mt-5 mt-md-0">
            <h1 className="fw-bold">{product?.title}</h1>
            <h3 className="text-danger fw-bolder">${product?.price}</h3>

            <h4>Brand : {product?.brand}</h4>
            <h4>Category : {product?.category}</h4>
            <h4>Description : {product?.description}</h4>

            <h5 className="my-3">Client Reviews</h5>

            {
              product?.reviews?.length > 0 ? (
                product.reviews.map((item, index) => (
                  <div className="border rounded p-3 shadow mb-2" key={index}>
                    <p>
                      <span className="fw-bolder">username : 
                      {item?.reviewerName}</span>{item?.comment}
                    </p>
                    <p>
                      Rating : {item?.rating}
                      <FontAwesomeIcon
                        icon={faStar}
                        className="text-warning ms-2"
                      />
                    </p>
                  </div>
                ))
              ) : (
                <div>No Client reviews are available</div>
              )
            }

          </div>
        </div>
      </div>
    </>
  );
}

export default View;
