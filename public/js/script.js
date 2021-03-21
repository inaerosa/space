feather.replace();

const ler = document.getElementById('ler');
const lendo = document.getElementById('lendo');
const lidos = document.getElementById('lidos');

Sortable.create(ler, {
  group:{
    name: "lista-ler",
    pull: true,
    put: true
  },
  animation: 150,
  filter: "cabecalho",
  choseClass:  "active"

});

Sortable.create(lidos, {
  group:{
    name: "lista-lidos",
    pull: true,
    put: true
  },
  animation: 150,
  filter: ".cabecalho",
  choseClass:  "active"

});
Sortable.create(lendo, {
  group:{
    name: "lista-lendo",
    pull: true,
    put: true
  },
  animation: 150,
  filter: "cabecalho",
  choseClass:  "active"

});

