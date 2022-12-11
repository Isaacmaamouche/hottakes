import { User } from "../models/user.mjs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const createAccount = (req, res) => {
  //Encrypt the input password
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      //Save the user following the specified schema
      const user = new User({
        email: req.body.email,
        password: hash,
      });
      user
        .save()
        .then(() => res.status(201).json({ message: "user créé" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

export const login = (req, res) => {
  //Look for a user with a matching email
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        //Returns null if user not found, respond with an error
        return res.status(401).json({ message: "User not found" });
      }
      //Check if the encrypted password matches the input password
      bcrypt
        .compare(req.body.password, user.password)
        .then((match) => {
          if (!match) {
            //Returns an error if the password is wrong
            return res.status(401).json({ message: "bad password" });
          }
          //Returns a signed token if the password matches
          const signedToken = jwt.sign(
            { userId: user._id },
            process.env.HOTTAKES_SECRET_TOKEN,
            {
              expiresIn: "24h",
            }
          );
          res.status(200).json({
            userId: user._id,
            token: signedToken,
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
