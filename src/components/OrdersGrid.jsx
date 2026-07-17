import { Fragment } from "react";
import OrderHeader from "./OrderHeader";
import OrderDetails from "./OrderDetails";


export default function OrdersGrid({orders}) {
  return (
    <>
      <div className="orders-grid">
        {orders.map(order => {
          return (
            <div key={order.id} className="order-container">

              <OrderHeader order={order} />

              <OrderDetails order={order} />
            </div>
          );
        })}
      </div>
    </>
  );
}