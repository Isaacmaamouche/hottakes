import { User } from "../models/user.mjs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const createAccount = (req, res) => {
  console.log("account creation for req.body.email");
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
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
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        console.log("User not found");
        return res.status(401).json({ message: "User not found" });
      }
      console.log("User found : ", user._id);

      bcrypt
        .compare(req.body.password, user.password)
        .then((match) => {
          if (!match) {
            console.log("bad password");
            return res.status(401).json({ message: "bad password" });
          }
          console.log("password match");
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
