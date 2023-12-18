'use client';

import { useState } from 'react';
import { toast } from 'react-toastify';
import {useAddProduct} from './hooks/useAddProduct';


export default function Home() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [price, setPrice] = useState(0);
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    title: '',
    description: '',
    url: '',
    price: 0,
  });

 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: name === 'price' ? parseFloat(value) : value,
    }));
  };

  const addProduct = () => {
    setProducts((prevProducts) => [
      ...prevProducts,
      {
        id: prevProducts.length + 1,
        title: newProduct.title,
        description: newProduct.description,
        url: newProduct.url,
        price: newProduct.price,
      },
    ]);

    // Reset the form after adding a new product
    setNewProduct({
      title: '',
      description: '',
      url: '',
      price: 0,
    });
  };

  // const validate = () => {
  //   setError(null);
  //   setError({});
  //   let isError = false;

  //   if (!title) {
  //     setError({ type: "title", message: "Title is required" });
  //     isError = true;
  //   } else if (!description) {
  //     setError({ type: "description", message: "Description is required" });
  //     isError = true;
  //   } else if (!url) {
  //     setError({ type: "url", message: "url is required" });
  //     isError = true;
  //   } else if (!price) {
  //     setError({ type: "price", message: "price is required" });
  //     isError = true;
  //   } 

  //   return isError;
  // };

  const submit = async (event) => {
    event.preventDefault();
    

    // if (isError) {
    //   toast.error(error.message, { autoClose: 3000 });
    //   return;
    // }

    try {
      const response = await useAddProduct({
        title,
        description,
        url,
        price
        
      });

      

      toast.success("Address updated!", { autoClose: 3000 });

      
    } catch (error) {
      
      console.log(error);
      alert(error);
    }
  };


  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6">Product Information</h1>

      {/* Product Form */}
      <form onSubmit={submit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            Title:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            name="title"
            string={title}
            onUpdate={setTitle}
            placeholder="Product Title"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Description:
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            name="description"
            string={description}
            onUpdate={setDescription}
            placeholder="Product Description"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="url">
            URL:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="url"
            type="text"
            name="url"
            string={url}
            onUpdate={setUrl}
            placeholder="Product URL"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
            Price:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="price"
            type="number"
            name="price"
            string={price}
            onUpdate={setPrice}
            placeholder="Product Price"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            
          >
            Add Product
          </button>
        </div>
      </form>

      {/* Product Table */}
      
    </div>
  );
};




