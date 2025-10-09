import Shop from "../models/shop.model.js";
import uploadOnCloudinary from "../utils/cloudinary.js";

export const createEditShop = async (req, res) => {
    try {
        const {name, city, state, address} = req.body
        let image;
        if(req.file) {
            image = await uploadOnCloudinary(req.file.path)
        }

        let shop = await Shop.findOne({owner: req.userId})
        if(!shop){
            shop = await Shop.create({
            name,
            image,
            owner: req.userId,
            city,
            state,
            address
        })
        } else {
            shop = await Shop.findByIdAndUpdate(shop._id, {
            name,
            image,
            owner: req.userId,
            city,
            state,
            address}, {new:true})
        }
        await shop.populate("owner")
        return res.status(201).json(shop)
    } catch (error) {
        return res.status(500).json({message: `Error in creating shop: ${error}`})
    }
}
