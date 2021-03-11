const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');

app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req,res) =>{
    res.render('index');
});

app.get('/login', (req,res) =>{
    res.render('login.ejs');
})

app.get ('/usuario/create', (req, res) =>{
    res.render ("usuario/create");
})

app.get('/usuario/show', (req,res) =>{
    res.render('usuario/show');
})

app.get('/usuario/metas/index', (req,res) =>{
    res.render('usuario/metas/index');
})

app.get('/usuario/leituras/index', (req,res) =>{
    res.render('usuario/leituras/index');
})

app.get('/usuario/anotacoes/index', (req,res) =>{
    res.render('usuario/anotacoes/index');
})


app.listen(3000, ()=>{
    console.log('Servidor rodando');
})