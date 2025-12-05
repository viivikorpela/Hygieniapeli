//pohja:
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
        

//pisteet:
const peli1 = localStorage.getItem("peli1_pisteet") || 0;
const peli2 = localStorage.getItem("peli2_pisteet") || 0;

const summa = Number(peli1) + Number(peli2);

document.getElementById("kokonaispisteet").textContent =
  "Pisteet yhteensä: " + summa;