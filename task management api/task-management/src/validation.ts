import * as Joi from "joi";

export const validationSchema=Joi.object({
    NODE_ENV:Joi.string().valid("development","production"),
    DB_USER:Joi.string().length(10),
    PORT:Joi.number()
})