const Response = require("./../../util/response");

const HttpStatus = {
  SUCCESS: { code: 200, status: "Success", message: "Success" },
  NOT_FOUND: {
    code: 404,
    status: "Not Found",
  },
  INTERNAL_SERVER_ERROR: { code: 500, status: "INTERNAL_SERVER_ERROR" },
};


const SUCCESS_HANDLE = (req, res, message, Data) => {
  return res
    .status(HttpStatus.SUCCESS.code)
    .json(
      new Response(HttpStatus.SUCCESS.status, message || HttpStatus.SUCCESS.message, Data)
    );
};

const ERROR_HANDLE = (req, res, message) => {
  return res
    .status(HttpStatus.INTERNAL_SERVER_ERROR.code)
    .json(new Response(HttpStatus.INTERNAL_SERVER_ERROR.status, message));
};

const NOT_FOUND_HANDLE = (req, res, message) => {
  return res
    .status(HttpStatus.NOT_FOUND.code)
    .json(new Response(HttpStatus.NOT_FOUND.status, message));
};


module.exports = { SUCCESS_HANDLE, ERROR_HANDLE, NOT_FOUND_HANDLE };