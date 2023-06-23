import express from 'express';
import * as dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

import Post from '../mongodb/models/post.js';
// config .env
dotenv.config();
// express router
const router = express.Router();
// cloudinary config
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
// route for getting all posts
router.route('/').get(async (req, res) => {
    try {
    // get all posts from db
    const posts = await Post.find({});
    res.status(200).json({ success: true, data: posts });
    } catch (err) {
    // send back error message
    res.status(500).json({ success: false, message: 'Fetching posts failed, please try again' });
    }
});
// route for creating a post
router.route('/').post(async (req, res) => {
    try {
    // get name, prompt, and photo from req.body
    const { name, prompt, photo } = req.body;
    // upload photo to cloudinary
    const photoUrl = await cloudinary.uploader.upload(photo);
    // create a new post
    const newPost = await Post.create({
        name,
        prompt,
        photo: photoUrl.url,
    });
    console.log(newPost);
    // send back the new post
    res.status(200).json({ success: true, data: newPost });
    } catch (err) {
    // send back error message
    res.status(500).json({ success: false, message: 'Unable to create a post, please try again' });
    }
});

// express router
export default router;