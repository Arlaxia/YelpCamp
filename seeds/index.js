const mongoose = require("mongoose");
const cities = require("./cities")
const { descriptors, places } = require("./seedHelpers");
const Campground = require("../models/campground")

// Connection to database
mongoose.connect('mongodb://localhost:27017/YelpCamp');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Connected to Database");
});

// Seed the database with randomly generated campgrounds
const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: 'https://source.unsplash.com/collection/483251',
            description: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tenetur quaerat nesciunt suscipit iure voluptatem saepe modi repudiandae reprehenderit perspiciatis, distinctio odit, atque, dolores natus fugit quasi doloremque in ipsum reiciendis!
            Quam voluptatum corrupti delectus nobis accusamus tempore. Consequuntur accusamus amet vero id velit nemo, qui atque minus laborum molestiae explicabo, quas pariatur voluptatum, quasi recusandae earum sapiente officia nesciunt deserunt?
            Reprehenderit cum, ipsum deserunt maxime fugit, amet facilis ratione eaque iure, quia tempora! Eum commodi libero velit dolor et dignissimos, cumque quidem iste saepe. Quis esse cupiditate quaerat ipsa necessitatibus?
            Ut animi natus, officia maxime repudiandae iste tenetur accusantium quod earum expedita quos pariatur voluptas rerum blanditiis nemo impedit, ab illo adipisci soluta modi. Earum ex possimus iusto veniam voluptatem.
            Praesentium quidem, delectus velit dolores magni natus qui illum optio neque obcaecati quasi, facilis accusantium expedita ducimus recusandae, mollitia dolorem? Sunt iusto totam quae deleniti ipsam harum magni, eos est.`,
            price: Math.floor(Math.random() * 20) + 10
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})