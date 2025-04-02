const express = require('express')
const helmet = require('helmet')
const https = require('https')
const fs = require('fs')
require('dotenv').config()
const path = require('path');
const passport= require('passport')
const { Strategy } = require('passport-google-oauth20')


const app = express()

const config = {
    CLIENT_ID:process.env.CLIENT_ID,
    CLIENT_SECRET:process.env.CLIENT_SECRET
}

const AUTH_OPTIONS = {
    callbackURL:'/auth/google/callback',
    clientID:config.CLIENT_ID,
    clientSecret:config.CLIENT_SECRET
}

function verifyCallback(accessToken,refreshToken,profile,done){
    console.log('google profile',profile);
    done(null,profile)
}

passport.use(new Strategy(AUTH_OPTIONS,verifyCallback))

app.use(helmet())
app.use(passport.initialize())
app.use(express.static(path.join(__dirname, 'public')));

function checkLoggedIn(req,res,next) {
    const isLoggedIn = true 
    if(!isLoggedIn){
        return res.status(401).json({
            error:'You must logged in'
        });
    }
    next()
}

app.get('/auth/google',passport.authenticate('google',{
    scope:['email']
}))

app.get('/auth/google/callback',passport.authenticate('google',{
    failureRedirect:'/failure',
    successRedirect:'/',
    session:false
}))

app.get('auth/logout',(req,res)=>{})

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

app.get('/failure',(req,res)=>{
    res.send('failed to login')
})

app.get('/secret',checkLoggedIn,(req,res)=>{
    res.send('Hello from secret')
})
https.createServer({
    key:fs.readFileSync('key.pem'),
    cert:fs.readFileSync('cert.pem'),
},app).listen(3000)