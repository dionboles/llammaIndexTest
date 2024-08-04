import express from "express";
import { query_engine } from "./main"
import morgan from "morgan";
import path from "path";
const app =  express()
async function queryValue(text:string) {
  const response = await (await query_engine()).query({ query: text });
  return response.message.content;
}
 
app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", express.static(path.join(__dirname, 'static')));


app.post('/api', async (req, res) => {
  console.log(req.body);
  return res.json(await queryValue(req.body.text));
})
 

const port = 3000;


app.listen(port,() => console.log(`Server is running on port http://localhost:${port}`));
