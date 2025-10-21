import { useId, } from "react";
import './Cart.css'
import { CartIcon, ClearCartIcon } from "./Icons";
import { useCart } from "../hooks/useCart.js";

export function Cart() {
    const cartCheckboxId = useId()
    const { cart, clearCart, addToCart } = useCart()  // --- IGNORE ---

    function CartItem ({ thumbnail, title, price, quantity, addToCart }) {
        return (
            <li>
                    <img src={thumbnail} 
                    alt={title} />
                    <div>
                        <strong>iPhone</strong> -${price}
                    </div>

                <footer>
                    <small>
                        Qty: {quantity}
                        </small>
                        <button onclick={addToCart} >+</button>
                    </footer>    
                </li>
        )
    }

    return (
        <>
        <label className="cart-button" htmlFor={cartCheckboxId}>
            <CartIcon />
            </label>
            <input id={cartCheckboxId} type="checkbox" hidden />

        <aside className="cart">
            <ul>
                {cart.map(product => (
                    <CartItem 
                    key={product.id} 
                    addToCart={() => addToCart(product)}
                    {...product} />
                ))}
            </ul>
            <button onclick={clearCart}>
                <ClearCartIcon />
            </button>
        </aside>
        </>
    )
}