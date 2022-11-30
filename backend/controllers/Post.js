const Post = require("../models/Post");
const fs = require("fs");
const { log } = require("console");

exports.createPost = (req, res, next) => {
  // const postObject = JSON.parse(req.body);
  const postObject = req.body;
  delete postObject._id;
  delete postObject._userId;
  if (req.file) {
    const post = new Post({
      ...postObject,
      userId: req.auth.userId,
      imageUrl: `${req.protocol}://${req.get("host")}/images/${
        req.file.filename
      }`,
    });

    post
      .save()
      .then(() => {
        res.status(201).json(post);
      })
      .catch((error) => {
        res.status(400).json({ error });
      });
  } else {
    const post = new Post({
      ...postObject,
      userId: req.auth.userId,
      imageUrl: "",
    });
    post
      .save()
      .then(() => {
        res.status(201).json(post);
      })
      .catch((error) => {
        res.status(400).json({ error });
      });
  }
};

exports.getAllPost = (req, res, next) => {
  Post.find()
    .then((post) => res.status(200).json(post))
    .catch((error) => res.status(400).json({ error }));
};

// exports.getOnePost = (req, res, next) => {
//   Post.findOne({ _id: req.params.id })
//     .then((post) => res.status(200).json(post))
//     .catch((error) => res.status(404).json({ error }));
// };

exports.modifyPost = (req, res, next) => {
  const postObject = req.file
    ? {
        ...req.body,
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };

  delete postObject._userId;
  Post.findOne({ _id: req.params.id })
    .then((post) => {
      if (post.userId === req.auth.userId || req.body.role === true) {
        Post.updateOne(
          { _id: req.params.id },
          { ...postObject, _id: req.params.id }
        )
          .then(() => res.status(200).json(postObject))
          .catch((error) => res.status(400).json({ error }));
      } else {
        res.status(401).json({ message: "Non-autorisé" });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({ error });
    });
};

exports.deletePost = (req, res, next) => {
  console.log(req.body);
  Post.findOne({ _id: req.params.id })
    .then((post) => {
      if (post.userId === req.auth.userId || req.body.role === true) {
        const filename = post.imageUrl.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          Post.deleteOne({ _id: req.params.id })
            .then(() => {
              res.status(200).json(req.params.id);
            })
            .catch((error) => res.status(401).json({ error }));
        });
      } else {
        res.status(401).json({ message: "Not authorized" });
      }
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

exports.likeDislike = (req, res, next) => {
  let like = req.body.like;
  let userId = req.body.userId;
  let postId = req.params.id;
  if (like === 1) {
    Post.updateOne(
      { _id: postId },
      { $push: { usersLiked: userId }, $inc: { likes: +1 } }
    )
      .then(() =>
        res.status(200).json({
          message: "j'aime ajouté !",
        })
      )
      .catch((error) =>
        res.status(400).json({
          error,
        })
      );
  }
  if (like === -1) {
    Post.updateOne(
      { _id: postId },
      { $push: { usersDisliked: userId }, $inc: { dislikes: +1 } }
    )
      .then(() => {
        res.status(200).json({
          message: "Dislike ajouté !",
        });
      })
      .catch((error) =>
        res.status(400).json({
          error,
        })
      );
  }
  if (like === 0) {
    Post.findOne({ _id: postId })
      .then((post) => {
        if (post.usersLiked.includes(userId)) {
          Post.updateOne(
            { _id: postId },
            { $pull: { usersLiked: userId }, $inc: { likes: -1 } }
          )
            .then(() =>
              res.status(200).json({
                message: "Like retiré !",
              })
            )
            .catch((error) =>
              res.status(400).json({
                error,
              })
            );
        }
        if (post.usersDisliked.includes(userId)) {
          Post.updateOne(
            { _id: postId },
            { $pull: { usersDisliked: userId }, $inc: { dislikes: -1 } }
          )
            .then(() =>
              res.status(200).json({
                message: "Dislike retiré !",
              })
            )
            .catch((error) =>
              res.status(400).json({
                error,
              })
            );
        }
      })
      .catch((error) =>
        res.status(404).json({
          error,
        })
      );
  }
};
