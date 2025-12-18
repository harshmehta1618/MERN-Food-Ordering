import React from 'react'
import './FoodItem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'

const FoodItem = ({ id, name, price, description, image }) => {
    const { cartItems, addToCart, removeFromCart, url } =
        React.useContext(StoreContext);

    // ✅ SAFE COUNT (handles reload + async cart fetch)
    const count = cartItems?.[id] || 0;

    return (
        <div className='food-item'>
            <div className="food-item-img-container">
                <img
                    className='food-item-image'
                    src={url + "/images/" + image}
                    alt=""
                />

                {count === 0 ? (
                    <img
                        className='add'
                        onClick={() => addToCart(id)}
                        src={assets.add_icon_white}
                        alt="add"
                    />
                ) : (
                    <div className='food-item-counter'>
                        <img
                            onClick={() => removeFromCart(id)}
                            src={assets.remove_icon_red}
                            alt="remove"
                        />
                        <p>{count}</p>
                        <img
                            onClick={() => addToCart(id)}
                            src={assets.add_icon_green}
                            alt="add"
                        />
                    </div>
                )}
            </div>

            <div className='food-item-name-rating'>
                <p>{name}</p>
                <img src={assets.rating_starts} alt="" />
            </div>

            <p className='food-item-desc'>{description}</p>
            <p className='food-item-price'>${price}</p>
        </div>
    );
};

export default FoodItem;
