exports.successResponse = (res, message = "Success", data = null) => {
  return res.status(200).json({
    status: "success",
    message,
    ...(data && { data }),
  });
};

exports.errorResponse = (res, message = "Error", code = 500) => {
  return res.status(code).json({
    status: "error",
    message,
  });
};