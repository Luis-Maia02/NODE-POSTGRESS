import pg from 'pg';
const { Client } = pg;

const client = new Client({
    host:     'localhost',
    port:     5432,
    user:     'postgres',
    password: 'postgres',
    database: 'escola_db'
});

async function alunosAcimaDaMedia(){

    try{
        await client.connect();

        const mediaAlunos = await client.query('SELECT AVG(nota) AS media FROM alunos');
        console.log("Média geral da turma: ", mediaAlunos.rows[0].media);

        const alunosAcima = await client.query(
            'SELECT nome, nota FROM alunos WHERE nota > (SELECT AVG(nota) FROM alunos) ORDER BY nota DESC'
        );

        console.log("Alunos acima da média:");

        alunosAcima.rows.forEach((aluno) => {
            console.log(aluno.nome, " - Nota:", aluno.nota);
        });

        console.log(`${alunosAcima.rowCount} alunos acima da média`);

    }catch (erro){

        console.log("❌ Ocorreu um erro:", erro.message);

    }finally{
        await client.end();
        console.log("🔌 Conexão encerrada!, até mais 👋")
    }

}

alunosAcimaDaMedia();