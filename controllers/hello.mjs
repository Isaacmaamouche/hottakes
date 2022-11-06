export const sayHello = (req, res, next) => {
  const test = process.env.MONGO_CONNECTION_STRING;
  console.debug(test);
  res.status(200).json(test);
};
