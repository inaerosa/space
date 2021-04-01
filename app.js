const express = require('express');
const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/mostraDadosGet', (req, res) => {
    const {nome, sobrenome} = req.query;
    res.render('mostraDadosGet', {nome, sobrenome});
});

app.post('/mostraDadosPost', (req, res) => {
    const {nome, sobrenome} = req.body;
    res.render('mostraDadosPost', {nome, sobrenome});
});

app.listen(3000, () => {
    console.log("Servidor ligado na porta 3000!");
});