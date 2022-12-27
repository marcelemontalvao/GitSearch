const perfil = JSON.parse(localStorage.getItem("perfil"));
const perfilParse = perfil[perfil.length - 1];
console.log(perfilParse);
const baseUrl = `https://api.github.com/users`
const baseHeader = {
    'Content-Type': 'aplication/json'
}

async function getAllRepos(user) {
    
    try {
        const data = await fetch(`${baseUrl}/${user}/repos`, {
            method: "GET",
            headers: baseHeader
        })
        const response = await data.json();
        return response;

    } catch (error) {
    }   
}

function createPerfil(object) {
    const divPerfil = document.createElement("div");
    divPerfil.classList.add("perfil");
    
    const imagePerfil = document.createElement("img");
    imagePerfil.src = object.avatar_url;
    
    const divPerfilInfos = document.createElement("div");
    divPerfilInfos.classList.add("perfil-infos");

    const namePerfil = document.createElement("span");
    namePerfil.classList.add("name");
    namePerfil.innerText = object.name;
    
    const job = document.createElement("span");
    job.classList.add("job");
    job.innerText = object.bio;
    
    const divBtnsHeader = document.createElement("div");
    divBtnsHeader.classList.add("btns-header");
    
    const btnEmail = document.createElement("button");
    btnEmail.innerText = "Email";
    
    const btnChangeUser = document.createElement("button");
    btnChangeUser.innerText = "Trocar de usuário";

    btnChangeUser.addEventListener("click", ()=> {
        window.location.href = "../../index.html";
    });

    divBtnsHeader.append(btnEmail, btnChangeUser);

    divPerfilInfos.append(namePerfil, job);

    divPerfil.append(imagePerfil, divPerfilInfos);

    return {divPerfil, divBtnsHeader};

}

renderPerfil(perfilParse);

function renderPerfil(object) {
    const title = document.querySelector("title")
    title.innerText = object.name;
    const header = document.querySelector("header")
    header.innerHTML = "";
    const {divPerfil, divBtnsHeader} = createPerfil(object)
    header.append(divPerfil, divBtnsHeader);
}

async function createLi() {
    const ulCards = document.querySelector(".cards");
    const data = await getAllRepos(perfilParse.login);

    data.forEach(elt => {
        const li = document.createElement("li");
        li.classList.add("card");
        
        const divCardInfos = document.createElement("div");
        divCardInfos.classList.add("card-infos");
        
        const nameRepository = document.createElement("span");
        nameRepository.classList.add("name-repository");
        nameRepository.innerText = elt.name;
        
        const description = document.createElement("span");
        description.classList.add("description");
        description.innerText = elt.description;
        
        const divBtns = document.createElement("div");
        divBtns.classList.add("btns-repository");
        const btnRepository = document.createElement("button");
        btnRepository.innerText = "Repositório";
        const btnDemo = document.createElement("button");
        btnDemo.innerText = "Demo";

        divBtns.append(btnRepository, btnDemo);
        divCardInfos.append(nameRepository, description, divBtns);
        li.append(divCardInfos);
        ulCards.appendChild(li);
    });
}

createLi();