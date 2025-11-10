import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET_KEY, { algorithm: 'HS256', expiresIn: '2h' })
}

// Register a user
const registerUser = async (req, res) => {
    try {
        const { name, username, password, contact, email, dob } = req.body;

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json("User already exists");
        }

        const newUser = await User.create({ name, username, password, contact, email, dob });
        return res.status(201).json({
            _id: newUser._id,
            name: newUser.name,
            username: newUser.username,
            contact: newUser.contact,
            email: newUser.email,
            dob: newUser.dob,
            token: generateToken(newUser._id)
        })
    } catch (error) {
        console.log(`Error while registering new user: ${error.message}`);
        return res.status(500).json({ error: error.message });
    }
}


// Login
const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        const existingUser = await User.findOne({ username });

        if (!existingUser) {
            return res.status(404).send({ message: 'User not found' });
        }

        const passwordValidated = await existingUser.matchPassword(password);

        if (passwordValidated) {
            return res.status(200).json({
                _id: existingUser._id,
                name: existingUser.name,
                username: existingUser.username,
                token: generateToken(existingUser._id)
            })
        } else {
            return res.status(401).json({ message: 'Invalid creadentials' })
        }


    } catch (error) {
        console.log(`Error while loggin in : ${error.message}`);
        return res.status(500).json({ error: error.message });
    }
}


// get User Profile
const getUserProfile = async (req, res) => { 
    try {
        console.log('req.loggedInUser:::', req.loggedInUser);
        
        if(!req.loggedInUser){
            return res.status(404).json({message: 'No user found'});
        }

        return res.status(200).json(req.loggedInUser);
    } catch (error) {
        console.log(`Error while fetching user profile: ${error.message}`)
        return res.status(500).json({error: error.message});
    }
}


export default { registerUser, loginUser, getUserProfile }