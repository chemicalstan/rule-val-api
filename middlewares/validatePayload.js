const Joi = require("joi");
const { errorRes } = require("../helpers/messages");
const { error } = require("../helpers/responses");

module.exports = async (req, res, next) => {
  const Schema = Joi.object({
    rule: Joi.object()
      .keys({
        field: Joi.string()
          .required()
          .messages({
            "any.required": "field is required.",
            "string.base": "field should be a string.",
            "string.empty": "field is required."
          }),
        condition: Joi.string()
          .equal("eq", "neq", "gt", "gte", "contains")
          .required()
          .messages({
            "any.required": "condition is required.",
            "any.only":
              "condition must be one of [eq, neq, gt, gte, contains].",
            "string.empty": "condition is required."
          }),
        condition_value: [Joi.string().required(), Joi.number().required()]
      })
      .with("condition", "condition_value")
      .required()
      .messages({
        "object.with": "condition value is required.",
        "object.base": "rule should be an object.",
        "alternatives.types":
          "condition value must be one of [string, number].",
        "any.required": "rule is required.",
        "string.empty": "condition value is required."
      }),
    data: [
      Joi.object().required(),
      Joi.array().required(),
      Joi.string().required()
    ]
  })
    .with("rule", "data")
    .required()
    .messages({
      "object.with": "data is required.",
      "alternatives.types": "data must be one of [object, array, string].",
      "string.empty": "data is required."
    });

  try {
    const value = await Schema.validateAsync(req.body, { abortEarly: false });
    if (!value.data[value.rule.field]) {
      errorRes.message = `field ${value.rule.field} is missing from data.`;
      return await error(errorRes, res);
    }
    next();
  } catch (err) {
    if (err.details[0].type === "object.unknown") {
      errorRes.message = `Invalid JSON payload passed: ${err.details[0].context.key} is not allowed.`;
      return await error(errorRes, res);
    }
    errorRes.message = err.details[0].message;
    return await error(errorRes, res);
  }
};
