import React from "react";
import Header from "../components/Header";
import { useSelector, useDispatch } from "react-redux";
import { incrementQty, decrementQty, removeFromCart } from "../redux/slices/cartSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function Cart() {
  const dispatch = useDispatch();
  const userCart = useSelector((state) => state.cartReducer);

  // Calculate total amount
  const totalAmount = userCart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <>
      <Header />

      <div className="container py-5">
        {userCart?.length > 0 ? (
          <div className="row mt-3">
            {/* LEFT SIDE */}
            <div className="col-md-8 border rounded p-5">
              <h2 className="fw-bold mb-4">Cart Summary</h2>

              <table className="table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Product</th>
                    <th>Image</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Remove</th>
                  </tr>
                </thead>

                <tbody>
                  {userCart.map((item, index) => (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td>{item.title}</td>

                      <td>
                        <img
                          width="50px"
                          height="50px"
                          src={item.thumbnail}
                          alt="product"
                        />
                      </td>

                      <td>
                        <div className="d-flex">
                          <button
                            className="btn fs-3 fw-bold"
                            onClick={() => dispatch(decrementQty(item.id))}
                          >
                            -
                          </button>

                          <input
                            style={{ width: "50px" }}
                            type="text"
                            value={item.quantity}
                            className="form-control text-center"
                            readOnly
                          />

                          <button
                            className="btn fs-3 fw-bold"
                            onClick={() => dispatch(incrementQty(item.id))}
                          >
                            +
                          </button>
                        </div>
                      </td>

                      <td>${item.price * item.quantity}</td>

                      <td>
                        <button
                          className="btn text-danger"
                          onClick={() => dispatch(removeFromCart(item.id))}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* RIGHT SIDE */}
            <div className="col-md-4">
              <div className="border rounded p-5">
                <h3 className="fw-bold">
                  Total Amount :
                  <span className="text-danger"> $ {totalAmount.toFixed(2)}</span>
                </h3>

                <hr />

                <div className="d-grid mt-2">
                  <button className="btn btn-success">CHECK OUT</button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // EMPTY CART VIEW
          <div
            style={{ height: "80vh" }}
            className="d-flex justify-content-center align-items-center flex-column"
          >
            <img
              className="w-25"
              src="https://w7.pngwing.com/pngs/1007/364/png-transparent-empty-cart-illustration-thumbnail.png"
              alt="empty-cart"
            />

            <h3 className="mt-3">Cart is Empty</h3>

            <Link to="/" className="btn btn-primary mt-2">
              Add More
            </Link>
          </div>
        )}
      </div>
    </>
  );
}

export default Cart;
