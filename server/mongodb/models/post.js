import mongoose from 'mongoose';

// Create a schema for the Post object
const Post = new mongoose.Schema({
  name: { type: String, required: true },
  prompt: { type: String, required: true },
  photo: { type: String, required: true },
});

// Create a model for the Post object
const PostSchema = mongoose.model('Post', Post);

// Export the model
export default PostSchema;