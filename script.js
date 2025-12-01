/* ------------------------------------------ */
/* BACKGROUND SKY ANIMATION                   */
/* ------------------------------------------ */

const canvasBG = document.getElementById("bg");
const ctxBG = canvasBG.getContext("2d");
let w, h;

function resizeCanvas() {
    w = canvasBG.width = window.innerWidth;
    h = canvasBG.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

let mouse = { x: w / 2, y: h / 2 };
window.addEventListener("mousemove", e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

const stars = Array.from({ length: 150 }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    r: Math.random() * 1.2 + 0.3,
    vx: (Math.random() - 0.5) * 0.05,
    vy: (Math.random() - 0.5) * 0.05,
    alpha: Math.random() * 0.5 + 0.4,
    flicker: Math.random() * 0.02 + 0.01
}));

let shootingStars = [];

function addShootingStar() {
    shootingStars.push({
        x: Math.random() * w * 0.5,
        y: Math.random() * h * 0.3,
        vx: 6,
        vy: 3,
        length: 200
    });
}
setInterval(() => {
    if (shootingStars.length < 2) addShootingStar();
}, 4500);

function animateSky() {
    ctxBG.clearRect(0, 0, w, h);

    for (let s of stars) {
        s.x += s.vx;
        s.y += s.vy;

        if (s.x < 0) s.x = w;
        if (s.x > w) s.x = 0;
        if (s.y < 0) s.y = h;
        if (s.y > h) s.y = 0;

        s.alpha += (Math.random() - 0.5) * s.flicker;
        s.alpha = Math.max(0.2, Math.min(1, s.alpha));

        ctxBG.beginPath();
        ctxBG.arc(s.x, s.y, s.r, 0, 2 * Math.PI);
        ctxBG.fillStyle = `rgba(255,255,255,${s.alpha})`;
        ctxBG.fill();
    }

    for (let i = shootingStars.length - 1; i >= 0; i--) {
        const s = shootingStars[i];

        const grad = ctxBG.createLinearGradient(
            s.x, s.y,
            s.x - s.length,
            s.y - s.length * 0.6
        );

        grad.addColorStop(0, "rgba(255,255,255,1)");
        grad.addColorStop(1, "rgba(255,255,255,0)");

        ctxBG.strokeStyle = grad;
        ctxBG.lineWidth = 2;

        ctxBG.beginPath();
        ctxBG.moveTo(s.x, s.y);
        ctxBG.lineTo(s.x - s.length, s.y - s.length * 0.6);
        ctxBG.stroke();

        s.x += s.vx;
        s.y += s.vy;

        if (s.x > w + 300 || s.y > h + 300) shootingStars.splice(i, 1);
    }

    requestAnimationFrame(animateSky);
}
animateSky();

/* ------------------------------------------ */
/* DRAW PLACEHOLDER ICON                      */
/* ------------------------------------------ */

function drawPlaceholder(canvas, category) {
    const ctx = canvas.getContext("2d");
    const W = canvas.width;
    const H = canvas.height;

    ctx.clearRect(0, 0, W, H);
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 3;

    if (category === "display") ctx.strokeRect(W * 0.1, H * 0.2, W * 0.8, H * 0.5);

    else if (category === "keyboard") ctx.strokeRect(W * 0.15, H * 0.4, W * 0.7, H * 0.2);

    else if (category === "mouse") {
        ctx.beginPath();
        ctx.ellipse(W / 2, H / 2, W * 0.25, H * 0.35, 0, 0, 2 * Math.PI);
        ctx.stroke();
    }

    else if (category === "chairs") ctx.strokeRect(W * 0.3, H * 0.25, W * 0.4, H * 0.5);

    else if (category === "audio") {
        ctx.beginPath();
        ctx.arc(W * 0.3, H * 0.5, W * 0.2, 0, 2 * Math.PI);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(W * 0.7, H * 0.5, W * 0.2, 0, 2 * Math.PI);
        ctx.stroke();
    }
}

/* ------------------------------------------ */
/* PRODUCT DATA (unchanged)                   */
/* ------------------------------------------ */

