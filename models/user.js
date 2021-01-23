import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },

    password:{
        type: String,
        required: true
    },

    usertype:{
        type: String,
        required:true
    },

    isverified: {
        type: Boolean,
        default: false,
    }

})

const User = mongoose.model('user', userSchema)

export default User