import jwt from "jsonwebtoken";

//Checks if the user is connected
export const isConnected = (req, res, next) => {
  try {
    //Turns "Bearer TOKEN" into "TOKEN" by spliting it
    const token = req.headers?.authorization.split(" ")[1];
    //Verify the token with the secret token phrase
    const tokenInfos = jwt.verify(token, process.env.HOTTAKES_SECRET_TOKEN);
    const { userId } = tokenInfos;
    //WHAT If a userID is defined, lets the request continue
    if (userId) {
      //Add the auth object to the request
      req.auth = { ...req.auth, userId };
      next();
    } else {
      // If a userID is undefined, returns an error

      throw "userId id not valid";
    }
  } catch (error) {
    res.status(401).json({
      error: `Authentification has failed : ${error}`,
    });
  }
};
