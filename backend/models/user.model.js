// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: [true, 'User name is required'],
//         trim: true,
//         minLength: 2,
//         maxLength: 50,
//     },

//     email: {
//         type: String,
//         required: [true, 'User email is required'],
//         trim: true,
//         unique: true,
//         lowercase: true,
//         match: [/\S+@\S+\.\S+/, 'Please fill a valid email address'],
//     },
//     password: {
//         type: String,
//         required: [true, 'User password is required'],
//         minLength: 6,
//     }
// }, { timestamps: true });

// const User = mongoose.model('User', userSchema);

// export default User; 

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'User name is required'],
    trim: true,
    minLength: 2,
    maxLength: 50,
  },
  email: {
    type: String,
    required: [true, 'User email is required'],
    trim: true,
    unique: true,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, 'Please fill a valid email address'],
  },
  password: {
    type: String,
    required: [true, 'User password is required'],
    minLength: 6,
  },
  age: Number,
  avatar: String,
  bio: String,
  location: String,
  gallery: [{
    image: String,
    caption: String,
    location: String,
    date: String,
    likes: Number,
  }],
  blogs: [{
    title: String,
    content: String,
    likes: Number,
    comments: [{ body: String, date: Date }]
  }],
  tripsSaved: [String],
  blogsSaved: [String],
  comments: [{
    blogId: String,
    comment: String,
    date: Date
  }]
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;
