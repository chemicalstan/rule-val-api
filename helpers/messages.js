const resData = {
  validation: {
    error: false,
    field: "",
    field_value: "",
    condition: "",
    condition_value: ""
  }
};
const successRes = {
  message: "",
  status: "success",
  data: resData
};
const errorRes = {
  message: "",
  status: "error",
  data: null
};

module.exports = {
  successRes,
  errorRes,
  resData
};
