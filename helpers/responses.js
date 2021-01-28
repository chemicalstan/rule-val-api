const { errorRes, successRes, resData } = require("../helpers/messages");
/**
 *  Success (200)
 * @param {objObjectect} messageObj message object
 * @param {Object} res response object
 * @returns {Object} OK
 */
const success = async (messageObj, res) => {
  return await res.status(200).json(messageObj);
};
/**
 * Bad Response (400)
 * @param {Object} messageObj message object
 * @param {Object} res response object
 * @returns {Object} Bad Response
 */
const error = async (messageObj, res) => {
  return await res.status(400).json(messageObj);
};

/**
 * Validation Successful
 * @param {Object} req
 * @param {Object} res
 * @returns {Object} OK
 */
const successfulValidation = async (req, res) => {
  const { rule, data } = req.body;
  successRes.message = `field ${rule.field} successfully validated.`;
  resData.validation.field = rule.field;
  resData.validation.field_value = data[rule.field];
  resData.validation.condition = rule.condition;
  resData.validation.condition_value = rule.condition_value;
  return await success(successRes, res);
};

/**
 * Validation Failed
 * @param {Object} req
 * @param {Object} res
 * @returns {Object} Bad Response
 */
const failedValidation = async (req, res) => {
  const { rule, data } = req.body;
  errorRes.message = `field ${rule.field} failed validation.`;
  errorRes.data = resData;
  resData.validation.field = rule.field;
  resData.validation.error = true;
  resData.validation.field_value = data[rule.field];
  resData.validation.condition = rule.condition;
  resData.validation.condition_value = rule.condition_value;
  return await error(errorRes, res);
};

module.exports = {
  success,
  error,
  successfulValidation,
  failedValidation
};
