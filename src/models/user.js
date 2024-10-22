const mongoose = require('mongoose');
const validator = require ('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

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
        validate(value) {
            if(!validator.isEmail(value)){
                throw new Error("Ye sahi email nahi hai");
            }
        }

    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 128,
        validate(value) {
            if(!validator.isStrongPassword(value)){
                throw new Error("Your password should have  minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1,")
            }
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
        validate(value) {
            if(value.length == 0){
                console.log("sahi hai");
            } else if(!validator.isURL(value)){
                throw new Error("This is not a valid photo url")
            }
        }
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

userSchema.methods.getJWT =async function() {
    const user = this;

    const token = await jwt.sign({_id: user._id},"PrivateKey", {expiresIn : "7d"});

    return token;
}

userSchema.methods.validatePassword = async function(passwordInputByUser) {
    const user = this;
    const passwordHash = this.password;

    const token = await bcrypt.compare(passwordInputByUser, passwordHash);

    return token;
}

const User = mongoose.model("User", userSchema);

module.exports = User;