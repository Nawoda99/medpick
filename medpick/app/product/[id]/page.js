"use client";

import MainLayout from "../../layouts/MainLayout";
import SimilarProducts from "../../components/SimilarProducts";
import { useEffect, useState } from "react";
import useIsLoading from "../../hooks/useIsLoading";
import { useCart } from "../../context/cart";
import { toast } from "react-toastify";
import Link from "next/link";
import axios from "axios";
import { add } from "lodash";
import { useUser } from "../../context/user";

export default function Product({ params }) {
  const cart = useCart();
  const user = useUser();
  

  const [product, setProduct] = useState({});

  const getProduct = async () => {
    useIsLoading(true);
    setProduct({});

    const response = await fetch(`/api/product/${params.id}`);
    const prod = await response.json();
    setProduct(prod);
    cart.isItemAddedToCart(prod);
    useIsLoading(false);
  };

  useEffect(() => {
    getProduct();
  }, []);

  function haversineDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth radius in kilometers
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    return distance;
  }

  const OPEN_CAGE_API_KEY = "a41f57acc72841eb8d66b9014327dfbb";

  const getCoordinates = async (address) => {
    try {
      const response = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=${OPEN_CAGE_API_KEY}`
      );

      const result = response.data.results[0];
      if (result) {
        const { lat, lng } = result.geometry;
        return { lat, lon: lng };
      } else {
        throw new Error("No results found for the given address.");
      }
    } catch (error) {
      console.error("Error getting coordinates:", error.message);
      return null;
    }
  };

  const [distance, setDistance] = useState(null);
  useEffect(() => {
    const getUserLocation = () => {
      return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              resolve({ lat: latitude, lon: longitude });
            },
            (error) => {
              reject(error);
            }
          );
        } else {
          reject(new Error('Geolocation is not supported by this browser.'));
        }
      });
    };
    
    

    const calculateDistance = async () => {
      try {
        // Get the user's current location
        const userLocation = await getUserLocation();

        // Get coordinates for the destination address
        const destinationCoordinates = await getCoordinates(product?.city);

        if (userLocation && destinationCoordinates) {
          // Calculate the distance between the user's location and the destination
          const calculatedDistance = haversineDistance(
            userLocation.lat,
            userLocation.lon,
            destinationCoordinates.lat,
            destinationCoordinates.lon
          );

          setDistance(calculatedDistance.toFixed(2));
        }
      } catch (error) {
        console.error('Error getting location or calculating distance:', error.message);
      }
    };

    // Ensure that calculateDistance is only called when product has been set
    if (Object.keys(product).length > 0) {
      calculateDistance();
    }
  }, [product]);

  return (
    <>
      <MainLayout>
        <div className="max-w-[1200px] mx-auto">
          <div className="flex px-4 py-10">
            {product?.url ? (
              <img className="w-[40%] rounded-lg" src={product?.url} />
            ) : (
              <div className="w-[40%]"></div>
            )}

            <div className="px-4 w-full">
              <div className="font-bold text-xl">{product?.title}</div>
              {/* <div className="text-sm text-gray-700 pt-2">Brand New - Full Warranty</div> */}

              <div className="border-b py-1" />

              <div className="pt-3 pb-2">
                <div className="flex items-center">
                  Condition:{" "}
                  <span className="font-bold text-[17px] ml-2">New</span>
                </div>
              </div>

              <div className="border-b py-1" />

              <div className="pt-3">
                <div className="w-full flex items-center justify-between">
                  <div className="flex items-center">
                    Price:
                    {product?.price ? (
                      <div className="font-bold text-[20px] ml-2">
                        Rs {(product?.price).toFixed(2)}
                      </div>
                    ) : null}
                  </div>
                  <button
                    onClick={() => {
                      if (cart.isItemAdded) {
                        cart.removeFromCart(product);
                        toast.info("Removed from cart", { autoClose: 3000 });
                      } else {
                        cart.addToCart(product);
                        toast.success("Added to cart", { autoClose: 3000 });
                      }
                    }}
                    className={`
                      text-white py-2 px-20 rounded-full cursor-pointer 
                      ${
                        cart.isItemAdded
                          ? "bg-[#e9a321] hover:bg-[#bf851a]"
                          : "bg-[#3498C9] hover:bg-[#0054A0]"
                      }
                    `}
                  >
                    {cart.isItemAdded ? "Remove From Cart" : "Add To Cart"}
                  </button>
                </div>
              </div>

              <div className="border-b py-1" />

              <div className="pt-3">
                <div className="font-semibold pb-1">Description:</div>
                <div className="text-sm">{product?.description}</div>
              </div>
              <div className="border-b py-1" />

              <div className="pt-3">
                <div className="font-semibold pb-1">
                  Store:
                  <span className="font-bold text-[17px] ml-2">
                    {product?.pharmercyname}
                  </span>
                </div>
              </div>

              <div className="border-b py-1" />

              <div className="pt-3">
                <div className="font-semibold pb-1">
                  Location:
                  <span className="font-bold text-[17px] ml-2">
                    {product?.city}
                  </span>
                </div>
              </div>
              <div className="border-b py-1" />

              <div className="pt-3">
                <div className="font-semibold pb-1">
                  Distance:
                  <span className="font-bold text-[17px] ml-2">
                    {distance} km
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <SimilarProducts />
      </MainLayout>
    </>
  );
}
