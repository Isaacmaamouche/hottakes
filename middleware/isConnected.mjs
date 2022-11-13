import jwt from "jsonwebtoken";

export const isConnected = (req, res, next) => {
  try {
    console.log("checking token");

    //Turns "Bearer XXXX" into "TOKEN"
    const token = req.headers?.authorization.split(" ")[1];
    const tokenInfos = jwt.verify(token, process.env.HOTTAKES_SECRET_TOKEN);
    const { userId } = tokenInfos;
    if (req.body.userId == userId) {
      req.auth = { userId };
      next();
    } else {
      console.log("userId non valide");
      throw "userId non valide";
    }
  } catch (error) {
    res.status(401).json({
      error: `L'authentification a échouée : ${error}`,
      headers: req.headers,
    });
  }
};
