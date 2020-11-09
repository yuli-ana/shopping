const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
//Instantiate an empty express app
const productsRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const app = express();
app.use(bodyParser.json());

// create-react-app
// express
// nodemon

// 1000 => min port number
// 65535 => max port number
// app.use(cors());
app.use(express.json());
app.use("/api/products", productsRoutes);
app.use("/api/carts", cartRoutes);

app.listen(4000, () => {
  console.log("Server running on port 4000");
});
