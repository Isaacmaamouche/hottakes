import jwt from "jsonwebtoken";

//Checks if the user is connected
export const auth = (req, res, next) => {
  try {
    //Throw an arror if the authorization header is missing
    if (!req.headers.authorization) {
      throw "authorization header is missing";
    }

    //Turn "Bearer TOKEN" into "TOKEN" by spliting it
    const token = req.headers?.authorization?.split(" ")[1];
    //Verify the token with the secret token phrase
    const tokenInfos = jwt.verify(token, process.env.HOTTAKES_SECRET_TOKEN);
    const { userId } = tokenInfos;

    // If a userID has been set in the token, let the request continue
    if (userId) {
      //Add the auth object to the request
      req.auth = { ...req.auth, userId };
      next();
    } else {
      // If the userID is undefined, return an error
      throw "userId is invalid";
    }
  } catch (error) {
    res.status(401).json({
      error: `Authentification has failed : ${error}`,
    });
  }
};
