import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const protect = async (req, res, next) => {
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            let token = req.headers.authorization.split(" ")[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
            console.log('decoded::: ', decoded);
            req.loggedInUser =  await User.findById(decoded.id).select('-password');

            next();
            return;
        } catch (error) {
            console.log(`error in authMiddleware: ${error.message}`)
            return res.status(401).json({error: error.message});
        }
    }

    return res.status(401).json({message: 'No token provided'});
}

export default protect;