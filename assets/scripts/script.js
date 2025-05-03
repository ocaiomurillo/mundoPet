const uploadBtn = document.getElementById("carregar");
const inputUpload = document.getElementById("imagem_upload")

uploadBtn.addEventListener("click", () => {
    inputUpload.click();
});

function lerConteudoDoArquivo(arquivo){
    return new Promise((resolve,reject) => {
        const leitor = new FileReader();
        leitor.onload = () => {
            resolve({ url: leitor.result, nome: arquivo.name })
        };
        
        leitor.onerror = () => {
            reject(`Erro na leitura do arquivo ${arquivo.name}`)
        };

        leitor.readAsDataURL(arquivo);
    });
};

const imagemPrincipal = document.querySelector(".imagem");
const nomeImagem = document.querySelector(".nome");

inputUpload.addEventListener("change", async (evento) => {
    const arquivo = evento.target.files[0];

    if (arquivo) {
        try{
            const conteudoDoArquivo = await lerConteudoDoArquivo(arquivo);
            imagemPrincipal.src = conteudoDoArquivo.url;
            nomeImagem.textContent = conteudoDoArquivo.nome;
        } catch(erro) {
            console.erro("Erro na leitura do arquivo!")
        };
    };
});

const inputTags = document.getElementById("hashtags");
const listaTags = document.querySelector(".lista__hashtags");

listaTags.addEventListener("click", (evento) => {
    if (evento.target.classList.contains("remove_tag")){
        const tagRemover = evento.target.parentElement;
        listaTags.removeChild(tagRemover);
    }
})

const tagsDisponiveis = ["Cachorro", "Gato", "Pássaro", "Peixe", "Roedor", "Réptil", "Adoção", "Filhotes", "Veterinário",
     "Alimentação", "Brinquedos", "Adestramento", "Cuidados", "Raças", "Saúde", "Banho", "Tosa", "Passeio", "Pet Friendly", 
     "Acessórios", "Fotos", "Vídeos", "Comportamento", "Dicas", "Emergência", "Exóticos", "Resgate", "Eventos", "Produtos", 
     "Hospedagem"];

async function verificaTagsDisponiveis(tagTexto) {
    return new Promise((resolve) => {
        setTimeout(()=> {
            resolve(tagsDisponiveis.includes(tagTexto));
        }, 1000)
    })
}

inputTags.addEventListener("keypress", async (evento) => {
    if(evento.key === "Enter") {
        evento.preventDefault();
        const tagTexto = inputTags.value.trim();
        if(tagTexto !== ""){
            try{
                const tagNova =  document.createElement("li");
                const tagExist = await verificaTagsDisponiveis(tagTexto);
                if (tagExist) {
                    tagNova.innerHTML = `<p>${tagTexto}</p><img src="./assets/svg/close.svg" class="remove_tag">`;
                    listaTags.appendChild(tagNova);
                    inputTags.value = "";
                } else {
                    alert("Tag não foi encontrada!")
                }
            } catch(erro) {
                console.error("Erro ao verificar existência da tag!")
                alert("Erro ao verificar a existência da tag!")
            }
        }
    }
})

const botaoPublicar = document.querySelector(".botao__publicar");

botaoPublicar.addEventListener("click", async (evento) => {
    evento.preventDefault();

    const tituloFoto = document.getElementById("titulo").value;
    const descricaoFoto = document.getElementById("descricao").value;
    const tags = Array.from(listaTags.querySelectorAll("p")).map((tag) => tag.textContent);
})

async function publicarFoto(tituloFoto, descricaoFoto, tags) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const deuCerto = Math.random() > 0.5;

            if (deuCerto) {
                resolve("Projeto publicado com sucesso.")
            } else {
                reject("Erro ao publicar o projeto.")
            }
        }, 2000)
    })
}