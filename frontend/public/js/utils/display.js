import { logout } from "./../log.js";
import { displayLobby } from "./../lobby.js";

const renderNav = () => {
  const nav = document.querySelector("nav");
  nav.innerHTML = `
        <a class="brand" href="index.html"><img  src="./assets/images/harry-potter-logo.png"></a>
        <a id="lobby" href="lobby.html">Lobby</a>
        <a id="logout" href="#">Log Out</a>
    `;
  const logoutOpt = document.getElementById("logout");
  logoutOpt.addEventListener("click", () => {
    logout();
  });
};

const sayWelcome = (name, house) => {
  console.log(`Hello ${name}. You have been assigned to house ${house}`);
  const main = document.querySelector("main");
  let welcomeMsg;
  switch (house) {
    case "Hufflepuff":
      welcomeMsg = `
        <div class="house-sorting">
        <p class="sorted">Welcome to Hufflepuff, <span class="student hufflepuff">${name}!</span></p>
        <img class="house-crest" src="./assets/images/hufflepuff.png" alt="Hufflepuff House Crest">
        <p class="sorted">You have been chosen for your dedication, patience, and loyalty. Our house values hard work, fair play, and kindness above all. You are now part of a community that supports one another and values the bonds of friendship. Welcome to your new home, where everyone is valued and everyone belongs!</p>
        </div> `;
      break;

    case "Slytherin":
      welcomeMsg = `
        <div class="house-sorting">
          <p class="sorted">Welcome to Slytherin, <span class="student slytherin">${name}!</span></p>
          <img class="house-crest" src="./assets/images/slytherin.png" alt="Slytherin House Crest">
          <p class="sorted">You have been chosen for your ambition, cunning, and resourcefulness. Our house is known for producing leaders who are determined to achieve their goals. You are now part of a proud and powerful community that values determination and strategic thinking. Welcome to your new home, where greatness is forged and the path to success is clear!</p>
        </div>`;
      break;

    case "Ravenclaw":
      welcomeMsg = `
        <div class="house-sorting">
          <p class="sorted">Welcome to Ravenclaw, <span class="student ravenclaw">${name}</span> !</p> 
          <img class="house-crest" src="./assets/images/ravenclaw.png" alt="Ravenclaw House Crest">
          <p class="sorted">Our house values intelligence, creativity, and a love of learning. You have been selected for your wit, wisdom, and keen mind. Here, you will find a community of scholars and free thinkers who will inspire you to reach new intellectual heights. Welcome to your new home, where the pursuit of knowledge is endless and the mind is treasured!</p>
        </div>`;
      break;

    case "Gryffindor":
      welcomeMsg = `
        <div class="house-sorting">
          <p class="sorted">Welcome to Gryffindor, <span class="student gryffindor">${name}!</span></p>
          <img class="house-crest" src="./assets/images/gryffindor.png" alt="Gryffindor House Crest"> 
          <p class="sorted">
          Here, bravery and courage are celebrated above all else. You are now part of a house known for its daring, nerve, and chivalry. We are excited to see the bold adventures you will embark on and the brave deeds you will accomplish. Welcome to your new home, where the lion's heart beats strong!</p>
        </div>
        `;
      break;
  }
  main.innerHTML = welcomeMsg;
};

export { renderNav, sayWelcome };
