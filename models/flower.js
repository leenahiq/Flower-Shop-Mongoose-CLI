const mongoose = require("mongoose");

// name: flowerName;
// colour: colour;
// indication: indication of flower ;
// price: price

const Flower = mongoose.model("flower", {
  name: { type: String, unique: true },
  colour: { type: String },
  indication: { type: String },
  price: { type: Number },
});

module.exports = Flower;
