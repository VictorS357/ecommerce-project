import { NavLink, useNavigate, useSearchParams } from 'react-router';
import { useState } from 'react';
import logoWhite from '../assets/images/logo-white.png';
import mobileLogoWhite from '../assets/images/mobile-logo-white.png';
import searchIcon from '../assets/images/icons/search-icon.png';
import cartIcon from '../assets/images/icons/cart-icon.png';
import './Header.css';

export function Header({ cart }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const searchText = searchParams.get('search');
  const [search, setSearch] = useState(searchText || '');

  let totalQuantity = 0;

  cart.forEach(cartItem => {
    totalQuantity += cartItem.quantity;
  });

  const getSearchText = (event) => {
    setSearch(event.target.value);
  }

  const searchItem = () => {
    navigate(`/?search=${search}`);
  }

  return (
    <>
      <div className="header">
        <div className="left-section">
          <NavLink to="/" className="header-link">
            <img className="logo"
              src={logoWhite} />
            <img className="mobile-logo"
              src={mobileLogoWhite} />
          </NavLink>
        </div>

        <div className="middle-section">
          <input className="search-bar" type="text" placeholder="Search" value={search} onChange={getSearchText} />

          <button className="search-button">
            <img className="search-icon" src={searchIcon} onClick={searchItem} />
          </button>
        </div>

        <div className="right-section">
          <NavLink className="orders-link header-link" to="/orders">

            <span className="orders-text">Orders</span>
          </NavLink>

          <NavLink className="cart-link header-link" to="/checkout">
            <img className="cart-icon" src={cartIcon} />
            <div className="cart-quantity">{totalQuantity}</div>
            <div className="cart-text">Cart</div>
          </NavLink>
        </div>
      </div>
    </>
  );
}