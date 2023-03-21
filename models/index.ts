// Models goes here

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        required: true,
        type: String
    },
    shares:{
        type: Number,
        required: true
    },
    liquidated_balance:{
        type: Number,
        required: true
    } 
});

const User = mongoose.model("User", userSchema);

export default User;