const products = [
    {
        name: "Ultra 32″ Curved Monitor",
        category: "display",
        price: 399,
        description: "32″ QHD curved monitor with high refresh rate and ambient RGB.",
        specs: { "Size": "32 in", "Refresh": "165 Hz", "Resolution": "2560×1440", "Panel": "VA Curved", "RGB": "Yes" },
        images: ["images/ultra32_1.webp", "images/ultra32_2.webp", "images/ultra32_3.webp"]
    },
    {
        name: "Budget 27″ IPS Monitor",
        category: "display",
        price: 199,
        description: "27″ IPS panel monitor 144Hz — great balance for budget-conscious gamers.",
        specs: { "Size": "27 in", "Refresh": "144 Hz", "Resolution": "1920×1080", "Panel": "IPS", "RGB": "No" },
        images: ["images/27inch_1.webp", "images/27inch_2.webp"]
    },
    {
        name: "Compact 24″ FHD Monitor",
        category: "display",
        price: 129,
        description: "24″ Full HD monitor, 75Hz — compact & ideal for small setups.",
        specs: { "Size": "24 in", "Refresh": "75 Hz", "Resolution": "1920×1080", "Panel": "TN", "RGB": "No" },
        images: ["images/24compact_1.webp", "images/24compact_2.webp"]
    },

    {
        name: "RGB Mechanical Keyboard Pro",
        category: "keyboard",
        price: 89,
        description: "Full-size mechanical keyboard with blue switches and per-key RGB.",
        specs: { "Switch": "Blue", "Layout": "104-key", "Lighting": "Full RGB", "Connection": "USB-C" },
        images: ["images/rgbmech_1.webp", "images/rgbmech_2.webp", "images/rgbmech_3.webp"]
    },
    {
        name: "Compact TKL Keyboard",
        category: "keyboard",
        price: 59,
        description: "TKL layout mechanical keyboard, linear switches, minimalistic build.",
        specs: { "Switch": "Red", "Layout": "87-key TKL", "Lighting": "White LED", "Connection": "USB Wired" },
        images: ["images/tklkey_1.webp", "images/tklkey_2.webp"]
    },
    {
        name: "Budget Membrane Keyboard",
        category: "keyboard",
        price: 25,
        description: "Affordable membrane keyboard, no frills but reliable for everyday use.",
        specs: { "Type": "Membrane", "Layout": "Full 104-key", "Lighting": "None", "Connection": "USB Wired" },
        images: ["images/membranekey_1.webp", "images/membranekey_2.webp"]
    },

    {
        name: "Ergonomic Gaming Mouse X1",
        category: "mouse",
        price: 49,
        description: "High-DPI RGB gaming mouse with programmable buttons and ergonomic grip.",
        specs: { "DPI": "8000", "Buttons": "6", "Grip": "Palm/Claw", "Lighting": "RGB" },
        images: ["images/gamingm_1.webp", "images/gamingm_2.webp"]
    },
    {
        name: "Budget Mouse M20",
        category: "mouse",
        price: 19,
        description: "Affordable wired mouse with simple RGB lighting, ideal for basic gaming.",
        specs: { "DPI": "3200", "Buttons": "3", "Grip": "Palm", "Lighting": "RGB" },
        images: ["images/wiredm_1.webp", "images/wiredm_2.webp", "images/wiredm_3.webp"]
    },

    {
        name: "Pro Gaming Chair Titan",
        category: "chairs",
        price: 259,
        description: "Ergonomic chair with lumbar support, LED edges — built for long sessions.",
        specs: { "Material": "PU Leather", "MaxLoad": "150 kg", "Adjustable": "Height / Armrests / Recline", "Lighting": "LED", "Wheels": "360° Nylon" },
        images: ["images/gchair_1.webp", "images/gchair_2.webp", "images/gchair_3.webp"]
    },
    {
        name: "Standard Gaming Chair Basic",
        category: "chairs",
        price: 129,
        description: "Simple padded gaming chair with tilt lock and caster wheels.",
        specs: { "Material": "Fabric", "MaxLoad": "120 kg", "Adjustable": "Height", "Lighting": "No", "Wheels": "Caster Nylon" },
        images: ["images/schair_1.webp", "images/schair_2.webp", "images/schair_3.webp"]
    },

    {
        name: "Surround Headset 7.1",
        category: "audio",
        price: 69,
        description: "7.1 surround gaming headset with RGB earcups and noise-cancel mic.",
        specs: { "Driver": "50 mm", "Surround": "7.1 Virtual", "Mic": "Detachable", "Lighting": "RGB", "Connection": "3.5 mm Cable" },
        images: ["images/sheadset_1.webp", "images/sheadset_2.webp", "images/sheadset_3.webp"]
    }
];

