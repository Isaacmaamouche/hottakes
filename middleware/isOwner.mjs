//TODO If the user id == sauce's owner id then ok

import { Sauce } from "../models/sauce.mjs";

//TODO try catch en ccas d'erreur server
export const isOwner = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id }).then((sauce) => {
    const isOwner = req.auth.userId === sauce.userId;
    req.auth = { ...req.auth, isOwner };

    if (isOwner) next();
    res.status(401).json({
      error: `L'authentification a échouée.`,
    });
  });
};
