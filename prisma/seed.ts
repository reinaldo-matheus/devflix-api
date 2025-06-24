import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  // 1. Inserir os gêneros
  await prisma.genre.createMany({
    data: [
      { name: 'Drama' },         
      { name: 'Biografia' },     
      { name: 'Histórico' },     
      { name: 'Ficção' },        
      { name: 'Suspense' },      
      { name: 'Comédia' },       
      { name: 'Romance' }        
    ],
    skipDuplicates: true
  })

  // 2. Inserir os idiomas
  await prisma.language.createMany({
    data: [
      { name: 'Inglês' },        // id: 1
      { name: 'Coreano' },       // id: 2
      { name: 'Português' },     // id: 3
      { name: 'Francês' },       // id: 4
      { name: 'Alemão' }         // id: 5
    ],
    skipDuplicates: true
  })

  // 3. Inserir os filmes
  await prisma.movie.createMany({
    data: [
      { title: 'A grande aposta', release_date: new Date('2016-01-14'), genre_id: 3, language_id: 5, oscar_count: 10 },
      { title: 'A rede social', release_date: new Date('2010-12-03'), genre_id: 5, language_id: 2, oscar_count: 1 },
      { title: 'A grande aposta', release_date: new Date('2016-01-14'), genre_id: 1, language_id: 2, oscar_count: null },
      { title: 'Parasita', release_date: new Date('2019-05-30'), genre_id: 5, language_id: 2, oscar_count: null },
      { title: 'Uma mente brilhante', release_date: new Date('2002-02-15'), genre_id: 3, language_id: 2, oscar_count: null },
      { title: 'O jogo da imitação', release_date: new Date('2014-09-28'), genre_id: 3, language_id: 2, oscar_count: null },
      { title: 'Gênio indomável', release_date: new Date('1998-02-20'), genre_id: 1, language_id: 2, oscar_count: null },
      { title: 'Cisne negro', release_date: new Date('2011-02-04'), genre_id: 5, language_id: 2, oscar_count: 1 },
      { title: 'Duna', release_date: new Date('2021-10-21'), genre_id: 1, language_id: 2, oscar_count: null },
      { title: 'Turma da mônica: lições', release_date: new Date('2021-12-30'), genre_id: 3, language_id: 1, oscar_count: null },
      { title: 'Minha mãe é uma peça 3', release_date: new Date('2019-12-26'), genre_id: 6, language_id: 1, oscar_count: null },
      { title: 'High Life', release_date: new Date('2018-11-07'), genre_id: 1, language_id: 5, oscar_count: null },
      { title: 'Mademoiselle vingança', release_date: new Date('2018-09-12'), genre_id: 7, language_id: 5, oscar_count: 1 }
    ]
  })
}

main()
  .then(() => {
    console.log('✅ Dados inseridos com sucesso!')
    return prisma.$disconnect()
  })
  .catch((err) => {
    console.error(err)
    return prisma.$disconnect()
  })