/* ------------------------------------------ */
/* LAZY LOAD + SHIMMER + BLUR-UP LOADER       */
/* ------------------------------------------ */

function loadImageWithEffects(cvs, category, src) {
    cvs.width = 400;
    cvs.height = 300;

    cvs.classList.add("shimmer");
    drawPlaceholder(cvs, category);

    const observer = new IntersectionObserver((entries, obs) => {
        if (!entries[0].isIntersecting) return;

        const full = new Image();
        full.src = src;

        full.onload = () => {
            cvs.classList.remove("shimmer");

            const ctx = cvs.getContext("2d");
            ctx.clearRect(0, 0, cvs.width, cvs.height);
            ctx.drawImage(full, 0, 0, cvs.width, cvs.height);

            cvs.classList.add("loaded");
        };

        full.onerror = () => { /* keep placeholder */ };

        obs.disconnect();
    }, { threshold: 0.2 });

    observer.observe(cvs);
}

/* ------------------------------------------ */
/* RENDER PRODUCTS                            */
/* ------------------------------------------ */

function renderProducts(cat = "all", search = "") {
    const grid = document.getElementById("productGrid");
    grid.innerHTML = "";

    const mainCats = ["display", "keyboard", "mouse", "chairs", "audio"];

    const list = products.filter(p => {
        const matchesSearch =
            p.name.toLowerCase().includes(search) ||
            p.description.toLowerCase().includes(search);

        if (cat === "all") return matchesSearch;

        if (cat === "others")
            return !mainCats.includes(p.category) && matchesSearch;

        return p.category === cat && matchesSearch;
    });

    if (list.length === 0) {
        grid.innerHTML = `<div class="no-items">❌ No items found in this category.</div>`;
        return;
    }

    list.forEach((p, index) => {
        const card = document.createElement("div");
        card.className = "product-card";
        card.style.animationDelay = `${index * 0.06}s`;

        card.innerHTML = `
            <div class="product-thumb"><canvas></canvas></div>
            <div class="product-info">
                <h3>${p.name}</h3>
                <p class="price">$${p.price}</p>
                <p>${p.description}</p>
                <div class="product-actions">
                    <button class="btn-cart">Add to Cart</button>
                    <button class="btn-details">View Details</button>
                </div>
            </div>
        `;

        grid.appendChild(card);

        const cvs = card.querySelector("canvas");
        loadImageWithEffects(cvs, p.category, p.images[0]);

        card.querySelector(".btn-details").onclick = () => viewDetails(p);
    });
}

/* ------------------------------------------ */
/* MODAL VIEW DETAILS                         */
/* ------------------------------------------ */

function viewDetails(prod) {
    const modal = document.getElementById("productModal");
    modal.style.display = "flex";

    document.getElementById("modalTitle").textContent = prod.name;
    document.getElementById("modalDesc").textContent = prod.description;

    const specs = document.getElementById("modalSpecs");
    specs.innerHTML = "";
    for (const key in prod.specs) {
        const li = document.createElement("li");
        li.textContent = `${key}: ${prod.specs[key]}`;
        specs.appendChild(li);
    }

    const imgsDiv = document.getElementById("modalImages");
    imgsDiv.innerHTML = "";

    prod.images.forEach(src => {
        const cvs = document.createElement("canvas");
        cvs.width = 200;
        cvs.height = 150;

        imgsDiv.appendChild(cvs);

        loadImageWithEffects(cvs, prod.category, src);
    });
}

function closeModal() {
    document.getElementById("productModal").style.display = "none";
}

/* ------------------------------------------ */
/* CATEGORY + SEARCH EVENTS                   */
/* ------------------------------------------ */

const catBtns = document.querySelectorAll(".categories button");
const searchInput = document.getElementById("searchInput");

catBtns.forEach(btn => {
    btn.onclick = () => {
        catBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        renderProducts(btn.dataset.cat, searchInput.value.toLowerCase());
    };
});

searchInput.addEventListener("input", () => {
    const activeCat = document.querySelector(".categories button.active").dataset.cat;
    renderProducts(activeCat, searchInput.value.toLowerCase());
});

/* INITIAL RENDER */
renderProducts();
