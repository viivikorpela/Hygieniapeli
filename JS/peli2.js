//POHJAN JUTUT
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

//PELIN JUTUT

let draggedItem = null;
let score = 0;

localStorage.setItem("peli2_pisteet", 0);

const scoreDisplay = document.getElementById("score");
const answerArea = document.getElementById("answerArea");

const answers = [
    "Pesen kädet lämpimällä vedellä ja saippualla. Kuivaan huolellisesti.",
    "Yskin hihaan, jotta pöpöt eivät pääse leijumaan ilmaan. Pesen myös kädet!",
    "Niistän paperiin ja heitän sen roskikseen. Tämän jälkeen pesen kädet huolellisesti.",
    "Pesen hampaat hammasharjalla ja -tahnalla. Lankaan myös hampaiden välit!",
    "Käyn suihkussa. Pesen ihon saippualla. Suihkun jälkeen laitan tarvittaessa dödöä eli deodoranttia."
];

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

// ---- MOBILE TOUCH (VARMA RATKAISU) ----
let startX = 0;
let startY = 0;

box.addEventListener("touchstart", e => {
    const touch = e.touches[0];
    draggedItem = box;

    document.body.classList.add("no-scroll"); // 🔒 estä scroll

    const rect = box.getBoundingClientRect();
    startX = rect.left;
    startY = rect.top;

    box.style.position = "fixed";
    box.style.left = rect.left + "px";
    box.style.top = rect.top + "px";
    box.style.zIndex = 1000;
});

box.addEventListener("touchmove", e => {
    if (!draggedItem) return;

    const touch = e.touches[0];

    draggedItem.style.left =
        (touch.clientX - draggedItem.offsetWidth / 2) + "px";
    draggedItem.style.top =
        (touch.clientY - draggedItem.offsetHeight / 2) + "px";
});

box.addEventListener("touchend", e => {
    document.body.classList.remove("no-scroll"); // 🔓 vapauta scroll

    if (!draggedItem) return;

    const touch = e.changedTouches[0];
    let dropped = false;

    document.querySelectorAll(".dropzone").forEach(zone => {
        const rect = zone.getBoundingClientRect();

        if (
            touch.clientX >= rect.left &&
            touch.clientX <= rect.right &&
            touch.clientY >= rect.top &&
            touch.clientY <= rect.bottom
        ) {
            handleDrop(zone);
            dropped = true;
        }
    });

    if (!dropped) {
        draggedItem.style.left = startX + "px";
        draggedItem.style.top = startY + "px";
    }

    draggedItem = null;
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
        handleDrop(zone);
    });
});

function handleDrop(zone) {
    if (!draggedItem) return;
    if (zone.hasChildNodes()) return;

    zone.style.background = "#f0f7ff";
    zone.appendChild(draggedItem);

    draggedItem.style.position = "static";
    draggedItem.style.zIndex = "auto";

    const droppedValue = draggedItem.dataset.value;
    const correctValue = zone.parentElement.dataset.answer;

    if (droppedValue === correctValue) {
        score++;
        zone.style.borderColor = "green";
    } else {
        zone.style.borderColor = "red";
    }

    scoreDisplay.textContent = "Pisteet: " + score + "/5";
    localStorage.setItem("peli2_pisteet", score);
}
