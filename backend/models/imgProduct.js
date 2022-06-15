import mongoose from "mongoose";

const imgProducts = mongoose.Schema({ 
    src: {
        type: String,
        required: true,
    },
    about:{
        type: String,
        required: true,
    }
})

export default mongoose.model("products", imgProducts);