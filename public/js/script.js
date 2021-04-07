feather.replace();

function obterFrase() {
  var frase = new Array ();
  frase[0] = "&quotA cegueira também é isto, viver num mundo onde se tenha acabado a esperança.&quot &nbsp - Ensaio sobre a Cegueira - José Saramago";
  frase[1] = "&quot“Eles se tornavam parte daquele irreal mas penetrante e emocionante universo que é o mundo visto pelos olhos do amor.” &nbsp - Virginia Woolf";
  frase[2] = "&quotQuando os pés estão corretos, todo o resto nos acompanha.&quot &nbsp - O leão, a feiticeira e o guarda-roupa – C. S. Lewis ";
  frase[3] = "&quotPretender-se que a vida dos homens seja sempre dirigida pela razão é destruir toda a possibilidade de vida.&quot &nbsp - Guerra e Paz – Tolstoi";
  frase[4] = "&quotEnquanto eles não se conscientizarem, não serão rebeldes autênticos e, enquanto não se rebelarem, não têm como se conscientizar.&quot &nbsp - 1984 – George Orwell";
  frase[5] = "&quotNós aceitamos o amor que achamos que merecemos.&quot &nbsp - As vantagens de ser invisível – Stephen Chbosky";
  frase[6] = "&quotNão há nada como a respiração profunda depois de dar uma gargalhada. Nada no mundo se compara à barriga dolorida pelas razões certas.&quot &nbsp - As vantagens de ser invisível – Stephen Chbosky";
  frase[7] = "&quotAmor não é coisa que se possa pedir a alguém.&quot &nbsp - O Diário de Anne Frank – Anne Frank";
  frase[8] = "&quotHá coisas que são preciosas por não durarem.&quot &nbsp - O Retrato de Dorian Gray - Oscar Wilde";
  
   var i = Math.floor(9*Math.random());

   document.getElementById("sorte").innerHTML = frase[i]; 
 }



 function adicionar(){
  var novoElemento = document.getElementById("livro-lido").value;
   var lista_livro = document.getElementById("adicionar").innerHTML;
  lista_livro = `${lista_livro}<h5 <%- include ('../../../partials/lord')%>>${novoElemento}</h5>`;
   document.getElementById("adicionar").innerHTML = lista_livro;
 }
const ler = document.getElementById('ler');
const lendo = document.getElementById('lendo');
const lidos = document.getElementById('lidos');

const queroLer = Sortable.create(ler, {
  group:{
    name: "lista-ler",
    pull: true,
    put: true
  },
  animation: 150,
  filter: ".cabecalho",
  chosenClass: "active",
  store:{
    set: function(Sortable){
      const ordem = Sortable.toArray();
      localStorage.setItem('lista', ordem.join('|'));
    },
    get: function(){
      const ordem = localStorage.getItem('lista');
      return ordem ? ordem.split('|') : [];
    }
  }


});


Sortable.create(lendo, {
  group:{
    name: "lista-lendo",
    pull: true,
    put: true
  },
  animation: 150,
  filter: ".cabecalho",
  chosenClass:  "active"

});

const listaLivrosLidos = Sortable.create(lidos, {
  group:{
    name: "lista-lidos",
    pull: false,
    put: true
  },
  animation: 150,
  filter: ".cabecalho",
  chosenClass:  "active",
  
  

});