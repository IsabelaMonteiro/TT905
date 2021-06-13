const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 80;

app.use(express.json());
app.use(cors());

const dados = [
    {
        nome:"Doctor Who",
        genero:"Ficção Cientifica, Aventura, Fantasia",
        duracao:"12 temporadas",
        sinopse:"Um extraterrestre conhecido como doutor viaja pelo tempo e espaço em sua nave espacial chamada TARDIS para proteger a terra e todo universo",
        nota:10,
        sugestao:"Harry Potter e a Câmara Secreta"
    },
    {
        nome:"Maravilhosa Senhora Maisel",
        genero:"Comédia e Drama",
        duracao:"26 episódios",
        sinopse:"Uma dona de casa dos anos 50 é surpreendida por uma traição de seu marido e vÊ seu casamento desmoronar junto com uma vida perfeitamente planejada. Ela descobre no stand-up um novo talento e uma forma de superar e supreender a todos",
        nota:10,
        sugestao:"Coisa mais linda "
    },

    {
        nome:"Atypical",
        genero:"Comédia",
        duracao:"26 episódios",
        sinopse:"Sam é um jovem autista que busca independência e uma forma de adaptar sua condição e seu jeito sincero em um mundo onde ser uma pessoa normal não é tão óbvio assim",
        nota:10,
        sugestao:"The good doctor"
    }
];

app.get('/series', (req, res) => {
    res.send(dados);
})

app.get('/series/:id', (req, res) => {
    const id = req.params.id;
    res.send(dados[id]);
})

app.post('/series', (req, res) => {
    const valores = req.body;
    if (valores.nome == null) {
        res.send({alerta:"Nome é um campo obrigatório"});
        return;
    }

    dados.push({
        nome: valores.nome,
        genero:valores.genero,
        duracao:valores.duracao,
        sinopse:valores.sinopse,
        nota:valores.nota,
        sugestao:valores.sugestao
    });
    res.send({alerta:"Registro Adicionado"});
})

app.put('/series/:id', (req, res) => {
    const valores = req.body;
    if (valores.nome == null) {
        res.send({alerta:"Nome é um campo obrigatório"});
        return;
    }

    const id = req.params.id;
    dados[id] = {
        nome: valores.nome,
        genero:valores.genero,
        duracao:valores.duracao,
        sinopse:valores.sinopse,
        nota:valores.nota,
        sugestao:valores.sugestao
    };
    res.send({alerta:"Registro Alterado"});
})

app.delete('/series/:id', (req, res) => {
    const id = req.params.id;
    dados.splice(id, 1);
    res.send({alerta:"Registro Excluido"});
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})

