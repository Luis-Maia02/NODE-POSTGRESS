import pg from 'pg';
import promptSyncModule from 'prompt-sync';
const prompt = promptSyncModule();
const { Client } = pg;

const client = new Client({
    host:     'localhost',
    port:     5432,
    user:     'postgres',
    password: 'postgres',
    database: 'escola_db'
});

async function jogosPorGenero(){

    try{
        await client.connect();


        const genero = prompt("Digite o gênero do jogo: ");

        const jogosEncontrados = await client.query(
            'SELECT titulo, genero, nota, lancamento FROM jogos WHERE genero ILIKE $1 ORDER BY nota DESC',
            [genero]
        );

        if (jogosEncontrados.rowCount === 0) {
            console.log(`Nenhum jogo encontrado para o gênero: ${genero}`);
        }
        else
        {
            console.log ("Jogos do Gênero:", genero);

            jogosEncontrados.rows.forEach((jogo) => 
            {
                console.log(jogo.titulo, " - Gênero:", jogo.genero, " - Nota:", jogo.nota, " - Lançamento:", jogo.lancamento);
            });

            const mediaNota = await client.query(
                'SELECT AVG(nota) AS media FROM jogos WHERE genero ILIKE $1',
                [genero]
            ); 
            console.log("Média das notas dos jogos do gênero", genero, ":", mediaNota.rows[0].media); 

        }
    }
    catch (erro){console.log("❌ Ocorreu um erro:", erro.message);}
    
    finally{
        await client.end();
        console.log("🔌 Conexão encerrada!, até mais 👋")
    }
}

jogosPorGenero();