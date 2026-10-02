const offers = [
  {
    title: "Fetch Rewards",
    cat: "Rewards",
    desc: "Earn points by submitting eligible receipts.",
    meta: "Free to join • Eligibility and rewards vary",
    url: "https://fetch.com/"
  },
  {
    title: "Fetch Play",
    cat: "Rewards",
    desc: "Earn Fetch points through eligible activities and games.",
    meta: "Offers and requirements vary",
    url: "https://fetch.com/rewards"
  },
  {
    title: "Swagbucks",
    cat: "Rewards",
    desc: "Earn points through surveys, shopping and other activities.",
    meta: "Free to join • Eligibility varies",
    url: "https://www.swagbucks.com/"
  },
  {
    title: "MyPoints",
    cat: "Rewards",
    desc: "Earn points through shopping, surveys and online activities.",
    meta: "Free to join • Requirements vary",
    url: "https://www.mypoints.com/"
  },
  {
    title: "InboxDollars",
    cat: "Rewards",
    desc: "Find eligible online activities and rewards.",
    meta: "Free to join • Eligibility varies",
    url: "https://www.inboxdollars.com/"
  },
  {
    title: "Rakuten Cash Back",
    cat: "Cashback",
    desc: "Earn cash back when shopping through participating stores.",
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
    desc: "Find eligible cash-back offers at participating businesses.",
    meta: "Purchase required • Offers vary",
    url: "https://www.upside.com/"
  },
  {
    title: "Fetch Receipt Rewards",
    cat: "Freebies",
    desc: "Submit eligible receipts and earn rewards.",
    meta: "Receipt required • Eligibility varies",
    url: "https://fetch.com/rewards"
  },
  {
    title: "Swagbucks Magic Receipts",
    cat: "Freebies",
    desc: "Check eligible receipt offers and requirements.",
    meta: "Offers and requirements vary",
    url: "https://www.swagbucks.com/"
  },
  {
    title: "Ibotta Receipt Offers",
    cat: "Freebies",
    desc: "Browse eligible receipt offers and requirements.",
    meta: "Qualifying purchase may be required",
    url: "https://ibotta.com/"
  },
  {
    title: "Rakuten Coupons",
    cat: "Coupons",
    desc: "Browse participating stores for available coupons and savings.",
    meta: "Offers and exclusions vary",
    url: "https://www.rakuten.com/",    
  },
{
     

    title: "Maytag",
      cat: "Appliances",
      desc: "Shop Maytag appliances and current offers.",
      meta: "Affiliae offer",
      url: "https://click.linksynergy.com/link?id=6E2sSLEB1%2fA&offerid=1810948.537086757102962642234383&type=2&murl=https%3a%2f%2fwww.maytag.com%2fkitchen%2frefrigeration%2frefrigerators%2ftop-freezer%2fp.33-inch-wide-top-freezer-refrigerator-with-garage-mode-21-cu.-ft.mrtx5121tz.html"
    }
  }];
];

const cards = document.querySelector("#cards");
const empty = document.querySelector("#empty");
const count = document.querySelector("#count");
let active = "All";

function render() {
  const search = document.querySelector("#search");
  const q = search ? search.value.trim().toLowerCase() : "";

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
      <a class="go" href="${o.url}" target="_blank" rel="noopener noreferrer">View Offer</a>
    </article>
  `).join("");

  empty.classList.toggle("hidden", list.length !== 0);
  count.textContent = `${list.length} offer${list.length === 1 ? "" : "s"}`;
}

document.querySelectorAll(".cat").forEach(b => {
  b.addEventListener("click", () => {
    document.querySelectorAll(".cat").forEach(x => x.classList.remove("active"));
    b.classList.add("active");
    active = b.dataset.cat;
    render();
  });
});

const searchBox = document.querySelector("#search");

if (searchBox) {
  searchBox.addEventListener("input", render);
}

render();