const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');

app.use(express.urlencoded({econst express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const mongoose= require('mongoose');
const Usuario = require('./models/usuario');


mongoose.connect('mongodb://localhost:27017/dbUsuarios', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() =>{
    console.log("Conexao com o banco estabelecida");
})
.catch(err =>{
    console.log("erro ao conectar com o banco....");
    console.log(err);
})

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

app.get ('/usuario/new', (req, res) =>{
    res.render ("usuario/new");
})

//app.get('/usuario/:id', async (req,res) =>{
//    const {id} = req.params;
//    const usuario = await Usuario.findById(id);
//    if (usuario) {
//    res.render('usuario/show', {usuario});
//    } else {
//        res.send('perfil não encontrado');
//    }
//})

app.get('/usuario/show', (req,res) =>{
    res.render('usuario/show');
})

app.post('/usuario', async (req,res) =>{
    const novoUsuario = new Usuario(req.body);
    await novoUsuario.save();
    res.redirect('/usuario');
})

app.get('/usuario/:id/edit', async(req,res)=>{
    const {id} = req.params;
    const usuario = await Usuario.findById(id);
    res.render ('usuario/edit', {usuario});
})

app.put('/usuario/:id', async(req,res)=>{
    const {id} = req.params;
    await Usuario.findByIdAndUpdate(id, req.body, {runValidators: true});
    res.render ('/usuario/' + id);
})

app.get('/usuario/metas/index', (req,res) =>{
    const ja_li = req.body;
    const meta = req.body;
    res.render('usuario/metas/index', {ja_li, meta});
})

app.get('/usuario/leituras/index', (req,res) =>{
    res.render('usuario/leituras/index');
})

app.get('/usuario/anotacoes/index', (req,res) =>{
    res.render('usuario/anotacoes/index');
})


app.listen(3000, ()=>{
    console.log('Servidor rodando');
})xtended: true}))
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

app.get('/usuario/anotacoes/const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const mongoose= require('mongoose');
const Usuario = require('./models/usuario');


mongoose.connect('mongodb://localhost:27017/dbUsuarios', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() =>{
    console.log("Conexao com o banco estabelecida");
})
.catch(err =>{
    console.log("erro ao conectar com o banco....");
    console.log(err);
})

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

app.get ('/usuario/new', (req, res) =>{
    res.render ("usuario/new");
})

//app.get('/usuario/:id', async (req,res) =>{
//    const {id} = req.params;
//    const usuario = await Usuario.findById(id);
//    if (usuario) {
//    res.render('usuario/show', {usuario});
//    } else {
//        res.send('perfil não encontrado');
//    }
//})

app.get('/usuario/show', (req,res) =>{
    res.render('usuario/show');
})

app.post('/usuario', async (req,res) =>{
    const novoUsuario = new Usuario(req.body);
    await novoUsuario.save();
    res.redirect('/usuario');
})

app.get('/usuario/:id/edit', async(req,res)=>{
    const {id} = req.params;
    const usuario = await Usuario.findById(id);
    res.render ('usuario/edit', {usuario});
})

app.put('/usuario/:id', async(req,res)=>{
    const {id} = req.params;
    await Usuario.findByIdAndUpdate(id, req.body, {runValidators: true});
    res.render ('/usuario/' + id);
})

app.get('/usuario/metas/index', (req,res) =>{
    const ja_li = req.body;
    const meta = req.body;
    res.render('usuario/metas/index', {ja_li, meta});
})

app.get('/usuario/leituras/index', (req,res) =>{
    res.render('usuario/leituras/index');
})

app.get('/usuario/anotacoes/index', (req,res) =>{
    res.render('usuario/anotacoes/index');
})


app.listen(3000, ()=>{
    console.log('Servidor rodando');
})index', (req,res) =>{
    res.render('usuario/anotacoes/index');
})


app.listen(3000, ()=>{
    console.log('Servidor rodando');
})
