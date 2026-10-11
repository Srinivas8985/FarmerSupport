const mongoose = require('mongoose');
const CropHealth = require('./models/CropHealth');
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

const seedData = [
    {
        diseaseName: "Potato Blight",
        description: "A fungal disease that causes serious damage to potato and tomato crops.",
        symptoms: "Dark blotches on leaves, rotting tubers.",
        solution: "Use fungicides containing copper or mancozeb. Rotate crops.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Phytophthora_infestans_potato_leaf.jpg/320px-Phytophthora_infestans_potato_leaf.jpg"
    },
    {
        diseaseName: "Wheat Rust",
        description: "Fungal disease affecting wheat stems and leaves.",
        symptoms: "Reddish-orange spore masses on stems and leaves.",
        solution: "Plant resistant varieties. Apply fungicides if severe.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Stem_rust_on_wheat.jpg/320px-Stem_rust_on_wheat.jpg"
    },
    {
        diseaseName: "Rice Blast",
        description: "One of the most destructive diseases of rice worldwide.",
        symptoms: "Diamond-shaped lesions on leaves with gray centers.",
        solution: "Maintain proper water level. Avoid excessive nitrogen fertilizer.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Rice_Blast_symptoms.jpg/320px-Rice_Blast_symptoms.jpg"
    }
];

const seedDB = async () => {
    await CropHealth.deleteMany({});
    await CropHealth.insertMany(seedData);
    console.log("Crop Health Data Seeded");
    mongoose.connection.close();
};

seedDB();
