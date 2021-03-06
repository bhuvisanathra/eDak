import mongoose from "mongoose";
import crypto from "crypto";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        lowercase: true
    },
    hashed_password: {
        type: String,
        required: true,
    },
    resetPasswordLink: {
        data: String,
        default: ""
    },
    salt: String
}, { timeStamp: true });

userSchema.virtual("password")
    .set(function (password) {
        this._password = password;
        this.salt = this.makeSalt();
        this.hashed_password = this.encryptPassword(password);
    })
    .get(function() {
        return this._password
    });


userSchema.methods = { 
    makeSalt: function() {
        return Math.round(new Date().valueOf() * Math.random()) + "";
    },
    encryptPassword: function(password) {
        if(!password) return "";
        try {
            return crypto
                .createHmac("sha1", this.salt)
                .update(password)
                .digest("hex")
        } catch(err) {
            return "";
        }
    },
    authenticate: function(plainText) {
        return this.encryptPassword(plainText) === this.hashed_password;
    }
}

const User = mongoose.model("User", userSchema);

export default User;

