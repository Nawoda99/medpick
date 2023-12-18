"use client";

import { useEffect, useState } from 'react';
import CarouselComp from './components/CarouselComp'
import Product from './components/Product';
import MainLayout from './layouts/MainLayout';
import useIsLoading from './hooks/useIsLoading';
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function Home() {
  const [products, setProducts] = useState([])

  const getProducts = async () => {
    useIsLoading(true)

    const response = await fetch('/api/products')
    const prods = await response.json()

    setProducts([])
    setProducts(prods)
    useIsLoading(false)
  }

  useEffect(() => { getProducts() }, [])
  const chunkArray = (array, chunkSize) => {
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  };


  const productsPerSlide = 5;

 
  const productSets = chunkArray(products, productsPerSlide);

  return (
    <MainLayout>
      <CarouselComp />
      <div className="max-w-[1200px] mx-auto">
        <div className="text-2xl font-bold mt-4 mb-6 px-4">Products</div>

        <div className="max-w-[1200px] mx-auto">
          <div>
            <Carousel
              showArrows={true}
              autoPlay={false}
              interval={3000}
              infiniteLoop={true}
              showThumbs={false}
              showStatus={false}
            >
              {productSets.map((productSet, index) => (
                <div key={index} className="flex">
                  {productSet.map((product) => (
                    <Product key={product.id} product={product} />
                  ))}
                </div>
              ))}
            </Carousel>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
