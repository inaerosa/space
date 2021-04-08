const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const mongoose= require('mongoose');
const Usuario = require('./models/usuario');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');



mongoose.connect('mongodb://localhost:27017/dbSpace', {useNewUrlParser: true, useUnifiedTopology: true})
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

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(session({secret: 'meu_segredo...', resave: false, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(Usuario.authenticate()));
passport.serializeUser(Usuario.serializeUser());
passport.deserializeUser(Usuario.deserializeUser());


app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(Usuario.authenticate()));

app.use((req, res, next) =>{
    res.locals.currentUser = req.user;
    next();
})

const isLoggedIn = (req, res, next) =>{
    if(req.isAuthenticated()){
        return next();
    }
    req.session.returnTo = req.originalUrl;
    res.redirect("login");
}

app.get('/', (req,res) =>{
    res.render('index');
});

 app.get('/login', (req,res) =>{
     res.render('login');
 })
 

app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
})

app.post('/login',
  passport.authenticate('local', { successRedirect: '/usuario',
                                   failureRedirect: '/login', })
);
// rotas de usuário

app.get ('/usuario/new', (req, res) =>{
    res.render ("usuario/new");
})

app.get('/usuario' , isLoggedIn, async (req, res) =>{
    const id = req.user;
    const usuario = await Usuario.findById(id);
    res.render('usuario/show', {usuario});
})

app.post('/usuario', async (req,res) =>{
    try {
        const {nome, username, password, email} = req.body;
        const usuario = new Usuario ({nome, username, email});
        const usuarioRegistrado = await Usuario.register(usuario, password);
        console.log(usuarioRegistrado, err =>{
            if (err) return next(err);
        })
    } catch (e){
        console.log(e);
    }
    res.redirect('/login');
})





app.get('/usuario/:id/edit', isLoggedIn, async(req,res)=>{
    const {id} = req.params;
    const usuario = await Usuario.findById(id);
    res.render ('usuario/edit', {usuario});
})

 app.put('/usuario/:id', isLoggedIn, async(req,res)=>{
     const {id} = req.params;
     await Usuario.findByIdAndUpdate(id, req.body, {runValidators: true, new:true, safe: true, upsert: true});
     res.redirect ('/usuario');
 })

app.delete('/usuario/:id',  isLoggedIn, async (req, res)=> {
     const {id} = req.params;
     await Usuario.findByIdAndDelete(id);
     res.redirect('/');
 })



//rotas de metas

app.get('/usuario/:id/metas/index',  isLoggedIn,  async (req,res) =>{
    const {id} = req.params;
    const usuario = await Usuario.findById(id);
    res.render('usuario/metas/index', {usuario});
})

app.get('/usuario/:id/metas/new', isLoggedIn, async (req,res) =>{
    const {id} = req.params;
    const usuario = await Usuario.findById(id);
    res.render('usuario/metas/new', {usuario});
})

 app.put('/usuario/:id/metas', isLoggedIn,async (req, res) =>{
     const {id} = req.params;
     const {meta, lido} = req.body;
     const usuario = await Usuario.findByIdAndUpdate(id, {metas:{meta,lido}}, {runValidators: true, new:true} );
        res.render ('usuario/metas/index', {usuario});
})

//rotas de anotações

app.get('/usuario/:id/anotacoes/index', isLoggedIn,  async (req,res) =>{
    const {id} = req.params;
    const usuario = await Usuario.findById(id);
    res.render('usuario/anotacoes/index', {usuario});
})


app.get('/usuario/:id/anotacoes/new', isLoggedIn, async(req,res) =>{
    const {id} = req.params;
    const usuario = await Usuario.findById(id);
    res.render('usuario/anotacoes/new', {usuario});
})


app.put('/usuario/:id/anotacoes',  isLoggedIn, async (req,res) =>{
    const {id} = req.params;
    const {autor, nome_livro, textarea} = req.body;

    const usuario = await Usuario.findByIdAndUpdate(id, {$push: {anotacoes:{autor,nome_livro, textarea}}}, {runValidators: true, new:true, safe: true, upsert: true} )
    await usuario.save();
    res.render ('usuario/anotacoes/index', {usuario});
})


app.get('/usuario/:id/anotacoes/:id_livro/show',  isLoggedIn, async(req,res) =>{
    const {id} = req.params;
    const {id_livro} = req.params;
    const usuario = await Usuario.findById(id);
    const anotacoes = usuario.anotacoes;
    
    for (i =0; i < anotacoes.length; i++){
        if (anotacoes[i]._id == id_livro){
            const livro = anotacoes[i];
            res.render('usuario/anotacoes/show', {usuario, livro});
        } 
    }
})

 app.put('/usuario/:id/anotacoes/:id_livro', isLoggedIn, async (req, res) => {
    const {id} = req.params;
    const {id_livro} = req.params;

    const usuario = await Usuario.findByIdAndUpdate(id,
        {$pull: {anotacoes: {_id: id_livro}}},
        {runValidators: true, new:true, safe: true, upsert: true},
        function(err) {
            if(err){
            console.log(err);
            }else{
                res.redirect('/usuario/'+id+'/anotacoes/index');
            }
        }
    
    );
    console.log(usuario);
        

 });
 
app.listen(3000, ()=>{
    console.log('Servidor rodando');
})