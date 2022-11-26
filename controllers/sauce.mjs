import { Sauce } from "../models/sauce.mjs";

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
  //TODO
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
  //TODO
  console.log("updateSauce controller");
};

export const deleteSauce = (req, res) => {
  //TODO
  console.log("deleteSauce controller");
};

export const likeSauce = (req, res) => {
  //TODO
  console.log("likeSauce controller");
};
