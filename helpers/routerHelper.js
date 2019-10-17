const Joi = require("joi");

validateBody = schema => {
  return (req, res, next) => {
    const result = Joi.validate(req.body, schema);
    if (result.error) {
      return res.status(400).json(result);
    }

    if (!req.value) req.value = {};
    req.value["body"] = result.value;

    next();
  };
};

const schemas = {
  authenticationSchema: Joi.object().keys({
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string().required()
  })
};

module.exports = { validateBody, schemas };
