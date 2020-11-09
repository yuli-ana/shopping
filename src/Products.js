function Products({ products, addToCart }) {
  return (
    <>
      <h1>Buy our Products</h1>
      {products.map((product) => {
        return (
          <div>
            {products.map((product) => {
              return (
                <div key={product.id}>
                  <h2>{product.title}</h2>
                  <p>${product.price}.00</p>
                  <button
                    onClick={() => {
                      addToCart(product.id);
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              );
            })}
          </div>
        );
      })}
    </>
  );
}

export default Products;
