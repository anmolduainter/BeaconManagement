const beacons = require('./beaconsManagement/beacons')
const google = require('googleapis');
const proximitybeacon = google.proximitybeacon('v1beta1');
const express = require('express')
const auth = require('./Auth/auth')
const plus = google.plus('v1');
const Session = require('express-session')
const OAuth2 = google.auth.OAuth2;
const bp = require('body-parser')
const ListingBeacon = require('./routers/ListingBeacon')
const DeactivateBeacon = require('./routers/DeactivateBeacon')
const ActivateBeacon = require('./routers/ActivateBeacon')
const getInfoperBeacon = require('./routers/GettingInfo')
const setAttach = require('./routers/SetAttachment')
const deleteAttach = require('./routers/DeleteAttachments')
const register = require('./routers/RegBeacon')

const app =express()
app.use(bp.urlencoded({extended:true}))
app.use(bp.json());

const hbs = require('hbs')
hbs.registerHelper("active",function(status){
    if (status=="ACTIVE"){
        return true;
    }
    else{
        return false;
    }
})

app.set('view engine','hbs');
app.use(express.static(__dirname + '/public_files'));
app.use(Session({
    secret: 'Beacons',
    resave: true,
    saveUninitialized: true
}));

let oauth2Client = new OAuth2(
    auth.googleAuth.clientId,
    auth.googleAuth.clientSecret,
    auth.googleAuth.callbackUrl
);
let scopes = ['https://www.googleapis.com/auth/userlocation.beacon.registry',
                'email'];
let url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
});

app.get('/',(req,res)=>{
    res.render('index')
});


app.get('/auth/google/callback',(req,res)=>{
    console.log(req.query.code)
    let session = req.session
    let code = req.query.code
    oauth2Client.getToken(code, function (err, tokens) {
        console.log(tokens)
        if (!err) {
            oauth2Client.credentials = tokens;
            session["tokens"] = tokens
            plus.people.get({
                userId: 'me',
                auth: oauth2Client
            }, function (err, response) {
                console.log(response)
                res.redirect('/list')
//                res.render('index',{listingbeacon:true,loggedIn:true,user:{email:response.emails[0].value}})
            });
        }
        else{
            res.render('index')
        }
    });
});



//Login
app.get('/login',(req,res)=>{
    res.redirect(url)
});

//Logout
app.get('/logout',(req,res)=>{
    res.redirect('https://accounts.google.com/logout')
});

//Middlewares
app.use('/list',ListingBeacon)
app.use('/deactivate',DeactivateBeacon)
app.use('/activate' ,ActivateBeacon)
app.use('/getInfo',getInfoperBeacon)
app.use('/setAttach',setAttach)
app.use('/deleteAttach',deleteAttach)
app.use('/regBeacon',register)


app.listen(3000,()=>{
    console.log("Server Running")
});