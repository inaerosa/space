const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const mongoose= require('mongoose');
const Usuario = require('./models/usuario');
const Anotacao = require('./models/anotacao');
const Meta = require('./models/meta');



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

app.get('/usuario/:id', async (req,res) =>{
    const {id} = req.params;
    const usuario = await Usuario.findById(id);
    if (usuario) {
    res.render('usuario/show', {usuario});
    } else {
        res.send('perfil não encontrado');
    }
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

app.get('/usuario/:id/metas/index', async (req,res) =>{
    const {id} = req.params;
    const usuario = await Usuario.findById(id);
    const ja_li = req.body;
    const meta = req.body;
    res.render('usuario/metas/index', {ja_li, meta, usuario});
})

app.get('/usuario/:id/metas/new', async (req,res) =>{
    const {id} = req.params;
    const usuario = await Usuario.findById(id);
    res.render('usuario/metas/new', {usuario});
})

app.post('/usuario/:id/metas', async (req, res) =>{
    const {id} = req.params;
    const usuario = await Usuario.findById(id);
    const novaMeta = new Meta(req.body);
    await novaMeta.save();
    res.redirect('/usuario/:id/metas', {usuario});
})

app.get('/usuario/:id/leituras/index', async (req,res) =>{
    const {id} = req.params;
    const usuario = await Usuario.findById(id);
    res.render('usuario/leituras/index', {usuario});
})

app.get('/usuario/:id/anotacoes/index', async (req,res) =>{
    const {id} = req.params;
    const usuario = await Usuario.findById(id);
    res.render('usuario/anotacoes/index', {usuario});
})

app.get('/usuario/:id/anotacoes/new', async(req,res) =>{
    const {id} = req.params;
    const usuario = await Usuario.findById(id);
    res.render('usuario/anotacoes/new', {usuario});
})
app.post('/usuario/:id/anotacoes', async (req,res) =>{
    const {id} = req.params;
    const usuario = await Usuario.findById(id);
    const novaAnotacao = new Anotacao(req.body);
    await novaAnotacao.save();
    res.redirect('/usuario/:id/anotacoes/index', {usuario});
})
app.listen(3000, ()=>{
    console.log('Servidor rodando');
})
