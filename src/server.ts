import express from "express";
import { PrismaClient } from "@prisma/client";
import { title } from "process";
import { release } from "os";

const port = 3000;
const app = express();
const prisma = new PrismaClient();

app.get("/movies", async (req, res) => {
  const movies = await prisma.movie.findMany({
    orderBy: {
      title: "asc",
    },
    include: {
      genres: true,
      languages: true,
    },
  });
  res.json(movies);
});

app.post("/movies", async (req, res) => {
  app.use(express.json());

  const { title, genre_id, language_id, oscar_count, release_date } = req.body;

  try {
    const movieWithSameTitle = await prisma.movie.findFirst({
      where: {title: {equals: title, mode: "insensitive"}},
    });

    if(movieWithSameTitle){
        return res.status(409)send({ message: "filme já cadastrado" });
    }

    await prisma.movie.create({
      data: {
        title,
        genre_id,
        language_id,
        oscar_count,
        release_date: new Date(release_date),
      },
    });
  } catch (error) {
    return res.status(500).send({ message: "falha ao cadastrar o filme" });
  }

  res.status(201).send();
});

app.put("/movies/:id", async (req, res) => {
// pegar o id do registro que vai ser atualizado: 
const id = Number (req.params.id);

try{
const movie = await prisma.movie.findUnique({
  where: {
    id
  }
})

if(!movie){
  return res.status(404).send({message: "filme não encontrado"})
}

const data = {...req.body};
data.release_date = data.release_date ? new Date(data.release_date) : undefined;
//pegar os dados do filme que será atualizado e atualizar ele no prisma
await prisma.movie.update({
    where: {
        id
    },
    data:{
        release_date: req.body.release_date
    }
})
}catch(error){
res.status(500).send({message: "Falha ao atualizar o registro do filme"})
};

//retornar o status correto informando que o filme foi atualizado com sucesso:
res.status(200).send();

app.delete('/mives/:id', async (req, res)=>{
  const id = Number(req.params.id)
    try{
const movie = await prisma.movie.findUnique({ where: {id}});

if (!movie){
  return res.status(404).send({ message: "O filme não foi encontrado!"})
}

  await prisma.movie.delete({ where: {id}});
    }catch(error){
return res.status(500).send({ message: "Não foi possível remover o filme!"})

    }
  res.status(200).send()
});

app.listen(port, () => {
  console.log(`servidor de exeção na porta ${port}`);
});
