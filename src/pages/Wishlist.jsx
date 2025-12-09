import React from 'react'
import Header from '../components/Header'
import { Card } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeartCircleXmark, faCartPlus } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { removeWishlistItem } from '../redux/slices/wishlistSlice'
import { addToCart } from "../redux/slices/cartSlice";          
import Swal from "sweetalert2";

function Wishlist() {

  const userWishlist = useSelector(state => state.wishlistReducer)
    const userCart = useSelector((state) => state.cartReducer); 
  const dispatch = useDispatch()

    const handleCart = (product) => {
    const existingProduct = userCart?.find(item => item.id == product.id);
  
    dispatch(addToCart(product));
    dispatch(removeWishlistItem(product.id));
  
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

        {/* wishlist with content */}
        {
          userWishlist?.length > 0 ?
            (
              <div className="row my-5">

                {userWishlist.map((item) => (
                  <div key={item.id} className="col-md-3 mb-2">

                    <Card>
                      <Card.Img
                        height={'250px'}
                        variant="top"
                        src={item.thumbnail}
                      />

                      <Card.Body className="text-center">
                        <Card.Title>{item.title}</Card.Title>

                        <div className="d-flex justify-content-evenly my-1">

                          {/* remove from wishlist */}
                          <button
  className="btn text-danger fs-4"
  onClick={() => dispatch(removeWishlistItem(item?.id))}
>
  <FontAwesomeIcon icon={faHeartCircleXmark} />
</button>


                          {/* add to cart */}
                          <button className="btn text-success fs-4">
                            <FontAwesomeIcon icon={faCartPlus} onClick={()=>handleCart(item)} />
                          </button>

                        </div>

                      </Card.Body>
                    </Card>

                  </div>
                ))}

              </div>
            ) :


            // EMPTY WISHLIST UI
            (
              <div
                style={{ height: '80vh' }}
                className='d-flex justify-content-center align-items-center flex-column'
              >
                <img
                  className='w-25'
                  src="https://cdni.iconscout.com/illustration/premium/thumb/empty-shopping-cart-6771628-5639809.png"
                  alt="empty cart"
                />

                <h3>Wishlist is Empty</h3>

                <Link to={'/'} className='btn btn-primary mt-3'>
                  Add More
                </Link>
              </div>
            )
        }
      </div>
    </>
  )
}

export default Wishlist
