const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.status(200).json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const repository = { id: uuid(), title, url, techs, likes: 0 };

  repositories.push(repository);

  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const index = repositories.findIndex((repo) => repo.id === id);

  if (index < 0) {
    return response.status(400).json({ error: "Repository not found." });
  }

  const likes = repositories[index].likes;

  const repository = {
    id,
    title,
    url,
    techs,
    likes,
  };

  repositories[index] = repository;

  return response.json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const index = repositories.findIndex((repo) => repo.id === id);

  if (index < 0) {
    return response.status(400).json({ error: "Repository not found" });
  }

  projects.splice(index, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const index = repositories.findIndex((repo) => repo.id === id);

  if (index < 0) {
    return response.status(400).json({ error: "Repository not found." });
  }

  const { likes, title, url, techs } = repositories[index].likes;

  const newLikes = likes + 1;

  const repository = {
    id,
    title,
    url,
    techs,
    likes,
    newLikes,
  };

  repositories[index] = repository;

  return response.json(repository);
});

module.exports = app;
