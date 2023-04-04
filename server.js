const express = require('express');
const sequelize = require('./config/connection');
const path = require('path');
const exphbs = require('express-handlebars');
const session = require('express-session');
const SequalizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
    secret: 'sessionsecret',
    cookie: { maxAge: 300000},
    resave: false,
    saveUniitialized: true,
    store: new SequalizeStore({
        db: sequelize
    })

};

// const hbs = exphbs.create({ helpers });
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`App is connected on PORT ${PORT}`))
});
