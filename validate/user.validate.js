module.exports.postCreate = (req, res, next) => {
    let errors = [];
    if (!req.body.name) {
        errors.push('Name is empty');
    }
    if (!req.body.phone) {
        errors.push('Phone is empty');
    }
    if (errors.length) {
        res.render('Users/create', {
            errors: errors,
            values: req.body
        })
        return;
    }

    next();
};