import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import { Header } from '../../components/Header';
import { ProductsGrid } from './ProductsGrid';
import './HomePage.css';

export function HomePage({ cart, loadCart }) {
  const [products, setProducts] = useState([]);
  const [searchParams] = useSearchParams();
  const search = searchParams.get('search');

  useEffect(() => {
    if(search) {
      const fetchHomeData = async () => {
        const res = await axios.get(`/api/products?search=${search}`);
        setProducts(res.data);
      };

      fetchHomeData();
    }else{
      const fetchHomeData = async () => {
        const res = await axios.get('/api/products')
        setProducts(res.data);
      };

      fetchHomeData();
    }
  }, [search]);

  return (
    <>
      <link rel="icon" type="image/svg+xml" href="/images/home-favicon.png" />

      <title>Ecommerce Project</title>

      <Header cart={cart} />

      <div className="home-page">
        <ProductsGrid products={products} loadCart={loadCart} />
      </div>
    </>
  );
}