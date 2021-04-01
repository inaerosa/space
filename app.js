const express = require('express');
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

// rotas de usuário

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
     res.redirect ('/usuario/' + id);
 })

app.delete('/usuario/:id', async (req, res)=> {
    
     const {id} = req.params;
     await Usuario.findByIdAndDelete(id);
     res.redirect('/index');
 })


//rotas de metas

app.get('/usuario/:id/metas/index', async (req,res) =>{
    const {id} = req.params;
    const usuario = await Usuario.findById(id);
    res.render('usuario/metas/index', {usuario});
})

app.get('/usuario/:id/metas/new', async (req,res) =>{
    const {id} = req.params;
    const usuario = await Usuario.findById(id);
    res.render('usuario/metas/new', {usuario});
})

 app.put('/usuario/:id/metas', async (req, res) =>{
     const {id} = req.params;
     const {meta, lido} = req.body;
     const usuario = await Usuario.findByIdAndUpdate(id, {metas:{meta,lido}}, {runValidators: true, new:true} );
        res.render ('usuario/metas/index', {usuario});
})


//rotas de leituras

app.get('/usuario/:id/leituras/index', async (req,res) =>{
    const {id} = req.params;
    const usuario = await Usuario.findById(id);
    res.render('usuario/leituras/index', {usuario});
})

//rotas de anotações

app.get('/usuario/:id/anotacoes/index', async (req,res) =>{
    const {id} = req.params;
    const usuario = await Usuario.findById(id);
    res.render('usuario/anotacoes/index', {usuario});
})

app.get('/usuario/:id/anotacoes/show', async (req,res) =>{
    const {id} = req.params;
    const usuario = await Usuario.findById(id);
    res.render('usuario/anotacoes/show', {usuario});
})

app.get('/usuario/:id/anotacoes/new', async(req,res) =>{
    const {id} = req.params;
    const usuario = await Usuario.findById(id);
    res.render('usuario/anotacoes/new', {usuario});
})


app.put('/usuario/:id/anotacoes', async (req,res) =>{
    const {id} = req.params;
    const {autor, nome_livro, textarea} = req.body;

    const usuario = await Usuario.findByIdAndUpdate(id, {$push: {anotacoes:{autor,nome_livro, textarea}}}, {runValidators: true, new:true, safe: true, upsert: true} )
    await usuario.save();
    res.render ('usuario/anotacoes/index', {usuario});
})


app.get('/usuario/:id/anotacoes/:id_livro/show', async(req,res) =>{
    const {id} = req.params;
    const {id_livro} = req.params;
    const usuario = await Usuario.findById(id);
    
    console.log(id_livro);
    res.render('usuario/anotacoes/show', {usuario, id_livro});
})


app.listen(3000, ()=>{
    console.log('Servidor rodando');
})