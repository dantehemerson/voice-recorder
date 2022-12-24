import * as Joi from 'joi';

export const globalConfigValidationSchema = Joi.object({
  // MONGODB_URI: Joi.string().uri().required(),

  AWS__ACCESS_KEY_ID: Joi.string().required().not().empty(),
  AWS__SECRET_ACCESS_KEY: Joi.string().required().not().empty(),
  AWS__REGION: Joi.string().not().empty(),

  AWS__BUCKETS__RECORDINGS: Joi.string().required().not().empty(),

  // API__BASE_URL: Joi.string().required().not().empty(),
});
