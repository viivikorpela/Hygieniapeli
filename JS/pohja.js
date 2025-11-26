const currentPage = window.location.pathname.split("/").pop();
        const links = document.querySelectorAll(".nav-item");

        links.forEach(link => {
            if (link.getAttribute("href") === currentPage) {
                link.classList.add("active");
            }
        });