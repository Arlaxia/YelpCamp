const Joi = require("joi");

module.exports.campgroundValidationSchema = Joi.object({
    campground: Joi.object({
        title: Joi.string().required(),
        price: Joi.number().min(0).required(),
        image: Joi.string().required(),
        description: Joi.string().required(),
        location: Joi.string().required(),
    }).required(),
});

module.exports.reviewValidationSchema = Joi.object({
    review: Joi.object({
        body: Joi.string().required(),
        rating: Joi.number().required().min(1).max(5),
    }).required(),
});
