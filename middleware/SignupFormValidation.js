const { check } = require("express-validator");


const signUpFormValidation = [
    check('name').notEmpty().withMessage("Name is required"),
    check('email').notEmpty().withMessage('Email is required').isEmail().normalizeEmail(),
    check('phone').notEmpty().withMessage('Phone number is required').isNumeric().withMessage('please enter valid number').isLength({min:10, max:10}).withMessage("please enter 10 digit number"),
    check('password')
    .notEmpty().withMessage("Password is required")
    .isLength({min: 5, max: 15}).withMessage('password must be 5-15 character long')
    .matches(/[A-Z]/).withMessage("Password must contain one uppercase")
    .matches(/[a-z]/).withMessage("Password must contain one lowercase")
    .matches(/[0-9]/).withMessage("Password must contain one digit")
    .matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage("Password must contain one symbol"),
]


module.exports = {
    signUpFormValidation,
}
