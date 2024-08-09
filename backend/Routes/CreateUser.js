const express = require('express');
const router = express.Router()
const User = require("../models/User")
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const jwtSecret = "ThisIsASecretCodeWhichIs35Charaters";



router.post("/createuser",
    [body('email').isEmail(),
    body('password', 'password should be more than 5 letters').isLength({ min: 5 }),
    body('name').isLength({ min: 3 })],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const salt = bcrypt.genSaltSync(10);
        let securedPass = bcrypt.hashSync(req.body.password, salt);

        try {
            await User.create({
                name: req.body.name,
                password: securedPass,
                email: req.body.email,
                location: req.body.location,
            }).then(res.json({ success: true }))

        } catch (err) {
            console.log(err);
            res.json({ success: false });
        }
    })


router.post("/loginuser",
    [body('email').isEmail(),
    body('password', 'password should be more than 5 letters').isLength({ min: 5 })], async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        let email = req.body.email;
        try {
            let userData = await User.findOne({ email });
            if (!userData) {
                return res.status(400).json({ errors: "Try logging with correct credentials" });
            }

            const pwdCompare = await bcrypt.compare(req.body.password,userData.password)
            if (!pwdCompare) {
                return res.status(400).json({ errors: "Try logging with correct credentials" });
            }

            const data = {
                user:{
                    id:userData.id,
                }
            };
            const authToken = jwt.sign(data,jwtSecret);
            return res.json({ success: true,authToken:authToken});
            const decode = jwt.verify(authToken, 'jwtSecret');
            console.log(decode);

        } catch (err) {
            console.log(err);
            res.json({ success: false });
        }
    })

module.exports = router;