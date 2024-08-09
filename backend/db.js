const mongoose = require('mongoose');
const mongoURI = ''

async function main() {
    try {
        await mongoose.connect(mongoURI, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
        });

        console.log('Database Connection Successful');

        const food_items = await mongoose.connection.db.collection("food-items").find({}).toArray();
        global.food_items = food_items;

        const foodCategory = await mongoose.connection.db.collection("foodCategory").find({}).toArray();
        global.foodCategory = foodCategory;

        
        // console.log(global.food_items);


    } catch (err) {
        console.log(err);
    } 
}
module.exports = main;
