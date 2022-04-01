require("dotenv").config();

const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");

const mongoose = require("mongoose");
const Flower = require("./models/flower");
(async () => {
  await mongoose.connect(process.env.MONGO_URI);

  const argsObj = yargs(hideBin(process.argv)).argv;
  console.log(argsObj);

  // function to creat new collection
  //npm start -- --add --name "rose" --colour "red" --indication "love" --price 10
  if (argsObj.add) {
    // instanse from modal Flower
    try {
      const flower = new Flower({
        name: argsObj.name,
        colour: argsObj.colour,
        indication: argsObj.indication,
        price: argsObj.price,
      });
      console.log(flower);
      // to save in the database
      await flower.save();
    } catch (error) {
      console.log(error);
    }

    //npm start -- --list
  } //list all collection
  else if (argsObj.list) {
    try {
      const flower = await Flower.find({});
      console.log(flower);
    } catch (error) {
      console.log(error);
    }
  } // update function
  //npm start -- --update --name "tulip" --colour "purple" --indication "happiness" --price 7 or select any key and value
  else if (argsObj.update) {
    try {
      const flower = await Flower.updateMany(
        { name: argsObj.name } || { colour: argsObj.colour } || {
            indication: argsObj.indication,
          } || { price: argsObj.price }
      );
      console.log(flower);
    } catch (error) {
      console.log(error);
    }
  } // delete 1st document function
  else if (argsObj.deleteOne) {
    const flower = await Flower.deleteOne({});
    console.log(flower);
  }
  //delete compelete document
  else if (argsObj.deleteMany) {
    try {
      const flower = await Flower.deleteMany(
        { name: argsObj.name } || { colour: argsObj.colour } || {
            indication: argsObj.indication,
          } || { price: argsObj.price }
      );
      console.log(flower);
    } catch (error) {
      console.log(error);
    }
  }

  //disconnect from database

  await mongoose.connection.close();
})();
//sudo code concept
// name: flowerName;
// colour: colour;
// indication: indication of flower ;
// price: price
// npm start --name "rose" --colour "red" --indication "love" --price 5
