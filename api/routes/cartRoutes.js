const router = require("express").Router();
const uuid = require("uuid");
const products = require("../data");

const carts = [];

// Add an item to a cart
// Post route, create a cart AND add an item to that cart
router.post("/", (req, res) => {
  const uniqueID = uuid.v4();
  const { productId } = req.body;

  // const productsToAdd = products
  //   // returns an array that has only item which id === productId --> [{ id: 1, title: "Beautiful Shoes!", price: 12}]
  //   .filter((product) => productId === product.id)
  //   // map over 1 item, copy all properties and add new prop count
  //   .map((item) => {
  //     return { ...item, count: 1 };
  //   });

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

  if (!cartId) {
    res.status(400).json({ message: "please provide a cartId parameter" });
  }

  //get the product id from the body
  const newItemId = req.body.productId;

  // Find cart index from carts array:
  const cartToEditIndex = carts.findIndex(
    (cart) => cart.id === req.params.cartId
  );
  // If it's not a valid cart id, do not continue:
  if (cartToEditIndex === -1) {
    res.status(404).json({ message: "please provide a valid cartId" });
  }
  // get cart object
  const cartToEdit = carts[cartToEditIndex];
  let newProducts = [];
  // check if item already exists in the cart:
  const alreadyInCart =
    cartToEdit.products.filter((p) => p.id === newItemId).length !== 0;
  if (alreadyInCart) {
    // if item already in cart, update the count
    newProducts = cartToEdit.products.map((product) => {
      if (product.id === newItemId) {
        return { ...product, count: product.count + 1 };
      }
      return product;
    });
  } else {
    // if a new item, add it to the cart
    const newItem = products.find((product) => product.id === newItemId);
    cartToEdit.products.push({ ...newItem, count: 1 });
    newProducts = cartToEdit.products;
  }
  // replace products array with new array we just created:
  carts[cartToEditIndex].products = newProducts;

  // respond to the request
  res.json(carts[cartToEditIndex]);
});

module.exports = router;
