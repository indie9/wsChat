import PostService from "./PostService.js";

class PostController {
  async create(req, res) {
    try {
      const post = await PostService.create(req.body,req.files && req.files.picture);
      res.status(200).json(post);
    } catch (e) {
      res.status(500).json(e);
    }
  }
  async getAll(req, res) {
    try {
      const posts = await PostService.getAll();
      res.status(200).json(posts);
    } catch (e) {
      res.status(500).json(e);
    }
  }
  async getOne(req, res) {
    try {
      const { id } = req.params;
      const post = await PostService.getOne(id);
      res.status(200).json(post);
    } catch (e) {
      res.status(500).json(e);
    }
  }
  async update(req, res) {
    try {
      const post = req.body;
      const updatedPost = await PostService.update(post);
      res.status(200).json(updatedPost);
    } catch (e) {
      res.status(500).json(e);
    }
  }
  async delete(req, res) {
    try {
      const { id } = req.params;
      const deletedPost = await PostService.delete(id);
      res.status(200).json(deletedPost);
    } catch (e) {
      res.status(500).json(e);
    }
  }
}

export default new PostController();
