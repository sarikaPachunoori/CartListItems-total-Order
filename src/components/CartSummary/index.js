import CartContext from '../../context/CartContext'
import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      let total = 0
      cartList.forEach(eachItem => {
        total += eachItem.price * eachItem.quantity
      })
      return (
        <>
          <div className="order-details-cont">
            <h1 className="order-heading">
              Order Total :<span className="order-price"> Rs.{total}/- </span>
            </h1>
            <p>{cartList.length} Items in Cart</p>
            <button type="button" className="checkout-button">
              Checkout
            </button>
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
