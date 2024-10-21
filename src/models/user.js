const mongoose = require('mongoose');

// agar hum type n bhi provide karein toh bhi accept hota hai
// validate ke ander validator usme hum custom function provide kar sakte hain aur jo message hai usme custom functions provide karte hain

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 4
    },
    lastName: {
        type: String
    },
    emailId: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,

    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 128,
        validate: {
            validator: function(v){
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(v);
            },
            message: props => `Password must contain at least 1 lowercase letter, 1 uppercase letter, 1 digit, and 1 special character`
        }
    },
    age: {
        type: Number,
        min: 18,
        max: 75
    },
    gender: {
        type: String,
        validate(value){
            if(!["male","female","others"].includes(value))
            {
                throw new Error("Gender should be either male female and others")
            }
        }
    },
    photoUrl: {
        type: String,
        default: "https://in.pinterest.com/pin/4011087177006454/",
    },
    about: {
        type: String,
        default: "About yaha pe default hai",
    },  
    skills: {
        type: [String]
    }
},{
    timestamps: true
})

const User = mongoose.model("User", userSchema);

module.exports = User;