const offers = [
  {
    title: "Fetch Rewards",
    cat: "Rewards",
    desc: "Earn points from eligible receipts and other activities, then redeem points for gift cards.",
    meta: "Free to join • Terms and eligibility apply",
    url: "https://fetch.com/receipt-scanning"
  },
  {
    title: "Ibotta Cashback",
    cat: "Cashback",
    desc: "Browse cashback offers and earn rewards on qualifying purchases.",
    meta: "Qualifying purchases required",
    url: "https://ibotta.com/"
  },
  {
    title: "Fetch Receipt Rewards",
    cat: "Freebies",
    desc: "Snap eligible receipts and earn points. Digital receipts may also qualify.",
    meta: "Receipts required • Eligibility varies",
    url: "https://fetch.com/receipt-scanning"
  },
  {
    title: "Ibotta Receipt Cashback",
    cat: "Cashback",
    desc: "Add eligible offers, make a qualifying purchase, and submit your receipt through the Ibotta app.",
    meta: "Qualifying purchase required",
    url: "https://help.ibotta.com/hc/en-us/articles/360008461959-How-do-I-submit-a-receipt-for-cash-back"
  },
  {
    title: "Fetch Play",
    cat: "Rewards",
    desc: "Fetch offers points for completing eligible activities, including participating games.",
    meta: "Offers and requirements vary",
    url: "https://fetch.com/"
  },
  {
    title: "Ibotta Online Shopping",
    cat: "Coupons",
    desc: "Browse participating retailers and review available cashback offers before shopping.",
    meta: "Offers, exclusions and eligibility vary",
    url: "https://help.ibotta.com/hc/en-us/articles/115006120327-How-do-I-earn-cash-back-on-Online-Shopping-offers"
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
      <a class="go" href="${o.url}" target="_blank" rel="noopener noreferrer">View offer</a>
    </article>
  `).join("");

  empty.classList.toggle("hidden", list.length !== 0);
  count.textContent = `${list.length} offer${list.length === 1 ? "" : "s"}`;
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
