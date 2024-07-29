const formatador = (data) => {                       //Utiliza uma biblioteca que esta no html. Função pra data
    return {
        dia: {
            numerico:dayjs(data).format('DD'),
            semana: { 
                curto:dayjs(data).format('ddd'),           //mostra so SEG de segunda
                longo:dayjs(data).format('dddd'),           // mostra a segunda, versão longa
            }
        },
        mes:dayjs(data).format('MMMM'),         //ficar por extenso o mes
        hora:dayjs(data).format('HH:mm')
    }
}

//OBJECT {}
const atividade = {
    nome: "Ir ao Mercado",
    data: new Date("2024-07-18 10:00"),
    finalizada: false
}

let atividades = [                                             //cria uma array com atividades
    atividade,
        {
            nome: "Jantar",
            data: new Date("2024-07-19 20:00"),
            finalizada: true 
        },
        {
            nome: "Dormir",
            data: new Date("2024-07-19 23:00"),
            finalizada: false 
        },
        {
            nome: "Acordar",
            data: new Date("2024-07-20 06:00"),
            finalizada: true
        },
]


criarItemDeAtividade = (atividade) => {     
    let input = '<input type="checkbox" '             //pega o input type checkbox (faz o quadradro que pode marcar)
    
    if(atividade.finalizada) {                       //se o finalizada for true na "atividade", input vai concatenar o input + "checked", que vai deixar 
        input = input + 'checked'                   // o input marcado, visto que ao alocar 'checked" do lado no imput ele fica sempre marco até atualizar a pagina
    }

    input = input + '>'                             // o ">" é pra concatenar a seta que fecha a tag input

    const formatar = formatador(atividade.data);

    return `<div>
                ${input} 
                <span>${atividade.nome}</span>                  
                <time datetime="">
                ${formatar.dia.semana.longo}, 
                dia ${formatar.dia.numerico}
                de ${formatar.mes}
                ás ${formatar.hora}h
                </time>
            </div>`
}


const attList = () => { 

const section = document.querySelector('section')               //cria uma const section, que vai encontrar a section dentro do html
section.innerHTML = ''
 if(atividade.length == 0) {                                        //se nao houver nenhuma atividade, vai emitir um P com essa mensagem
    section.innerHTML = '<p>Nenhuma atividade cadastrada</p>'
    return
 }

for(let atividade of atividades) {                              //le a "atividade"                
    section.innerHTML += criarItemDeAtividade(atividade)
}
 }

attList()


const salvarAtividade = (event) => {

    event.preventDefault()

    const dadosDoFormulario = new FormData(event.target)        //vai capturar o evento de subit la do form, e pega os dados atraves do target, agora temos que pegar os dados e jogar pras variaveis

    const nome = dadosDoFormulario.get('atividade')            //esse atividade se refere ao name utilizado no input do formulario
    const dia = dadosDoFormulario.get('dia')
    const hora = dadosDoFormulario.get('hora')
    const data = `${dia} ${hora}`

    const novaAtividade = {
        nome,
        data,
        finalizado: false

    }    

    atividades = [novaAtividade, ...atividades]                     //os 3 pontos são o comando "spread" pra concatenar uma nova atividade na lista de atividades

    attList()   //atualiza a lista de atividades

    event.target.reset(); // Limpa o formulário após adicionar a atividade
}

