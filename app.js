import fetch from 'node-fetch';
import express from 'express';
import cors from 'cors';


var app = express();
const port = 3000
const API = "https://dinosaur-facts-api.shultzlab.com/dinosaurs"
const ruta = express.Router();

app.use(cors()); 
app.use(express.json())
app.use(express.urlencoded({extended:true}))

const my_route = ruta.get("/:id", (req,res)=>{
    let id = req.params.id;
    fetch(`${API}`)
    .then(promesaFetch => promesaFetch.json())
    .then(contenido => {
        let dino_description = contenido[id]['Description']
        res.send({'Descripcion':dino_description})
    });
});

app.use("/dinos",my_route);
app.get('/', (req,res)=>{
    res.send({"message":"Microservicio de Dinosaurios"})
});

app.listen(port, function () {
    console.log(`Server running on port ${port}`)
  });