const db = require("../models");
const Pokemon = db.pokemon;

exports.create = async (req, res) => {
    try {
        // Periksa apakah Pokemon dengan pokedexNumber yang sama sudah ada
        const existingPokemon = await Pokemon.findOne({
            pokedexNumber: req.body.pokedexNumber,
        });

        // Jika sudah ada, kirim respons dengan pesan kesalahan
        if (existingPokemon) {
            return res
                .status(400)
                .send({
                    message: `Pokemon with pokedexNumber ${req.body.pokedexNumber} already exists.`,
                });
        }

        // Jika belum ada, buat Pokemon baru
        const newPokemon = new Pokemon({
            pokedexNumber: req.body.pokedexNumber,
            image: req.body.image,
            name: req.body.name,
            type1: req.body.type1,
            type2: req.body.type2,
            species: req.body.species,
            ability: req.body.ability,
            totalBaseStat: req.body.totalBaseStat,
        });

        // Simpan Pokemon ke dalam database
        await newPokemon.save();

        // Kirim respons sukses
        res.send({ message: "Pokemon created successfully!" });
    } catch (err) {
        // Tangani kesalahan dan kirim respons dengan pesan kesalahan
        res.status(500).send({ message: err.message });
    }
};

exports.getAll = (req, res) => {
    Pokemon.find()
        .then((data) => res.send(data))
        .catch((err) => res.status(500).send({ message: err.message }));
};

exports.find = (req, res) => {
    const id = req.params.id;

    Pokemon.findById(id)
        .then((data) => {
            if (!data) {
                res.status(404).send({ message: "Pokemon not found." });
            } else {
                res.send(data);
            }
        })
        .catch((err) => res.status(500).send({ message: err.message }));
};

exports.update = (req, res) => {
    const id = req.params.id;

    Pokemon.findByIdAndUpdate(id, req.body)
        .then((data) => {
            if (!data) {
                res.status(404).send({ message: "Pokemon not found." });
            } else {
                res.send({ message: "Pokemon updated successfully." });
            }
        })
        .catch((err) => res.status(500).send({ message: err.message }));
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Pokemon.findByIdAndDelete(id)
        .then((data) => {
            if (!data) {
                res.status(404).send({ message: "Pokemon not found." });
            } else {
                res.send({ message: "Pokemon deleted successfully." });
            }
        })
        .catch((err) => res.status(500).send({ message: err.message }));
};
