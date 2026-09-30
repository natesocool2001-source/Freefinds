const offers = [
  {
    title: "Fetch Rewards",
    cat: "Rewards",
    desc: "Earn points from eligible receipts, eReceipts, offers and other activities, then redeem rewards.",
    meta: "Free to join • Requirements vary",
    url: "https://fetch.com/"
  },
  {
    title: "Fetch Play",
    cat: "Rewards",
    desc: "Earn Fetch points by completing eligible game activities.",
    meta: "Offers and requirements vary",
    url: "https://fetch.com/rewards"
  },
  {
    title: "Swagbucks",
    cat: "Rewards",
    desc: "Earn points through surveys, shopping, games and other eligible activities.",
    meta: "Free to join • Eligibility varies",
    url: "https://www.swagbucks.com/"
  },
  {
    title: "MyPoints",
    cat: "Rewards",
    desc: "Earn points through shopping, surveys, games and other activities.",
    meta: "Free to join • Requirements vary",
    url: "https://www.mypoints.com/"
  },
  {
    title: "InboxDollars",
    cat: "Rewards",
    desc: "Use eligible online activities, offers and surveys to earn rewards.",
    meta: "Free to join • Eligibility varies",
    url: "https://www.inboxdollars.com/"
  },
  {
    title: "Rakuten Cash Back",
    cat: "Cashback",
    desc: "Earn cash back when shopping through participating stores and offers.",
    meta: "Qualifying purchases required",
    url: "https://www.rakuten.com/"
  },
  {
    title: "Ibotta Cash Back",
    cat: "Cashback",
    desc: "Browse cash-back offers and earn rewards on qualifying purchases.",
    meta: "Qualifying purchases required",
    url: "https://ibotta.com/"
  },
  {
    title: "Upside Cash Back",
    cat: "Cashback",
    desc: "Claim eligible cash-back offers for gas, groceries and dining before purchasing.",
    meta: "Purchase required • Offers vary",
    url: "https://www.upside.com/"
  },
  {
    title: "Fetch Receipt Rewards",
    cat: "Freebies",
    desc: "Submit eligible receipts and earn Fetch points that can be redeemed for rewards.",
    meta: "Receipt required • Eligibility varies",
    url: "https://fetch.com/rewards"
  },
  {
    title: "Swagbucks Magic Receipts",
    cat: "Freebies",
    desc: "Check eligible receipt offers and submit qualifying receipts for rewards.",
    meta: "Offers and requirements vary",
    url: "https://search.swagbucks.com/shop"
  },
  {
    title: "Ibotta Receipt Offers",
    cat: "Freebies",
    desc: "Add eligible offers, make a qualifying purchase and submit your receipt.",
    meta: "Qualifying purchase required",
    url: "https://ibotta.com/"
  },
  {
    title: "Rakuten Coupons",
    cat: "Coupons",
    desc: "Browse participating stores for coupons and cash-back opportunities.",
    meta: "Offers and exclusions vary",
    url: "https://www.rakuten.com/"
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