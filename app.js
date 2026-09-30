const offers = [
  {
    title: "Free rewards account",
    cat: "Rewards",
    desc: "Create a free account and check the provider's current signup rewards and terms.",
    meta: "No purchase required to browse",
    url: "#"
  },
  {
    title: "Digital coupons",
    cat: "Coupons",
    desc: "Look for digital coupons that can reduce the price of everyday purchases.",
    meta: "Terms vary by store",
    url: "#"
  },
  {
    title: "Free samples",
    cat: "Freebies",
    desc: "Browse sample opportunities. Availability and shipping rules can change.",
    meta: "Limited quantities may apply",
    url: "#"
  },
  {
    title: "Cashback opportunities",
    cat: "Cashback",
    desc: "Find participating merchants and review the cashback rate before purchasing.",
    meta: "Usually requires a qualifying purchase",
    url: "#"
  },
  {
    title: "Free local giveaways",
    cat: "Freebies",
    desc: "Check community giveaways and promotions. Never pay to enter a legitimate free giveaway.",
    meta: "Location and eligibility vary",
    url: "#"
  },
  {
    title: "Receipt rewards",
    cat: "Rewards",
    desc: "Some services reward eligible receipt submissions. Read privacy and eligibility terms first.",
    meta: "Eligibility varies",
    url: "#"
  }
];

const cards = document.querySelector("#cards");
const empty = document.querySelector("#empty");
const count = document.querySelector("#count");
let active = "All";

function render() {
  const q = document.querySelector("#search").value.trim().toLowerCase();

  const list = offers.filter(o =>
    (active === "All" || o.cat === active) &&
    (!q || (o.title + " " + o.desc + " " + o.cat).toLowerCase().includes(q))
  );

  cards.innerHTML = list.map(o => `
    <article class="card">
      <span class="badge">${o.cat}</span>
      <h3>${o.title}</h3>
      <p>${o.desc}</p>
      <div class="meta">${o.meta}</div>
      <a class="go" href="${o.url}" onclick="return demoLink(event)">View offer</a>
    </article>
  `).join("");

  empty.classList.toggle("hidden", list.length !== 0);
  count.textContent = `${list.length} offer${list.length === 1 ? "" : "s"}`;
}

function demoLink(e) {
  if (e.currentTarget.getAttribute("href") === "#") {
    e.preventDefault();
    alert("This is a starter placeholder. Real approved offer links will be added before launch.");
    return false;
  }
}

document.querySelectorAll(".cat").forEach(b =>
  b.addEventListener("click", () => {
    document.querySelectorAll(".cat").forEach(x => x.classList.remove("active"));
    b.classList.add("active");
    active = b.dataset.cat;
    render();
  })
);

document.querySelector("#search").addEventListener("input", render);

let deferred;

window.addEventListener("beforeinstallprompt", e => {
  e.preventDefault();
  deferred = e;
  document.querySelector("#installBtn").classList.remove("hidden");
});

document.querySelector("#installBtn").addEventListener("click", async () => {
  if (!deferred) return;
  deferred.prompt();
  await deferred.userChoice;
  deferred = null;
  document.querySelector("#installBtn").classList.add("hidden");
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js");
  });
}

render();
