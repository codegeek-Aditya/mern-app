import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        lowercase: true,
        trim: true,
        index: true, // make the user searchable - used for searching feature
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
    },
    fullName: {
        type: String,
        required: [true, 'Full Name is required'],
        trim: true,
        index: true,
    },
    avatar: {
        type: String, // cloudinary url
        required: true,
    },
    coverImage: {
        type: String,
    },
    watchHistory: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Video'
    }],
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    refreshToken: {
        type: String,
    }

}, { timestamps: true })

// pre hook is ki maan le you want ki kuch hone sei pehle ye ho jaaye. For example if a user enters a password I dont want ki wo direct password database mei jaake save ho jaaye as a simple string format mei so to avoid that I am using pre ki jaise hi user save karey apne details usse pehle password hash ho jaaye..


// dont write arrow functions in pre hook because arrow functions doesnt have context
userSchema.pre('save', async function (next) {
    // if password isnt modified then dont hash the password
    if (!this.isModified('password')) return next()

    // if the password is modified then hash the password
    this.password = await bcrypt.hash(this.password, 10)

    next()
})

// custom methods

userSchema.methods.isPasswordCorrect = async function (password) {
    // check the password
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,

        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model('User', userSchema)
// in mongodb it will be saved as users