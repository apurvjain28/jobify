import { StatusCodes } from "http-status-codes";

// both errors in controller as well
// it makes API less error prone
// plus, checking error before it hits API >> good!
const errorHandlerMiddleware = (err, req, res, next) => {
  //console.log(err);
  // if err.message is coming from controller then show that
  const defaultError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong, try again later.",
  };
  // res.status(defaultError.statusCode).json({ msg: err });

  //////////////////// Validation Error
  // if in error object the name property is Validation error
  // then we want to change its status code
  if (err.name === "ValidationError") {
    defaultError.statusCode = StatusCodes.BAD_REQUEST;
    //defaultError.msg = err.message;
    // through this we are handling both missing value as well as invalid field
    defaultError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(",");
  }

  //////////////////// Unique Error
  // Getting code: 11000 in error
  if (err.code && err.code === 11000) {
    defaultError.statusCode = StatusCodes.BAD_REQUEST;
    defaultError.msg = `${Object.keys(err.keyValue)} field has to be unique`;
  }

  //////////////////// Rendering Error
  // res.status(defaultError.statusCode).json({ msg: err });
  res.status(defaultError.statusCode).json({ msg: defaultError.msg });
};

export default errorHandlerMiddleware;
