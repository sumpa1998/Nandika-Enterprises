// ==========================================================
// Nandika Enterprises — site interactivity
// ==========================================================

const WHATSAPP_NUMBER = "917045021350"; // TODO: replace with the real business WhatsApp number

// ---- Product catalogue --------------------------------------------------
const PRODUCTS = [
  {
    icon: "🪔",
    name: "अगरबत्ती",
    desc: "चंदन, गुलाब, मोगरा, नाग चंपा और भी बहुत कुछ — अगरबत्तियों की पूरी रेंज, कार्टन में पैक।",
    tag: "सबसे ज्यादा बिकने वाला"
  },
  {
    icon: "🔥",
    name: "धूप बत्ती",
    desc: "रोज़ की आरती और त्योहारों के लिए पारंपरिक स्टिक धूप, थोक बल्क पैक में उपलब्ध।",
    tag: "रोज़ का इस्तेमाल"
  },
  {
    icon: "🌀",
    name: "धूप बाती (कप / कोन)",
    desc: "बिना झंझट रोज़ की पूजा के लिए तुरंत जलने वाली कप और कोन धूप — बल्क बॉक्स में मिलती है।",
    tag: "तेज़ बिकने वाला"
  },
  {
    icon: "🫙",
    name: "पूजा तेल",
    desc: "दीया जलाने के लिए शुद्ध तिल का तेल और दीपक तेल — त्योहारी सीज़न का स्टॉक बल्क में उपलब्ध।",
    tag: "त्योहारी स्टॉक"
  },
  {
    icon: "🤍",
    name: "कपूर",
    desc: "आरती और हवन के लिए शुद्ध कपूर टिकिया और पाउडर, थोक पाउच में पैक।",
    tag: "शुद्ध गुणवत्ता"
  },
  {
    icon: "🕯️",
    name: "हवन सामग्री",
    desc: "यज्ञ और होम के लिए तैयार हवन सामग्री, मंदिर और आयोजन की मात्रा के हिसाब से तैयार।",
    tag: "मंदिरों की पसंद"
  },
  {
    icon: "🧵",
    name: "कॉटन बत्ती / बाती",
    desc: "दीयों के लिए कॉटन बाती, रोल में या दुकान की रोज़ की मांग के हिसाब से बल्क बंडल में।",
    tag: "रोज़मर्रा का स्टॉक"
  },
  {
    icon: "🙏",
    name: "पूजा थाली सामग्री",
    desc: "कुमकुम, चंदन, अक्षत और अन्य छोटी पूजा सामग्री — दुकान की अलमारी भरने के लिए तैयार बंडल।",
    tag: "शेल्फ के लिए तैयार"
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
      note.textContent = "कृपया अपना नाम और फ़ोन नंबर लिखें ताकि हम जवाब दे सकें।";
      return;
    }

    const lines = [
      `नमस्ते नंदिका एंटरप्राइजेज, मुझे थोक रेट कार्ड चाहिए।`,
      `नाम: ${name}`,
      `फ़ोन: ${phone}`,
      `सामान: ${product}`,
      qty ? `अनुमानित मात्रा: ${qty}` : null,
      message ? `संदेश: ${message}` : null
    ].filter(Boolean);

    const text = encodeURIComponent(lines.join("\n"));
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;

    note.textContent = "आपकी पूछताछ के साथ व्हाट्सएप खोला जा रहा है…";
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
