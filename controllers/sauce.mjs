import { Sauce } from "../models/sauce.mjs";
import * as fs from "node:fs";

export const getSauce = (req, res) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => res.status(200).json(sauce))
    .catch((err) => res.status(400).json({ err }));
};

export const getAllSauces = (req, res) => {
  Sauce.find()
    .then((sauces) => res.status(200).json(sauces))
    .catch((err) => res.status(400).json({ err }));
};

export const createSauce = (req, res) => {
  console.log("createSauce controller");
  //WHAT Quel file path est le mieux
  // const filePath = req.file.path.replace(/\\/g, "/");
  // public/src/images/1669481721448--pepe.jpg
  // const filePath = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
  const filePath = `http://localhost:3000/images/${req.file.filename}`;

  const sauceData = JSON.parse(req.body.sauce);
  console.debug("sauce : ", sauceData);
  const sauce = new Sauce({
    userId: req.auth.userId,
    name: sauceData.name,
    manufacturer: sauceData.manufacturer,
    description: sauceData.description,
    mainPepper: sauceData.mainPepper,
    imageUrl: filePath,
    heat: sauceData.heat,
    likes: 0,
    dislikes: 0,
    usersLiked: [],
    usersDisliked: [],
  });
  console.debug("sauce : ", sauce);

  sauce
    .save()
    .then(() => {
      console.debug("save order sent");
      return res.status(201).json({ message: "sauce créé" });
    })
    .catch((err) => {
      console.debug("save failed");
      return res.status(400).json({ err });
    });
};

export const updateSauce = (req, res) => {
  const updateImage = Boolean(req.file);
  const updatedSauce = updateImage ? JSON.parse(req.body.sauce) : req.body;

  if (updateImage) {
    const filePath = `http://localhost:3000/images/${req.file.filename}`;
    Sauce.findOne({ _id: req.params.id }).then((sauce) => {
      const filename = sauce.imageUrl?.split("/images/")[1];
      filename &&
        fs.unlink(
          `./public/src/images/${filename}`,
          (err) => err && console.debug(err)
        );
    });
    Sauce.updateOne(
      { _id: req.params.id },
      {
        ...updatedSauce,
        imageUrl: filePath,
      }
    )
      .then(() => res.status(200).json({ message: "sauce modifiée" }))
      .catch((err) => res.status(400).json({ err }));
  } else {
    Sauce.updateOne({ _id: req.params.id }, { ...updatedSauce })
      .then(() => res.status(200).json({ message: "sauce modifiée" }))
      .catch((err) => res.status(400).json({ err }));
  }
};

export const deleteSauce = (req, res) => {
  Sauce.findOneAndDelete({ _id: req.params.id }, (err, sauce) => {
    if (err) res.status(400).json({ err });
    const filename = sauce.imageUrl.split("/images/")[1];
    fs.unlink(
      `./public/src/images/${filename}`,
      (err) => err && console.debug(err)
    );
    res.status(200).json({ message: "object supprimé" });
  });
};

export const likeSauce = (req, res) => {
  //TODO
  console.log("likeSauce controller, ", req.auth.userId, req.body);
  const { like } = req.body;

  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      let usersLiked = sauce.usersLiked;
      let usersDisliked = sauce.usersDisliked;
      if (like == 1) {
        usersLiked = [...sauce.usersLiked, req.auth.userId];
      }
      if (like == 0) {
        usersLiked = sauce.usersLiked.filter(
          (userId) => userId === req.auth.userId
        );
        usersDisliked = sauce.usersDisliked.filter(
          (userId) => userId === req.auth.userId
        );
      }
      if (like == -1) {
        usersDisliked = [...sauce.usersDisliked, req.auth.userId];
      }

      Sauce.updateOne(
        { _id: req.params.id },
        {
          usersLiked,
          likes: usersLiked.length,
          usersDisliked,
          dislikes: usersDisliked.length,
        }
      )
        .then(() => res.status(200).json({ message: "sauce modifiée" }))
        .catch((err) => res.status(400).json({ err }));
    })
    .catch((err) => res.status(400).json({ err }));
};
