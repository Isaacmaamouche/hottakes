import { Sauce } from "../models/sauce.mjs";

export const isOwner = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      const isOwner = req.auth.userId === sauce.userId;

      if (isOwner === true) {
        next();
      } else {
        return res.status(401).json({
          error: `L'authentification a échouée.`,
        });
      }
    })
    .catch((err) => res.status(400).json({ err }));
};
