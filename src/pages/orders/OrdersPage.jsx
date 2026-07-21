import axios from 'axios';
import { useState, useEffect, Fragment } from 'react';
import { Header } from '../../components/Header';
import OrdersGrid from '../../components/OrdersGrid';
import './OrdersPage.css';

export function OrdersPage({ cart, loadCart }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchAppData = async () => {
      const res = await axios.get('/api/orders?expand=products');
      setOrders(res.data);     
    }

    fetchAppData();
  }, []);

  return (
    <>
      <link rel="icon" type="image/svg+xml" href="/images/orders-favicon.png" />

      <title>Orders</title>

      <Header cart={cart} />

      <div className="orders-page">
        <div className="page-title">Your Orders</div>
        <OrdersGrid orders={orders} loadCart={loadCart} />
      </div>
    </>
  );
}