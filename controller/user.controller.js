const db = require('../db')
const shortid = require('shortid')

module.exports.index = (req, res) => res.render('Users/index', {
    users : db.get('users').value()
})

module.exports.search = (req, res) => {
    let q = req.query.q;
    let matchUsers = db.get('users').value().filter((user) => {
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1; 
    });
    res.render('Users/index', {
        users: matchUsers
    });
}

module.exports.create = (req, res) => {
    res.render('Users/create');
}

module.exports.view = (req, res) => {
    let id = req.params.id;
    let user = db.get('users').find({ id: id }).value();
    res.render('Users/view', {
        user: user
    })
}

module.exports.postCreate = (req, res) => {
    req.body.id = shortid.generate();
    req.body.avatar = req.file.path.split('\\').slice(1).join('\\');
    db.get('users').push(req.body).write();
    res.redirect('/user');
}


