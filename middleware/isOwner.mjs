import { Sauce } from "../models/sauce.mjs";

//Checks if the user is the sauce owner
export const isOwner = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      //Compares the userID with the sauce's owner userID
      const isOwner = req.auth.userId === sauce.userId;
      if (isOwner === true) {
        //If it matches, lets the request continue
        next();
      } else {
        //Else, returns an error
        return res.status(403).json({
          error: `User is not the sauce owner`,
        });
      }
    })
    .catch((err) => res.status(400).json({ err }));
};
