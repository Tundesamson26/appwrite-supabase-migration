/* eslint-disable react/jsx-key */
"use client";
import "@appwrite.io/pink"; // optionally, add icons
import "@appwrite.io/pink-icons";
import React, { useState, useEffect } from "react";
import { supabase } from "./supabaseConfig";
import ProductCard from "./productCard";
//Tundexce@30

export default function Home() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [products, setProducts] = useState([]);

  console.log(name);
  console.log(description);

  useEffect(() => {
    getProducts();
  }, []);

  async function getProducts() {
    try {
      const {data, error} = await supabase
      .from("products")
      .select("*")
      .limit(10)
      if(error) throw error;
      if(data != null){
        setProducts(data);
      }
    } catch (error) {
      console.log("Error: ", error.message);
    }
  }

  async function createProduct(){
    try {
      const {data, error} = await supabase
      .from("products")
      .insert({
        name: name,
        description: description
      })
      .single()
      if(error) throw error;
      window.location.reload()
    } catch (error) {
      console.log("Error: ", error.message);
    }
  }

  console.log(products)

  return (
    <>
    <section
      style={{
        height: "auto",
      }}
    >
      <div
        className="u-flex u-main-space-between u-cross-center"
        style={{
          padding: "20px",
          backgroundColor: "rgb(219, 26, 90)",
          color: "white",
          marginBottom: "20px",
        }}
      >
        <h1 className="u-text-center u-font-size-32">Product Catalog</h1>
      </div>
      <div
        className="card u-cross-center u-width-full-line u-max-width-500"
        style={{ margin: "auto" }}
      >
        <div className="u-flex u-main-space-between u-cross-center">
          <h6 className="heading-level-6 u-text-center">New Product</h6>
        </div>

        <form
          method="post"
          className="form u-margin-block-start-24"
        >
          <ul className="form-list">
            <li className="form-item">
              <label className="label">Name</label>
              <div className="input-text-wrapper">
                <input
                  type="text"
                  className="input-text u-padding-inline-end-56"
                  placeholder="Full name"
                  name="name"
                  id="name"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </li>
            <li className="form-item">
              <label className="label">Message</label>
              <div className="input-text-wrapper">
                <textarea
                  className="input-text"
                  placeholder="Type here..."
                  name="description"
                  style={{ height: "80px" }}
                  id="description"
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
            </li>
          </ul>

          <div className="form-footer">
            <div className="u-flex u-main-end u-gap-12">
              <button className="button" type="submit" onClick={() => createProduct()}>
                Create
              </button>
            </div>
          </div>
        </form>
      </div>
      <hr></hr>
    </section>
      <div className="container">
      <div className="u-font-size-32 u-normal u-line-height-1-25" style={{ padding: '5px' }}>
          Products
        </div>
        {products.map((product)=>(
          <ProductCard product={product} />
        ))}
      </div>
    </>
    
    
  );
}
