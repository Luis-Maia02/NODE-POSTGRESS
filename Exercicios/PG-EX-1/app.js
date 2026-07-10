import pg from 'pg';
const { Client } = pg;

const client = new Client({
    host:     'localhost',
    port:     5432,
    user:     'postgres',
    password: 'root',
    database: 'escola_db'
});

async function contagemAluno(){

    try{
        await client.connect();

        const totalAlunos = await client.query('SELECT COUNT(*) AS total FROM alunos');
        console.log("Total de alunos: ", totalAlunos.rows[0].total);

        const mediaAlunos = await client.query('SELECT AVG(nota) AS media FROM alunos');
        console.log("Média geral da turma: ", mediaAlunos.rows[0].media);

    }catch (erro){

        console.log("❌ Ocorreu um erro:", erro.message);

    }finally{
        await client.end();
        console.log("🔌 Conexão encerrada!, até mais 👋")
    }

}

contagemAluno();