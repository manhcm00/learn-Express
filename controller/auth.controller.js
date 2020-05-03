const md5 = require('md5')

const db = require('../db')

module.exports.login = (req, res) => res.render('auth/login', {
    users : db.get('users').value(),
    csrfToken: req.csrfToken()
})

module.exports.postLogin = (req, res) => {
    let email = req.body.email;

    let user = db.get('users').find({ email: email} ).value();
    console.log(user.id);

    if (!user) {
        res.render('auth/login', {
            errors: [
                'User does not exist'
            ],
            values: req.body 
        });
        return;
    }

    let password = md5(req.body.password);
    if (user.password !== password) {
        res.render('auth/login', {
            errors: [
                'Wrong password.'
            ],
            values: req.body,
        });
        return;
    }
    res.cookie('userId', user.id, {
        signed: true
    });
    res.redirect('/user');
}