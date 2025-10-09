import mongoose from "mongoose"

const shopSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    city: {
        type: String,
        reuired: true
    },
    state: {
        type: String,
        reuired: true
    },
    address: {
        type: String,
        reuired: true
    },
    items: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item"
        
    }]

}, {timestamps: true})

const Shop = mongoose.model("Shop", shopSchema)
export default Shop