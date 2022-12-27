const baseUrl = `https://api.github.com/users`
const baseHeader = {
    'Content-Type': 'aplication/json'
}


async function getPerfil(user) {

    try {
        const data = await fetch(`${baseUrl}/${user}`, {
            method: "GET",
            headers: baseHeader
        })
        const response = await data.json();
        const btnSearch = document.getElementById("btn-search");
        btnSearch.innerHTML = `<img src='./pages/assets/spinner.png' class='spinner'>`;
        const users = JSON.parse(localStorage.getItem("perfil"));
        if(data.status == 200) {
            if(!users) {
                let arrayUsers = [];
                arrayUsers.push(response);            
                localStorage.setItem("perfil", JSON.stringify(arrayUsers));
            } else {
                if(users.length >= 3) {
                    users.shift();
                }
                users.push(response);
                localStorage.setItem("perfil", JSON.stringify(users));
            }
            setTimeout(()=> {
                window.location.href = "/pages/profile";
            }, 3000)
        } else {
            localStorage.removeItem("perfil");
            const message = document.getElementById("message-error");
           
            setTimeout(()=> {
                btnSearch.innerHTML = "Ver perfil do github"; 
                message.classList.remove("hidden");
            }, 3000)
            
        }
        return response; 
    } catch (error) {
        
    }
    
}

function handleButton() {
    const input = document.getElementById("input");
    const btn = document.getElementById("btn-search");
    input.addEventListener("click", ()=> {
       input.addEventListener("keypress", ()=> {
            if(input.value.length != 0) {
                btn.disabled = false;
                btn.classList.remove("unactive")
                btn.classList.add("active");
            } else {
                btn.disabled = true;
                btn.classList.remove("active")
                btn.classList.add("unactive");
            }
       })
    })   
}

async function search() {
    const input = document.getElementById("input");
    const form = document.querySelector(".right");

    form.addEventListener("submit", async (e)=> {  
        e.preventDefault();   
        const user = input.value;
        await getPerfil(user);
    })
}

function renderUsersRecently() {
    const users = JSON.parse(localStorage.getItem("perfil"));
    const divRecently = document.getElementById("recently");

    users.forEach(user => {
        divRecently.innerHTML += `
            <img src="${user.avatar_url}" class="img-users-recently" alt="">
            <span class="recently-alert hidden">Acessar este perfil</span>
        `
        const img = document.querySelectorAll(".img-users-recently");

        
        console.log(divRecently);
        
        img.forEach(image => {
            /*
            image.addEventListener("mouseover", () => {
                const span = document.querySelector(".recently-alert");
                span.classList.remove("hidden");
            });

            image.addEventListener("mouseout", () => {
                const span = document.querySelector(".recently-alert");
                span.classList.add("hidden");
            })*/
          
            image.addEventListener("click", async (event) => {
         
            await getPerfil(user.login);
            })
        })
        
       
    });
}

handleButton();
search();
renderUsersRecently();
