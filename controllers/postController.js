const Post = require('../models/Post');
const Tag = require('../models/Tag');
const axios = require('axios');

// Function to convert image URL to base64
const convertImageToBase64 = async (imageUrl) => {
  const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
  const buffer = Buffer.from(response.data, 'binary');
  return buffer.toString('base64');
};

exports.getAllPosts = async (req, res) => {
  try {
    const allowedParams = ['page', 'limit', 'sort', 'keyword', 'tag'];
    const query = {};
    const sortField = 'createdAt';
    let sortOrder = -1;
    let page = 1;
    let limit = 10;

    // Validate and process allowed parameters
    for (const param in req.query) {
      if (allowedParams.includes(param)) {
        switch (param) {
          case 'page':
            page = Math.max(1, parseInt(req.query[param]) || 1);
            break;
          case 'limit':
            limit = Math.max(1, parseInt(req.query[param]) || 1);
            break;
          case 'sort':
            if (req.query[param] === 'asc') {
              sortOrder = 1;
            } else if (req.query[param] === 'desc') {
              sortOrder = -1;
            } else {
              return res.status(400).json({ message: 'Bad request: Invalid sort order. Use "asc" or "desc".' });
            }
            break;
          case 'keyword':
            query.$or = [
              { title: { $regex: req.query[param], $options: 'i' } },
              { desc: { $regex: req.query[param], $options: 'i' } }
            ];
            break;
          case 'tag':
            const tagDoc = await Tag.findOne({ name: req.query[param] });
            if (tagDoc) {
              query.tags = tagDoc._id;
            } else {
              return res.status(400).json({ message: 'Bad request: Invalid tag' });
            }
            break;
          default:
            break;
        }
      } else {
        // If any additional parameter is found, return a BAD_REQUEST response
        return res.status(400).json({ message: `Invalid query parameter: ${param}` });
      }
    }

    // Construct query for posts
    const posts = await Post.find(query)
      .sort({ [sortField]: sortOrder })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate('tags');

    const totalPosts = await Post.countDocuments(query);
    const totalPages = Math.ceil(totalPosts / limit);

    res.status(200).json({
      posts,
      currentPage: page,
      totalPages,
      totalPosts,
      limit
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createPost = async (req, res) => {
  try {
    const { title, desc, tags, image } = req.body;

    // Ensure tags exist or create new tags if they don't exist
    const tagDocs = await Promise.all(tags.map(async (tagName) => {
      let tagDoc = await Tag.findOne({ name: tagName });
      if (!tagDoc) {
        tagDoc = new Tag({ name: tagName });
        await tagDoc.save();
      }
      return tagDoc;
    }));

    const tagIds = tagDocs.map(tag => tag._id);

    // Convert image URL to base64
    let imageBase64 = '';
    if (image) {
      imageBase64 = await convertImageToBase64(image);
    }

    const post = new Post({
      title,
      desc,
      tags: tagIds,
      image: imageBase64
    });

    await post.save();
    res.status(201).json({message: 'post successfully created', post});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
