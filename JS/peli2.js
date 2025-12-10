// pohjan jutut:
const currentPage = window.location.pathname.split("/").pop();
        const links = document.querySelectorAll(".nav-item");

        links.forEach(link => {
            if (link.getAttribute("href") === currentPage) {
                link.classList.add("active");
            }
        });

document.addEventListener("DOMContentLoaded", () => {
    const burger = document.getElementById("burger");
    const navLinks = document.getElementById("navLinks");
        
    burger.addEventListener("click", () => {
        navLinks.classList.toggle("open");
    });
});

//pelin jutut:

let draggedItem = null;
let score = 0;

const scoreDisplay = document.getElementById("score");
const answerArea = document.getElementById("answerArea");

const answers = ["Pesen kädet lämpimällä vedellä ja saippualla. Kuivaan huolellisesti.", "Yskin hihaan, jotta pöpöt eivät pääse leijumaan ilmaan. Pesen myös kädet!", "Niistän paperiin ja heitän sen roskikseen. Tämän jälkeen pesen kädet huolellisesti.", "Pesen hampaat hammasharjalla ja -tahnalla. Lankaan myös hampaiden välit!", "Käyn suihkussa. Pesen ihon saippualla. Suihkun jälkeen laitan tarvittaessa dödöä eli deodoranttia."];

answers.sort(() => Math.random() - 0.5);

answers.forEach(text => {
    const box = document.createElement("div");
    box.classList.add("answer-box");
    box.setAttribute("draggable", "true");
    box.dataset.value = text;
    box.textContent = text;

    answerArea.appendChild(box);

    box.addEventListener("dragstart", e => {
        draggedItem = e.target;
    });
});

document.querySelectorAll(".dropzone").forEach(zone => {

    zone.addEventListener("dragover", e => {
        e.preventDefault();
        zone.style.background = "#e7fdf1";
    });

    zone.addEventListener("dragleave", () => {
        zone.style.background = "#f0f7ff";
    });

    zone.addEventListener("drop", e => {
        e.preventDefault();
        zone.style.background = "#f0f7ff";

        if (!draggedItem) return;

        const droppedValue = draggedItem.dataset.value;
        const correctValue = zone.parentElement.dataset.answer;

        // Estetään useampi vastaus samaan ruutuun
        if (zone.hasChildNodes()) return;

        zone.appendChild(draggedItem);

        if (droppedValue === correctValue) {
            score++;
            zone.style.borderColor = "green";
        } else {
            zone.style.borderColor = "red";
        }

        scoreDisplay.textContent = "Pisteet: " + score + "/5";
        localStorage.setItem("peli2_pisteet", score);
    });
});

