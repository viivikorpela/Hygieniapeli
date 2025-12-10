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

let score = 0;

/*korttien kääntölogiikka*/ 
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("cards");
  if (!container) return;

  const imgs = Array.from(container.querySelectorAll("img"));

  imgs.forEach((imgEl) => {
    
    const card = document.createElement("div");
    card.className = "card";

    const inner = document.createElement("div");
    inner.className = "card__inner";

    const front = document.createElement("div");
    front.className = "card__face card__face--front";

    const back = document.createElement("div");
    back.className = "card__face card__face--back";

    const text = document.createElement("div");
    text.className = "card__text";

    text.innerHTML = imgEl.getAttribute("data-back");  

    inner.appendChild(front);
    inner.appendChild(back);
    card.appendChild(inner);
    back.appendChild(text);

    container.replaceChild(card, imgEl); 

    imgEl.classList.add("card__img");
    front.appendChild(imgEl);

    const cardScore = Number(imgEl.getAttribute("data-score")) || 0;
    let counted = false;

    card.addEventListener("click", () => {
      const flipped = !card.classList.contains("is-flipped");
      card.classList.add("is-flipped");

      /*pisteiden lasku*/ 
      if (flipped && !counted) {
        score += cardScore;
        counted = true;

        const scoreEl = document.getElementById("score");
        if (scoreEl){
          scoreEl.textContent = "Pisteet: " + score + "/6";
        }

        localStorage.setItem("peli1_pisteet", score);
      }

    });
  });
});