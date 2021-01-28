const route = require("express").Router();
const { evaluate } = require("../helpers/validate");
const validatePayload = require("../middlewares/validatePayload");
const {
  successfulValidation,
  failedValidation
} = require("../helpers/responses");
route.post("/validate-rule", validatePayload, async (req, res) => {
  const { rule, data } = req.body;
  const field = rule.field;
  // Rule valuation
  if (evaluate(data[field], rule.condition, rule.condition_value)) {
    return await successfulValidation(req, res);
  }
  return await failedValidation(req, res);
});
module.exports = route;
