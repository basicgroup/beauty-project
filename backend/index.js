import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import router from "./authRouter.js";
import path from "path";

const PORT = process.env.PORT || 3000;
const app = express();
const DB_url = "mongodb+srv://admin:admin@cluster0.1yybc16.mongodb.net/Product?retryWrites=true&w=majority";

app.use(cors());
app.use(express.json());
app.use('/auth',router)


app.get("/home",(req,res)=>{
  const __dirname = './ADMIN'
   app.use(express.static(path.resolve(__dirname, 'home')))
   res.sendFile(path.resolve(__dirname, 'home', 'home.html'))
})

app.use('/admin',router)

app.get('/admin',(req,res)=>{
  const __dirname = path.resolve()
   app.use(express.static(path.resolve(__dirname, 'ADMIN')))
   res.sendFile(path.resolve(__dirname, 'ADMIN',"index.html"))
})

async function startAPP() {
  try {
    mongoose
      .connect(DB_url, { useUnifiedTopology: true, useNewUrlParser: true })
      .then(() => console.log("DB is conected... "))
      .catch(() => console.log("DB is not conected see your Node"));
//       const __dirname = "..//"
// app.use(express.static(path.resolve(__dirname,"frontend")))
    app.listen(PORT, () => {
      console.log(`server starting on port... >  ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
}

startAPP();
