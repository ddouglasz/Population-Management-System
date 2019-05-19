import mongoose, { Schema } from 'mongoose';

const populationSchema = new Schema({
    location: { type: String, required: true, trim: true },
    malePopulation: { type: Number, required: true },
    femalePopulation: { type: Number, required: true },
    totalPopulation: { type: Number, required: true },
    userId: { type: String, required: true, trim: true },
    subLocations: []
},
    {
        timeStamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
    });

const Population = mongoose.model('population', populationSchema);

export default Population;
