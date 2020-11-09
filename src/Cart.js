function Cart({ cartProducts }) {
  return (
    <div>
      <h2>Your Cart</h2>
      <div className="products__cart">
        {cartProducts.map((item) => (
          <div key={item.id}>
            <h4>{item.title}</h4>
            <p>{item.price}.00</p>
            <p>{item.count}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cart;
