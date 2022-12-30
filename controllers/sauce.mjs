import { Sauce } from "../models/sauce.mjs";
import * as fs from "node:fs";

//Retrieve the sauce the given ID parameter
export const getSauce = (req, res) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => res.status(200).json(sauce))
    .catch((err) =>
      res.status(404).json({
        error: `The sauce you've requested has not been found, or the provided id is incorrect - ${err}`,
      })
    );
};

//Retrieve all sauces
export const getAllSauces = (req, res) => {
  Sauce.find()
    .then((sauces) => res.status(200).json(sauces))
    .catch((err) => res.status(400).json({ err }));
};

//Create a sauce using the data from the request body, with the Sauce schema
export const createSauce = (req, res) => {
  //Create the url to the image using informations from the request
  const filePath = `${req.protocol}://${req.get("host")}/images/${
    req.file.filename
  }`;

  const sauceData = JSON.parse(req.body.sauce);
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

  sauce
    .save()
    .then(() => {
      return res.status(201).json({ message: "a new sauce has been created" });
    })
    .catch((err) => {
      return res.status(400).json({ err });
    });
};

//Create a sauce with the given ID, using the data from the request body
export const updateSauce = (req, res) => {
  //If the image has been changed and passed through the multer middleware,
  //Parse the json
  const updateImage = Boolean(req.file);
  const updatedSauce = updateImage ? JSON.parse(req.body.sauce) : req.body;

  if (updateImage) {
    const filePath = `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`;
    Sauce.findOne({ _id: req.params.id }).then((sauce) => {
      //Delete the no longuer used image
      deleteSauce(sauce);
    });
    Sauce.updateOne(
      { _id: req.params.id },
      {
        ...updatedSauce,
        imageUrl: filePath,
      }
    )
      .then(() =>
        res
          .status(200)
          .json({ message: "The sauce has successfully been modified" })
      )
      .catch((err) => res.status(400).json({ err }));
  } else {
    Sauce.updateOne({ _id: req.params.id }, { ...updatedSauce })
      .then(() =>
        res
          .status(200)
          .json({ message: "The sauce has successfully been modified" })
      )
      .catch((err) => res.status(400).json({ err }));
  }
};

//Delete the sauce with the given ID parameter
export const deleteSauce = (req, res) => {
  Sauce.findOneAndDelete({ _id: req.params.id }, (err, sauce) => {
    //Returns an error if the sauce doesn't exist
    if (err) res.status(400).json({ err });
    //Delete the no longuer used image
    deleteImage(sauce);
    res.status(200).json({ message: "Sauce successfuly deleted" });
  });
};

// Add or remove a like or a dislike from a given sauce
export const likeSauce = (req, res) => {
  const { like } = req.body;

  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      let usersLiked = sauce.usersLiked;
      let usersDisliked = sauce.usersDisliked;

      //If it's a like
      if (like == 1) {
        //Add the user to the array of users who's liked this sauce
        usersLiked = [...new Set([...sauce.usersLiked, req.auth.userId])];
      }
      //If it's an unlike or an undisliked
      if (like == 0) {
        //Remove the user from the array of users who's liked or disliked this sauce
        usersLiked = sauce.usersLiked.filter(
          (userId) => userId === req.auth.userId
        );
        usersDisliked = sauce.usersDisliked.filter(
          (userId) => userId === req.auth.userId
        );
      }
      //If it's a dislike
      if (like == -1) {
        //Add the user to the array of users who's disliked this sauce
        usersDisliked = [...new Set([...sauce.usersDisliked, req.auth.userId])];
      }

      //Update the sauce with the new likes/dislikes informations
      Sauce.updateOne(
        { _id: req.params.id },
        {
          usersLiked,
          likes: usersLiked.length,
          usersDisliked,
          dislikes: usersDisliked.length,
        }
      )
        .then(() => res.status(200).json({ message: "sauce has been updated" }))
        .catch((err) => res.status(400).json({ err }));
    })
    .catch((err) => res.status(400).json({ err }));
};

const deleteImage = (sauce) => {
  //Retrievse the image's filename
  const filename = sauce.imageUrl?.split("/images/")[1];
  //If there is an image, remove the image from the image folder
  filename &&
    fs.unlink(`./public/src/images/${filename}`, (err) => {
      if (err) {
        throw err;
      }
    });
  //Else, do nothing
};
