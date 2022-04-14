const express = require('express')
const app = express()
const bodyParser = require('body-parser')


app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json())

const users= []


// Static Files
app.use(express.static('public'))

// Set Views
app.set('views', './views')
app.set("view engine", "ejs");



app.get('', (req, res) => {
    res.render('index', {text: 'This is EJS'})
})

app.get('/', (req, res) => {
    res.send(__dirname + '/views/index.ejs')
})

app.post('/login', (req, res) => {

    const user = {email: req.body.loginEmailField, password: req.body.loginPasswordField}

    console.log(users);

    const found = users.some(e => e.email === req.body.loginEmailField && e.password === req.body.loginPasswordField);
    console.log(found);
    

    if(!found) {
        res.setHeader('Content-type','text/html')
        res.render('index')
    }
    else {
        res.setHeader('Content-type','text/html')
        res.send('<h1>Welcome</h2>')
    }


})

app.post('/register', (req, res) => {
    const user = {email: req.body.registrationEmailField, password: req.body.registrationPasswordField}
    console.log(req.body)

    const found = users.some(e => e.email === req.body.registrationEmailField);
    if (!found) { 
        users.push({ email:user.email, password:user.password}); 
    }
    
    console.log(users)

    res.setHeader('Content-type','text/html')
    res.render('index')

    
})


app.listen(3000)