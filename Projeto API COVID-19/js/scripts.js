function exibirErro(mensagem) {
    let erro = document.getElementById('div-erro');
    erro.style.display = 'block';
    erro.innerHTML = '<b>Erro ao acessar a API:</b><br />' + mensagem;
}

async function carregarMapa() {

    let erro = document.getElementById('div-erro');
    let mp = document.getElementById('area-mapa');
    await fetch('https://covid19-brazil-api.vercel.app/api/report/v1/countries')
        .then(response => response.json())
        .then(dados => prepararDados(dados))
        .catch(e => exibirErro(e.mensage));
}

function prepararDados(dados) {
    paises = [
        ['pais', 'casos']
    ]
    for (let i = 0; i < dados['data'].length; i++) {
        paises.push(
            [dados['data'][i].country,
             dados['data'][i].confirmed]
             )
    }
    drawRegionsMap()
}
// 
var paises = [
    ['pais', 'casos'],
    ['0', 0]
]
// -------------------------------------------------------------------------------------------------------------------------------------------
google.charts.load('current', {
    'packages': ['geochart'],
});
google.charts.setOnLoadCallback(drawRegionsMap);

function drawRegionsMap() {
    var data = google.visualization.arrayToDataTable(paises);

    var options = {
        backgroundColor: '#81d4fa',
        colorAxis: { colors: ['red'] }
    };

    var chart = new google.visualization.GeoChart(document.getElementById('area-mapa'));

    chart.draw(data, options);
}

//----------------------------------------------------------------------------------------------------------------------------------------
function exibirErro(mensagem) {
    let erro = document.getElementById('div-erro');
    erro.style.display = 'block';
    erro.innerHTML = '<b>Erro ao acessar a API:</b><br />' + mensagem;
}

async function carregarGrafico() {

    let erro = document.getElementById('div-erro');
    erro.style.display = 'none';

    let titulo = document.getElementById('titulo');

    await fetch('https://covid19-brazil-api.vercel.app/api/report/v1/countries')
        .then(response => response.json())
        .then(dados => prepararDadosGrafico(dados))
        .catch(e => exibirErro(e.mensage));
        titulo.style.display = 'block';
}

function prepararDadosGrafico(dados) {
    pizza = [
        [ 'casos', 'total']    ]

    let confirmados = 0;
    let mortos = 0;
    let recuperados = 0;

    for (let i = 0; i < dados['data'].length; i++) {
        confirmados = confirmados+dados['data'][i].confirmed;

        mortos = mortos+dados['data'][i].deaths;
        recuperados = recuperados+dados['data'][i].recovered
    }
    pizza.push(['confirmados', confirmados])
    pizza.push(['mortos', mortos])
    pizza.push(['recuperados', recuperados])

    drawChart()
}
var pizza = [
    [ 'casos', 'total'],
    ['', 0 ]
]
//--------------------------------------------------------------------------------------------------------------------------------------
google.charts.load("current", {packages:["corechart"]});
      google.charts.setOnLoadCallback(drawChart);
      function drawChart() {
        var data = google.visualization.arrayToDataTable(pizza);

        var options = {
          is3D: true
        };

        var chart = new google.visualization.PieChart(document.getElementById('graficoPizza'));
        chart.draw(data, options);
      }

//-------------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------------

function exibirErro(mensagem) {
    const divErro = document.getElementById('div-erro');
    divErro.style.display = 'block';
    divErro.innerHTML = '<b>Erro ao acessar a API</b><br><br />' + mensagem;

}

async function carregarDados() {
    const divErro = document.getElementById('div-erro');
    divErro.style.display = 'none';

    let tabela = document.getElementById('tabela-dados');

    await fetch('https://covid19-brazil-api.vercel.app/api/report/v1')
        .then( response => response.json() )  
        .then( dados => prepararDadosTabela(dados) ) 
        .catch( e => exibirErro(e.message) );  
    tabela.style.display = 'block';
}

function prepararDadosTabela(dados) {
    let linhas = document.getElementById('linhas');
    linhas.innerHTML = '';

    for (let i=0; i<dados['data'].length; i++){
        let auxLinha = '';

        if (i %2 !=0)
            auxLinha = '<tr class="listra">';
        else
            auxLinha = '<tr>';

        auxLinha += '<td>' + dados ['data'][i].uf + '</td>' +
                    '<td>' + dados ['data'][i].state + '</td>' +
                    '<td>' + dados ['data'][i].cases + '</td>' +
                    '<td>' + dados ['data'][i].deaths + '</td>' +
                    '<td class = "mandrake">' + dados ['data'][i].suspects + '</td>' +
                    '<td class = "mandrake">' + dados ['data'][i].refuses + '</td>' +
                    '</tr>';

        linhas.innerHTML += auxLinha;

    }
}
