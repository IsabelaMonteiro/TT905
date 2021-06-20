const express = require('express');
const mongodb = require('mongodb')
const cors = require('cors');
const app = express();
const port = process.env.PORT || 80;

app.use(express.json());
app.use(cors());

const password = process.env.PASSWORD || "T88NleCcdVnSyPtx";
console.log(password)
const connectionString = `mongodb+srv://bela:${password}@series.h0fx4.mongodb.net/tt905-series?retryWrites=true&w=majority`;
   

(async()=>{
    /* Connects to MongoDB */
    const client = await mongodb.MongoClient.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = client.db('tt905-series');
    const series = db.collection('series');
   
    app.get('/series', async (req, res) => {
        const todas_series = await series.find({}).toArray()
        res.send(todas_series);
    })

    app.get('/series/:id', async (req, res) => {
        const serie = await series.findOne({_id: mongodb.ObjectID(req.params.id)})
        res.send(serie);
    })

    app.post('/series', async (req, res) => {
        if (req.body.nome == null) {
            res.send({alerta:"Nome é um campo obrigatório"});
            return;
        }

        series.insertOne({
            nome: req.body.nome,
            genero: req.body.genero,
            duracao: req.body.duracao,
            sinopse: req.body.sinopse,
            nota: req.body.nota,
            sugestao: req.body.sugestao
        });

        res.send({alerta:"Registro Adicionado"});
    })

    app.put('/series/:id', async (req, res) => {
        if (req.body.nome == null) {
            res.send({alerta:"Nome é um campo obrigatório"});
            return;
        }

        await series.updateOne(
            {_id : mongodb.ObjectID(req.params.id)},
            {
                $set : {
                    nome: req.body.nome,
                    genero: req.body.genero,
                    duracao: req.body.duracao,
                    sinopse: req.body.sinopse,
                    nota: req.body.nota,
                    sugestao: req.body.sugestao
                }
            }
        );

        res.send({alerta:"Registro Alterado"});
    })

    app.delete('/series/:id', async (req, res) => {
        await series.deleteOne({_id : mongodb.ObjectID(req.params.id)});
        res.send({alerta:"Registro Excluido"});
    })

})();

app.listen(port, () => {
    console.log(`API em execução: http://localhost:${port}`);
})