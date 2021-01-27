const successRes = {
  message,
  status: "success",
  data
};
const errorRes = {
  message,
  status: "error",
  data
};

const resData = {
  validation: {
    error,
    field,
    field_value,
    condition,
    condition_value
  }
}

module.exports = {
  successRes,
  errorRes,
  resData
};
