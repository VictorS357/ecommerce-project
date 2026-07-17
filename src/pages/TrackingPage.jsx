import axios from 'axios';
import dayjs from 'dayjs';
import { Link, useParams  } from 'react-router';
import { useEffect, useState } from 'react';
import { Header } from '../components/Header';
import './TrackingPage.css';

export function TrackingPage({cart}) {
  const { orderId, productId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchTrackingData = async () => {
      const res = await axios.get(`api/orders/${orderId}?expand=products`);
      setOrder(res.data);
    }

    fetchTrackingData();
  }, [orderId])

  if(!order) return null;

  const orderProduct = order.products.find(orderProduct => {
    return orderProduct.productId === productId;
  });

  const totalDeliveryTimeMs = orderProduct.estimatedDeliveryTimeMs - order.orderTimeMs;
  const timePassedMs = dayjs().valueOf() - order.orderTimeMs;
  let timePercent = (timePassedMs / totalDeliveryTimeMs) * 100;

  if(timePercent > 100) {
    timePercent = 100;
  }
  return (
    <>
      <title>Tracking</title>

      <Header cart={cart} />

      <div className="tracking-page">
        <div className="order-tracking">
          <Link className="back-to-orders-link link-primary" to="/orders">
            View all orders
          </Link>

          <div className="delivery-date">
            {timePercent >= 100 ? 'Delivered' : `Arriving on: ${dayjs(orderProduct.estimatedDeliveryTimeMs).format('MMMM D')}`}
          </div>

          <div className="product-info">
            {orderProduct.product.name}
          </div>

          <div className="product-info">
            Quantity: {orderProduct.quantity}
          </div>

          <img className="product-image" src={orderProduct.product.image} />

          <div className="progress-labels-container">
            <div className="progress-label">
              Preparing
            </div>
            <div className="progress-label current-status">
              Shipped
            </div>
            <div className="progress-label">
              Delivered
            </div>
          </div>

          <div className="progress-bar-container">
            <div className="progress-bar" style={{width: `${timePercent}%`}}></div>
          </div>
        </div>
      </div>
    </>
  );
}