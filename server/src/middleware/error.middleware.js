const errorHandler = (err, req, res, next) => {
  let status = 500;
  let payload = { status: "error", message: "Internal Server Error" };

  if (err.code === 11000 && err.keyValue) {
    status = 400;

    const field = Object.keys(err.keyValue)[0];
    const value = err.keyValue[field];

    payload = { status: "fail", message: `The ${field} '${value}' is already in use` };
  } else if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    status = 400;
    payload = { status: "fail", message: "Malformed JSON Body" };
  } else if (err.name === "JsonWebTokenError") {
    status = 401;
    payload = { status: "fail", message: "Invalid Token" };
  } else if (err.name === "TokenExpiredError") {
    status = 401;
    payload = { status: "fail", message: "Login Timeout" };
  } else if (err.status && err.message) {
    status = err.status;
    payload = { status: status >= 500 ? "error" : "fail", message: err.message };
  }

  if (process.env.NODE_ENV === "dev") {
    payload.debug = { name: err.name, stack: err.stack };
    console.error(err);
  } else if (status >= 500) {
    console.error(err);
  }

  res.status(status).json(payload);
};

export default errorHandler;
