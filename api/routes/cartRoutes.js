const router = require("express").Router();
const uuid = require("uuid");
const products = require("../data");

const carts = [];

// Add an item to a cart
// Post route, create a cart AND add an item to that cart
router.post("/", (req, res) => {
  const uniqueID = uuid.v4();
  const { productId } = req.body;

  const findProduct = products.find((product) => productId === product.id);
  const updatedProduct = { ...findProduct, count: 1 };

  // result [{ id: 1, title: "Beautiful Shoes!", price: 12, count: 1}]
  console.log(updatedProduct);

  // create a cart, each user will have a unique cart
  const cart = {
    id: uniqueID,
    products: [updatedProduct],
  };

  carts.push(cart);
  console.log(carts);

  res.json(cart);
});

// add an item to an existing cart, how to know which product id to add
router.patch("/:cartId", (req, res) => {
  const { cartId } = req.params;
  const { productId } = req.body;

  if (!cartId) {
    res.status(400).json({ message: "please provide a cartId parameter" });
  }

  // get cart object
  const cart = carts.find((cart) => cart.id === cartId);

  // If it's not a valid cart id, do not continue:
  if (!cart) {
    res.status(404).json({ message: "please provide a valid cartId" });
  }

  let newProducts = [];
  // check if item already exists in the cart:
  const isInCart = cart.products.filter((p) => p.id === productId).length !== 0;

  if (isInCart) {
    // if item already in cart, update the count
    newProducts = cart.products.map((product) => {
      if (product.id === productId) {
        return { ...product, count: product.count + 1 };
      }
      return product;
    });
  } else {
    // if item isn't in a cart yet, add it to the cart
    const newItem = products.find((product) => product.id === productId);
    cart.products.push({ ...newItem, count: 1 });
    newProducts = cart.products;
  }

  const findIndex = carts.findIndex((c) => c.id === cartId);
  // replace products array with new array we just created:
  carts[findIndex].products = newProducts;

  // respond to the request
  res.json(carts[findIndex]);
});

module.exports = router;
