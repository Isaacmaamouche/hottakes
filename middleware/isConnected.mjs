import jwt from "jsonwebtoken";

export const isConnected = (req, res, next) => {
  try {
    //Turns "Bearer TOKEN" into "TOKEN"
    const token = req.headers?.authorization.split(" ")[1];
    const tokenInfos = jwt.verify(token, process.env.HOTTAKES_SECRET_TOKEN);
    const { userId } = tokenInfos;
    if (userId) {
      req.auth = { ...req.auth, userId };
      console.log("userId valide");

      next();
    } else {
      console.log("userId non valide");
      throw "userId non valide";
    }
  } catch (error) {
    res.status(401).json({
      error: `L'authentification a échouée : ${error}`,
    });
  }
};
