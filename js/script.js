const activitiesCard = document.querySelector(".activitiesCard");
const formInput = document.querySelector("#formInput");
const navGame = document.querySelector("#navGame");
const navLearning = document.querySelector("#navLearning");
const navExercice = document.querySelector("#navExercice");
const navAllTab = document.querySelector("#navAllTab");


const api = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: { "Content-Type": "application/json" },
});
const chargerActivites = async () => {
  try {const response = await api.get("/activites");
      console.log(response.data);
      let activites = response.data;
      affichageLivres(activites); 
      searshfucntion(activites)
      filter(activites)
  } catch (error) { console.error(error);
    return [];
  }
};
chargerActivites();

function affichageLivres(activites){

        activitiesCard.innerHTML = "";

        activites.forEach(activity => {
          
        activitiesCard.innerHTML  += `<div class="card" style="width: 18rem;">
                    <img src="assets/logo.png" class="card-img-top " alt="..." width="80" height="150">
                    <div class="card-body">
                        <h5 class="card-title">${activity.titre}</h5>
                        <p class="card-text">${activity.description}</p>
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Author: ${activity.auteur}</li>
                        <li class="list-group-item">Theme: ${activity.theme}</li>
                        <li class="list-group-item">Duration: ${activity.duree}</li>
                    </ul>
                    <div class="card-body d-flex gap-2">
                        <button class="btn btn-danger">Delete</button>
                        <button class="btn btn-primary">Modifier</button>
                    </div>
                </div>`
  });
}
// ============searsh=============

function searshfucntion(activites) {

  formInput.addEventListener("input", function () {
  // console.log(1);

    let searchValue = formInput.value.toLowerCase();

    let searshResult = activites.filter(activity =>{

    return activity.theme.toLowerCase().includes(searchValue);

         
  })
   
    affichageLivres(searshResult)
   
    
});

  
}
// ==============filter=========

function filter(activites) {

  navGame.addEventListener("click" , function (){
     navGame.classList.add('green')
     let gameTab = activites.filter(activity =>{
        return  activity.theme.toLowerCase() === "jeu" ;
     })
      affichageLivres(gameTab)
      
})
navLearning.addEventListener("click" , function (){
        let learningTab = activites.filter(activity =>{
              return  activity.theme.toLowerCase() === "apprentissage" ;
          })
            affichageLivres(learningTab)
})
navExercice.addEventListener("click" , function (){
      let exerciceTab = activites.filter(activity =>{
          return activity.theme.toLowerCase() === "Exercice"
      })
      affichageLivres(exerciceTab)

})
navAllTab.addEventListener("click" , function (){
     
      affichageLivres(activites)

})
}

