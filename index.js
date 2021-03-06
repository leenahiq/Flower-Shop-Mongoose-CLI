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
    } //find document by passing any detail
  } else if (argsObj.filter) {
    const flower = await Flower.findOne(
      { name: argsObj.name } || { colour: argsObj.colour } || {
          indication: argsObj.indication,
        }
    );
    console.log(flower);
  }
  // npm start -- --update --query "sunflower" --name "rose" --colour "red" --indication "love" --price 10
  // update function
  else if (argsObj.update) {
    try {
      const query = argsObj.name;
      const flower = await Flower.updateOne(
        { query },
        {
          name: argsObj.name,
          colour: argsObj.colour,
          indication: argsObj.indication,
          price: argsObj.price,
        }
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
  else if (argsObj.delete) {
    try {
      const flower = await Flower.deleteOne(
        { name: argsObj.name } || { colour: argsObj.colour } || {
            indication: argsObj.indication,
          }
      );
      console.log(flower);
    } catch (error) {
      console.log(error);
    }
  }

  //disconnect from database

  await mongoose.connection.close();
})();
