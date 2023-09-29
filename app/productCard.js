import React from 'react';
import "@appwrite.io/pink"; // Optionally, add icons
import "@appwrite.io/pink-icons";
import { supabase } from './supabaseConfig';

function ProductCard(props) {
  const product = props.product;

  async function updateProduct() {
    try {
      const {data, error} = await supabase
      .from("products")
      .update({
        name: name,
        description: description
      })
      .eq("id", product.id)
      if(error) throw error;
      window.location.reload()
    } catch (error) {
      console.log("Error: ", error.message);
    }
  }

  async function deleteProduct() {
    try {
      const {data, error} = await supabase
      .from("products")
      .delete()
      .eq("id", product.id)
      if(error) throw error;
      window.location.reload()
    } catch (error) {
      console.log("Error: ", error.message);
    }
  }
  return (
    <section>
      <div className="container">
        
        <ul
          className="grid-box"
          style={{
            '--grid-gap': '1rem',
            '--grid-item-size': '16rem',
            '--grid-item-size-small-screens': '8rem',
          }}
        >
          <li>
            <div className="card">
              <div style={{ padding: '10px' }}>
                <p className="u-bold">{product.name}</p>
              </div>
              <div
                className=""
                style={{ paddingTop: '20px' }}
              >
                <p className="">{product.description}</p>
              </div>
              <div className="u-flex u-main-end u-gap-12">
              <button className="button" type="submit" onClick={() => deleteProduct()}>
                Delete
              </button>
              <button className="is-text" type="submit" onClick={() => updateProduct()}>
                Edit
              </button>
            </div>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default ProductCard;
