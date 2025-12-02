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
        