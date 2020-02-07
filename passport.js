const bcrpyt = require(bycrpt-nodejs)
const localStrategy = require(passport-local)
const db = require("./database")

passport.serializeUser((user, done) => {
    done(null, user.id)
})  

passport.deserializeUser((id, done) => {
    db.query("SELECT * FROM user WHERE id = ? ", [id], (err, rows) => {
        done(err, rows[0])
    });
});

passport.use(new localStrategy)(
    (username, password, done) => {
        db.query("select * from users where username = " + username, (err, rows) => {
            done(err, rows[0])
            console.log(rows)
        })
    }
)



