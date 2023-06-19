const User = require("../models/User");
const mongoose = require("mongoose");

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();

        res.status(200).json(users);
    } catch (ex) {
        res.status(500).json(ex.message);
    }
};

exports.getUser = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(400);
            throw new Error("Invalid user id");
        }

        const user = await User.findById(id);

        if (!user) {
            res.status(404);
            throw new Error("user not found!");
        }

        res.status(200).json(user);
    } catch (ex) {
        res.status(500).json(ex.message);
    }
};

exports.createUser = async (req, res) => {
    try {
        let user = new User(req.body);

        const duplicate = await User.find({ email: req.body.email });
        if (duplicate) {
            res.status(400);
            throw new Error("Email already in use");
        }

        user = await user.save();

        if (!user) {
            res.status(404);
            throw new Error("user not found!");
        }

        res.status(201).json(user);
    } catch (ex) {
        res.status(500).json(ex.message);
    }
};

exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(400);
            throw new Error("Invalid user id");
        }

        const user = await User.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!user) {
            res.status(404);
            throw new Error("user not found!");
        }

        res.status(200).json(user);
    } catch (ex) {
        res.status(500).json(ex.message);
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(400);
            throw new Error("Invalid user id");
        }

        const user = await User.findByIdAndDelete(id);

        if (!user) {
            res.status(404);
            throw new Error("user not found!");
        }

        res.status(200).json(user);
    } catch (ex) {
        res.status(500).json(ex.message);
    }
};
