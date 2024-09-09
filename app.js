
const express = require('express');
const expressHbs = require('express-handlebars');
const multer = require('multer');
const routes = require("./routes/index");
const backendRouter = require("./routes/backend/index")
const session = require("express-session")
const MySQLStore = require("express-mysql-session")(session);
const dbconfig = require("./connection/config");
const flash = require("connect-flash");
const helper = require("./helper/helper");

const app = express();

const hbs = expressHbs.create({
    extname: '.hbs',
    defaultLayout: 'main.hbs',
    layoutsDir: __dirname + '/views/layout',
    helpers: helper
})

const sessionStore = new MySQLStore(dbconfig)

const oneDay = 24 * 60 * 60 * 1000;
app.use(session({
    secret: "bises",
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: ({
        maxAge: oneDay *30
    })
}))

app.engine("hbs", hbs.engine)
app.set("view engine", "hbs")

// Middleware
app.use("/static", express.static(__dirname + '/public'));
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(flash())


// Routes
app.use("/", routes);
app.use("/backend", backendRouter)


// Start server
const port = process.env.PORT || 8848;
app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
})
