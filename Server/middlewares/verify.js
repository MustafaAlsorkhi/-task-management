// require("dotenv").config();

// const jwt = require('jsonwebtoken');

// function verifyJWT(req, res, next) {
//   const token = req.headers.authorization;

//   if (!token) {
//     return res.status(401).json({ error: 'Unauthorized - Token not provided' });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.SECRET_KEY);
//     req.user = decoded;
//     next();
//   } catch (error) {
//     return res.status(401).json({ error: 'Unauthorized - Invalid token' });
//   }
// }

// module.exports = {
//   verifyJWT,
// };

// const express = require('express');
// const app = express();
const jwt = require('jsonwebtoken');
// const Cookies = require('js-cookie');
// const cookieParser = require('cookie-parser');
require('dotenv').config();
// app.use(cookieParser());

async function authorize(req, res, next){
    try{
        const tokenCookie = req.headers.cookie;
        // const token = req.headers['authorization'];
        if (tokenCookie) {
            const cookiesArray = tokenCookie.split(';');
            const accessTokenCookie = cookiesArray.find(cookie => cookie.trim().startsWith('accessToken='));
            if (accessTokenCookie) {
                const accessToken = accessTokenCookie.split('=')[1].trim();
                console.log(accessToken);
                const user = jwt.verify(accessToken, process.env.SECRET_KEY);
                console.log(user)
                if(user.id){
                    req.user = user;
                    next();
                }else{
                    res.status(401).json("unauthorized");
                }
                console.log(user);
            }
        }else {
            res.status(401).json("you need to login first");
        }
    }catch(error){
        res.status(400).json(error);
    }
};

module.exports = {
    authorize
};