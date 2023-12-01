module.exports = (mongoose) => {
    const schema = mongoose.Schema(
        {
            pokedexNumber: Number,
            image: String,
            name: String,
            type1: String,
            type2: String,
            species: String,
            ability: String,
            totalBaseStat: Number,
        },
        {
            timestamps: true,
        }
    );

    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    return mongoose.model("pokemon", schema);
};
