import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import env from "dotenv";
import { Configuration, OpenAIApi } from "openai";

const app = express();

env.config();

app.use(cors());
app.use(bodyParser.json());

const configuration = new Configuration({
  organization: "org-LhR1oMLyK0sEWsYM1aGAFn9d",
  apiKey: process.env.API_KEY,
});
const openai = new OpenAIApi(configuration);

app.listen("8000", () => console.log("listening on port 8000"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/", async (req, res) => {
  const { message } = req.body;

  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${message}`,
      max_tokens: 100,
      temperature: 0.5,
    });

    res.send(response.data.choices[0].text.replace(/\n/g, ""));
  } catch (e) {
    console.log(e);
    res.send(e).status(400);
  }
});
