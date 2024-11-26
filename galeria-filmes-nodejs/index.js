import express from "express";
import multer from "multer"
import connection from "./config/sequelize-config.js";
import Galeria from "./models/Galeria.js"

// Realizando a conexão com o banco de dados
connection
  .authenticate()
  .then(() => {
    console.log("Conexão com o banco de dados feita com sucesso!");
  })
  .catch((error) => {
    console.log(error);
  });

// Criando o banco de dados s eele não existir
connection
  .query(`CREATE DATABASE IF NOT EXISTS galeriafilme;`)
  .then(() => {
    console.log("O banco de dados foi criado com sucesso");
  })
  .catch((error) => {
    console.log(error);
  });

const app = express()
const upload = multer({ dest: "public/uploads/" })

app.use(express.static("public"))
app.set("view engine", "ejs")

// Rota principal
app.get("/", (req, res) => {
    Galeria.findAll(). then(imagens=> {
      res.render("index", {
        imagens:imagens,
      });
    })
  });

// Rota de upload
app.post("/cadastro", upload.single("file"), (req, res) => {
    const file = req.file.filename
    const titulo = req.body.titulo
    const ano = req.body.ano
    Galeria.create({
      file:file,
      titulo:titulo,
      ano:ano,
    })
    res.redirect("/");
  });

const port = 4040;
app.listen(port, (error) => {
  if (error) {
    console.log(`Ocorreu um erro! ${error}`);
  } else {
    console.log(`servidor iniciado com sucesso em: http://localhost:${port}`);
  }
});