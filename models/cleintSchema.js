const mongoose = require("mongoose");
const Joi = require("joi");

const userSchema = new mongoose.Schema(
  {
    clientName: {
      type: String,
      required: true,
    },
    nationalID: {
      type: Number,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    administrator: {
      type: String,
      required: true,
    },
    projValue: {
      type: Number,
      required: true,
    },
    paidPerMonth: {
      type: Number,
      required: true,
    },
    remain: {
      type: Number,
      required: true,
    },
    remainInMonth: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

// Joi validation schema
const validationSchema = Joi.object({
  _id: Joi.required(),
  clientName: Joi.string().min(3).required(),
  nationalID: Joi.number().min(2).required(),
  phone: Joi.number().min(5).required(),
  administrator: Joi.string().min(3).required(),
  projValue: Joi.number().required(),
  paidPerMonth: Joi.number().required(),
  remain: Joi.number().required(),
  remainInMonth: Joi.number().required(),
  createdAt: Joi.date(),
  updatedAt: Joi.date(),
});

// Mongoose pre-save hook for validation
userSchema.pre("save", function (next) {
  const validation = validationSchema.validate(this.toObject());
  if (validation.error) {
    const err = validation.error.details[0].message;

    return Promise.reject(
      "Validation Error: " + validation.error.details[0].message
    ); // Reject the Promise with the validation error
    // Handle validation error (throw an error or handle it based on your application logic)
    next(res.json({ err, status: "failed! " }));
  } else {
    // Validation successful, continue with the save operation
    next();
  }
});

module.exports = mongoose.model("Cleint", userSchema);
