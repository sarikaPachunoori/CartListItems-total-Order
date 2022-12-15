import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  addCartItem = product => {
    const {cartList} = this.state
    const findItem = cartList.find(eachItem => eachItem.id === product.id)
    if (findItem) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(itemCount => {
          if (findItem.id === itemCount.id) {
            const updateQuantity = product.quantity + itemCount.quantity
            return {...itemCount, quantity: updateQuantity}
          }
          return itemCount
        }),
      }))
    } else {
      const updatedList = [...cartList, product]
      this.setState({cartList: updatedList})
    }
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const removedItem = cartList.filter(eachDel => eachDel.id !== id)
    this.setState({cartList: removedItem})
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  incrementCartItemQuantity = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(eachIncr => {
        if (id === eachIncr.id) {
          const updatedIncr = eachIncr.quantity + 1
          return {...eachIncr, quantity: updatedIncr}
        }
        return eachIncr
      }),
    }))
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const productObj = cartList.find(decrItem => id === decrItem.id)
    if (productObj.quantity > 1) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachDecr => {
          if (id === eachDecr.id) {
            const updatedDecr = eachDecr.quantity - 1
            return {...eachDecr, quantity: updatedDecr}
          }
          return eachDecr
        }),
      }))
    } else {
      this.removeCartItem(id)
    }
  }

  render() {
    const {cartList, quantityItem} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          quantityItem,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
