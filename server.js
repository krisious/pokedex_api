const express = require("express");
const cors = require("cors");
const path = require("path");
const db = require("./app/models");
const dummyData = require("./data");
const app = express();

const corsOptions = {
    origin: "*",
};

// register cors middleware
app.use(cors(corsOptions));
app.use(express.json());

// Set the path to the 'views' directory
const viewsPath = path.join(__dirname, "views");
// Serve static files from the 'views' directory
app.use(express.static(viewsPath));

// koneksi ke database
const mongooseConfig = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

db.mongoose
    .connect(db.url, mongooseConfig)
    .then(() => console.log("Database Connected."))
    .catch((err) => {
        console.log(`Can't Connect to Database, ${err.message}.`);
        process.exit();
    });

// Menggunakan data dummy untuk keperluan pengembangan (hapus atau komentari ini saat menggunakan database sesungguhnya)
const insertDummyData = async () => {
    try {
        for (const pokemon of dummyData) {
            // Periksa apakah Pokemon dengan pokedexNumber yang sama sudah ada
            const existingPokemon = await db.pokemon.findOne({
                pokedexNumber: pokemon.pokedexNumber,
            });

            // Jika tidak ada, masukkan ke dalam database
            if (!existingPokemon) {
                await db.pokemon.create(pokemon);
                console.log(
                    `Inserted Pokemon with pokedexNumber ${pokemon.pokedexNumber}`
                );
            } else {
                console.log(
                    `Skipped inserting duplicate Pokemon with pokedexNumber ${pokemon.pokedexNumber}`
                );
            }
        }
    } catch (error) {
        console.error(`Error inserting dummy data: ${error.message}.`);
    }
};

insertDummyData();

// membuat routes
require("./app/routes/pokemon.routes")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
