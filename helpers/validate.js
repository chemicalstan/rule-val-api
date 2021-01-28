const conditions = {
  eq: "==",
  neq: "!=",
  gt: ">",
  gte: ">="
};
/**
 * Evaluate rule
 * @param {String} dataField
 * @param {String} ruleCondition
 * @param {String} ruleConditionValue Rule condition value
 * @returns {Boolean} true || false
 */
const evaluate = (
  dataField = "",
  ruleCondition = "",
  ruleConditionValue = ""
) => {
  if (ruleCondition === "contains") {
    if (typeof dataField === "string" && typeof ruleCondition === "string") {
      return dataField.includes(ruleConditionValue);
    }
    return false;
  }
  return eval(
    `'${dataField}' ${conditions[ruleCondition]} '${ruleConditionValue}'`
  );
};

module.exports = {
  evaluate
};
