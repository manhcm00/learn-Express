const express = require('express')
const app = express()
const userRoute = require('./routes/user.route')
const port = 3001

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


app.set('view engine', 'pug')
app.set('views', './views')
app.use(express.static('public'))

app.get('/', (req, res) => res.render('index', {
    name: 'Micheal'
}))

app.get('/newsletter', (req, res) => {
    res.render('newsletter');
})

app.use('/user', userRoute)

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))