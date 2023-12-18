"use client";

import Link from "next/link";


import { useSearchParams } from "next/navigation";
import MainLayout from "../layouts/MainLayout";
import { useEffect, useState } from "react";
import useSWR from "swr";

export default function SearchPage() {
  // Destructure the 'query' property from useSearchParams
  const  query  = useSearchParams();
const q = String(query);
  
  const [items, setItems] = useState([]);

  console.log(q);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        if (q) {
          const response = await fetch(
            `/api/products/search-by-name/${encodeURIComponent(q)}`
          );

          const result = await response.json();

          setItems(result);
        }
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    fetchSearchResults();
  }, [q]);

 

  return (
    <>
      <MainLayout>
        <div>
          <h1>Search Results for "{q}" </h1>
          <div>
            {/* Display search results here */}
            {items.map((item) => (
              <div className="p-1" key={item.id}>
                <Link
                  href={`/product/${item?.id}`}
                  className="flex items-center justify-between w-full cursor-pointer hover:bg-gray-200 p-1 px-2"
                >
                  <div className="flex items-center">
                    <img className="rounded-md" width="40" src={item?.url} />
                    <div className="truncate ml-2">{item?.title}</div>
                  </div>
                  <div className="truncate">Rs {(item?.price).toFixed(2)}</div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </MainLayout>
    </>
  );
}
