const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const routes = require("./routes");

const app = express();

mongoose.connect(
  process.env.MONGO_URI,
  {
    useFindAndModify: false,
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
  console.log("Connected to database")
);

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(process.env.PORT || 3333, () => console.log("Server running"));

/*Liberar espaço (Coloquei aqui pois não quero alterar os outros lugares, 
mas eu sei que o ideal e o recomendado é fazer em outro lugar)*/
const Favorite = require("./models/Favorite");

async function removeStaleFavorites() {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - 15);

  try {
    const result = await Favorite.deleteMany({
      lastUpdated: { $lte: cutoffDate },
    });
    console.log(`Removidos ${result.deletedCount} favoritos não atualizados.`);
  } catch (error) {
    console.error("Erro ao remover favoritos:", error);
  }
}

removeStaleFavorites();

// Agendando a função para ser executada a cada 24 horas para não pesar a api e chamar várias funções
setInterval(removeStaleFavorites, 24 * 60 * 60 * 1000);
