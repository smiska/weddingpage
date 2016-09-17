// IMPORT ALL REQUIRED PACKAGES
var express               = require("express"),
    mongoose              = require("mongoose"),
    passport              = require("passport"),
    bodyParser            = require("body-parser"),
    User                  = require("./models/user"),
    passportLocal         = require("passport-local"),
    ejs                   = require("ejs");

// INITIALIZE EXPRESS AND MONGODB
mongoose.connect("mongodb://localhost/authdb");
var app = express();


// SET UP EXPRESS    
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.use(require("express-session")({
    secret: "I am going to work as a developer!",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new passportLocal(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// DEFINE BASIC ROUTES

app.get("/", function(req, res){
    res.render("home");
});

// secret page
app.get("/secret", isLoggedIn, function(req, res){
    res.render("secret");
});

// DEFINE AUTH ROUTES
// show sign up form
app.get("/register", function(req, res) {
    res.render("register");
});

// handling user sign up
app.post("/register", function(req, res) {
    User.register(new User({username: req.body.username}), req.body.password, function(err, user) {
        
        if (err){
            console.log(err);
            return res.render("register");
        }
        
        passport.authenticate("local")(req, res, function(){
            res.redirect("/secret");
        });
    });
});

// DEFINE LOGIN ROUTES
// render login form
app.get("/login", function(req, res) {
    res.render("login");
});

// login logic
app.post("/login", passport.authenticate("local", {
        successRedirect: "/secret",
        failureRedirect: "login"
    }), function(req, res){
});

// DEFINE LOGOUT ROUTES
app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
});

// CHECK IF USER IS LOGGED IN - MIDDLEWARE
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

app.get("*", function(req, res){
    res.render("404");
});

// START UP SERVER
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Application server has started");
});

