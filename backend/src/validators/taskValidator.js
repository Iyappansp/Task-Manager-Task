const Joi = require('joi');

const createTaskSchema = Joi.object({
  title: Joi.string().min(1).max(200).required().messages({
    'string.empty': 'Title is required',
    'any.required': 'Title is required',
  }),
  description: Joi.string().max(1000).allow('').optional(),
  status: Joi.string().valid('pending', 'in-progress', 'completed').optional(),
  priority: Joi.string().valid('low', 'medium', 'high').optional(),
  dueDate: Joi.date().iso().optional().allow(null),
});

const updateTaskSchema = Joi.object({
  title: Joi.string().min(1).max(200).optional(),
  description: Joi.string().max(1000).allow('').optional(),
  status: Joi.string().valid('pending', 'in-progress', 'completed').optional(),
  priority: Joi.string().valid('low', 'medium', 'high').optional(),
  dueDate: Joi.date().iso().optional().allow(null),
}).min(1).messages({
  'object.min': 'At least one field must be provided for update',
});

module.exports = {
  createTaskSchema,
  updateTaskSchema,
};
