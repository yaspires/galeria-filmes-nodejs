import Sequelize from "sequelize";
import connection from "../config/sequelize-config.js";

const Filme = connection.define("filmes", {
  file: {
    type: Sequelize.STRING,
    allownull: false,
  },
  titulo: {
    type: Sequelize.STRING,
    allownull: false,
  },
  ano: {
    type: Sequelize.INTEGER,
    allownull: false,
  }
});

Filme.sync({ force: false });
export default Filme;
