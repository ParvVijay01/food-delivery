import jwt from "jsonwebtoken"

export const isAuth = async (req,res,next) => {
    try {
        const token = req.cookies.token
        if(!token){
            return res.status(401).json({message: "Token not found"})
        }
        const decodeToken = jwt.verify(token, process.env.JWT_SECRET)
        if(!decodeToken){
            return res.status(401).json({message: "Token not verified"})
        }
        console.log('====================================');
        console.log(decodeToken);
        console.log('====================================');
        req.userId = decodeToken.userId
        next()
    } catch (error) {
        return res.status(500).json({message: `isAuth error: ${error}}`})
    }
}