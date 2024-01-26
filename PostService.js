import Post from "./Post.js";
import FileService from "./FileService.js";

class PortService {
  async create(post,picture) {
      const fileName = picture ? FileService.saveFiles(picture) : null
    
    const createdPost = await Post.create({...post,picture: fileName});
    return createdPost;
  }
  async getAll() {
    const posts = await Post.find();
    return posts;
  }
  async getOne(id) {
    if (!id) {
      throw new Error("none Id");
    }
    const post = await Post.findById(id);
    return post;
  }
  async update(post) {
    if (!post._id) {
      throw new Error("none Id");
    }
    const updatedPost = await Post.findByIdAndUpdate(post._id, post, {
      new: true,
    });
    return updatedPost;
  }
  async delete(id) {
    if (!id) {
      throw new Error("none Id");
    }
    const deletedPost = await Post.findByIdAndDelete(id);
    return deletedPost;
  }
}

export default new PortService();
