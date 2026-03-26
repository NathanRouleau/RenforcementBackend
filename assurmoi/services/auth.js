const { User } = require("../models")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const login = async (req, res) => {
    try {
        const { username, password } = req.body

        const user = await User.findOne({
            where: {
                username
            }
        })

        if(!user) return res.status(404).json({ message: 'User not found' });

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid) return res.status(401).json({ message: 'Incorrect password' });

        const token = jwt.sign({ user: user.clean() }, process.env.SECRET_KEY, { expiresIn: '1h' })

        user.token = token
        await user.save()

        return res.status(200).json({
            token
        });
    } catch(err) {
        console.error("🚨 ERREUR CRITIQUE LOGIN :", err); // On affiche l'erreur dans le terminal
        return res.status(400).json({
            message: "error on login",
            detail: err.message // On l'envoie aussi sur Postman
        })
    }
}

const logout = async (req, res) => {
    req.user.token = null
    await req.user.save();

    return res.status(200).json({ message: 'unlogged !'});
}

const register = async (req, res) => {
    const { dbInstance } = require('../models'); 
    const transaction = await dbInstance.transaction();

    try {
        const { username, password, firstname, lastname, email } = req.body;

        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) {
            await transaction.rollback();
            return res.status(409).json({ message: "Username already taken" });
        }

        const hashedPassword = await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT || 10));

        const user = await User.create({
            username,
            password: hashedPassword,
            firstname,
            lastname,
            email
        }, { transaction });

        await transaction.commit();

        return res.status(201).json({
            message: "User successfully registered",
            user: user.clean() 
        });

    } catch (err) {
        await transaction.rollback();
        console.error("🚨 ERREUR REGISTER :", err);
        return res.status(400).json({ 
            message: "Error on register",
            detail: err.message 
        });
    }
}

module.exports = {
    login,
    logout,
    register
}