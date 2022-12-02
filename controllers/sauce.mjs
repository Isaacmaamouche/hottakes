import { Sauce } from "../models/sauce.mjs";
import * as fs from "node:fs";

export const getSauce = (req, res) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) => res.status(400).json({ error }));
};

export const getAllSauces = (req, res) => {
  Sauce.find()
    .then((sauces) => res.status(200).json(sauces))
    .catch((error) => res.status(400).json({ error }));
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
    .catch((error) => {
      console.debug("save failed");
      return res.status(400).json({ error });
    });
};

export const updateSauce = (req, res) => {
  const updateImage = Boolean(req.file);
  const newSauce = updateImage ? JSON.parse(req.body.sauce) : req.body;

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
        ...newSauce,
        imageUrl: filePath,
      }
    )
      .then(() => res.status(200).json({ message: "object modifié" }))
      .catch((error) => res.status(400).json({ error }));
  } else {
    Sauce.updateOne({ _id: req.params.id }, { ...newSauce })
      .then(() => res.status(200).json({ message: "object modifié" }))
      .catch((error) => res.status(400).json({ error }));
  }
};

export const deleteSauce = (req, res) => {
  //TODO
  console.log("deleteSauce controller ", req.auth, req.params.id);
  //   Sauce.findOne({ _id: req.params.id }).then((sauce) => {
  //     const filename = sauce.imageUrl?.split("/images/")[1];
  //     filename &&
  //       fs.unlink(
  //         `./public/src/images/${filename}`,
  //         (err) => err && console.debug(err)
  //       );
  //   });

  //WHAT Comment supprimer l'image puis le doc, ou l'inverse, en gérant le cas où l'un des deux planterait
  //   Sauce.deleteOne({ _id: req.params.id })
  //     .then(() => res.status(200).json({ message: "object supprimé" }))
  //     .catch((error) => res.status(400).json({ error }));

  Sauce.findOneAndDelete({ _id: req.params.id }, (error, sauce) => {
    error && res.status(400).json({ error });
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
  console.log("likeSauce controller");
};
