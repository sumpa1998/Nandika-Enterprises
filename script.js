// ==========================================================
// Nandika Enterprises — site interactivity
// ==========================================================

const WHATSAPP_NUMBER = "917045021350"; // TODO: replace with the real business WhatsApp number

// ---- Product catalogue --------------------------------------------------
const PRODUCTS = [
  {
    icon: "🪔",
    name: "Agarbatti",
    desc: "Sandalwood, Rose, Mogra, Nag Champa and more — full range of incense sticks, packed by the carton.",
    tag: "Best Seller"
  },
  {
    icon: "🔥",
    name: "Dhoop Batti",
    desc: "Traditional stick dhoop for daily aarti and festive use, sold in wholesale bulk packs.",
    tag: "Daily Use"
  },
  {
    icon: "🌀",
    name: "Dhoop Bati (Cup / Cone)",
    desc: "Ready-to-light cup and cone dhoop for quick, no-mess daily puja — sold in bulk boxes.",
    tag: "Fast Moving"
  },
  {
    icon: "🫙",
    name: "Puja Oil",
    desc: "Pure til oil and deepak oil for lighting diyas — festival-grade stock available in bulk.",
    tag: "Festival Stock"
  },
  {
    icon: "🤍",
    name: "Kapoor (Camphor)",
    desc: "Pure camphor tablets and powder for aarti and havan, packed in wholesale pouches.",
    tag: "Pure Grade"
  },
  {
    icon: "🕯️",
    name: "Havan Samagri",
    desc: "Ready-mix havan samagri for yagna and homam, prepared for temple and event quantities.",
    tag: "Temple Favourite"
  },
  {
    icon: "🧵",
    name: "Cotton Batti / Wicks",
    desc: "Cotton wicks for diyas, sold on the roll or in bulk bundles for daily shop demand.",
    tag: "Everyday Stock"
  },
  {
    icon: "🙏",
    name: "Puja Thali Essentials",
    desc: "Kumkum, chandan, akshat and other small puja items — bundled for easy shelf restocking.",
    tag: "Shelf Ready"
  }
];

function renderProducts() {
  const grid = document.getElementById("productGrid");
  if (!grid) return;

  grid.innerHTML = PRODUCTS.map(p => `
    <article class="product-card">
      <div class="product-icon" aria-hidden="true">${p.icon}</div>
      <h3>${p.name}</h3>
      <p>${p.desc}</p>
      <span class="product-tag">${p.tag}</span>
    </article>
  `).join("");
}

// ---- Mobile nav toggle ---------------------------------------------------
function initNavToggle() {
  const toggle = document.getElementById("navToggle");
  const nav = document.getElementById("siteNav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

// ---- Contact form -> WhatsApp enquiry ------------------------------------
function initContactForm() {
  const form = document.getElementById("contactForm");
  const note = document.getElementById("formNote");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = form.name.value.trim();
    const phone = form.phone.value.trim();
    const product = form.product.value;
    const qty = form.qty.value.trim();
    const message = form.message.value.trim();

    if (!name || !phone) {
      note.textContent = "Please share your name and phone number so we can reply.";
      return;
    }

    const lines = [
      `Hello Nandika Enterprises, I'd like a wholesale rate card.`,
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Product: ${product}`,
      qty ? `Approx. Quantity: ${qty}` : null,
      message ? `Message: ${message}` : null
    ].filter(Boolean);

    const text = encodeURIComponent(lines.join("\n"));
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;

    note.textContent = "Opening WhatsApp with your enquiry filled in…";
    window.open(url, "_blank", "noopener");
    form.reset();
  });
}

// ---- Footer year ----------------------------------------------------------
function setFooterYear() {
  const el = document.getElementById("year");
  if (el) el.textContent = new Date().getFullYear();
}

document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  initNavToggle();
  initContactForm();
  setFooterYear();
});
