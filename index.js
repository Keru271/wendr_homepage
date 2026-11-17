document.addEventListener("DOMContentLoaded", () => {
  // 1. Seamless Continuous Marquee Helper
  const marqueeTracks = document.querySelectorAll(".marquee-track");
  marqueeTracks.forEach((track) => {
    // Clone children to ensure continuous infinite loop without gaps
    const content = track.innerHTML;
    track.innerHTML = content + content;
  });

  // 2. Live Sales Ticker Simulation
  const salesTickerEl = document.getElementById("live-sales-ticker");
  const feedListEl = document.getElementById("live-feed-list");
  let currentSales = 48920.0;

  if (salesTickerEl && feedListEl) {
    const samplePurchases = [
      { item: "Luxe Wool Overcoat", store: "LUXE-ATELIER", location: "London, UK", amount: 320.0 },
      { item: "Mechanical Studio Keyboard", store: "MINCOM-TECH", location: "Berlin, DE", amount: 165.0 },
      { item: "Artisan Ceramic Cup Set", store: "ARTISAN-GOODS", location: "Kyoto, JP", amount: 84.0 },
      { item: "Wireless ANC Headphones", store: "NOVA-TECH", location: "New York, US", amount: 249.0 },
      { item: "Minimalist Leather Backpack", store: "NOVA-HORIZON", location: "Toronto, CA", amount: 195.0 },
    ];

    setInterval(() => {
      const pick = samplePurchases[Math.floor(Math.random() * samplePurchases.length)];
      const randomInc = pick.amount;
      currentSales += randomInc;
      salesTickerEl.textContent = `$${currentSales.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

      // Prepend to live feed
      const newRow = document.createElement("div");
      newRow.style.display = "flex";
      newRow.style.justifyContent = "space-between";
      newRow.style.alignItems = "center";
      newRow.style.padding = "8px 0";
      newRow.style.borderBottom = "1px solid var(--border)";
      newRow.style.fontSize = "14px";
      newRow.innerHTML = `
        <div>
          <div style="font-weight: 700; font-family: var(--font-display); text-transform: uppercase;">${pick.item}</div>
          <div style="color: var(--muted-fg); font-size: 12px; font-family: var(--font-mono);">STORE: ${pick.store} • ${pick.location}</div>
        </div>
        <div style="font-family: var(--font-display); font-weight: 800; color: var(--accent); font-size: 16px;">+$${pick.amount.toFixed(2)}</div>
      `;

      if (feedListEl.children.length >= 3) {
        feedListEl.removeChild(feedListEl.lastElementChild);
      }
      feedListEl.insertBefore(newRow, feedListEl.firstChild);
    }, 4500);
  }

  // 3. Pricing Tier Matrix Switcher (Monthly / Annual / Lifetime)
  const switcherBtns = document.querySelectorAll(".switcher-btn");
  const priceFree = document.getElementById("price-free");
  const pricePro = document.getElementById("price-pro");
  const priceTeam = document.getElementById("price-team");
  const priceProSub = document.getElementById("price-pro-sub");
  const priceTeamSub = document.getElementById("price-team-sub");

  const pricingData = {
    monthly: {
      free: "$0",
      pro: "$29",
      team: "$199",
      proSub: "Billed monthly • Cancel anytime",
      teamSub: "Billed monthly for fleets",
    },
    annual: {
      free: "$0",
      pro: "$19",
      team: "$119",
      proSub: "$228 billed annually (Save 40%)",
      teamSub: "$1,428 billed annually (Save 40%)",
    },
    lifetime: {
      free: "$0",
      pro: "$299",
      team: "$999",
      proSub: "Pay once • Lifetime single license",
      teamSub: "Pay once • Lifetime fleet license",
    },
  };

  switcherBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      switcherBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const period = btn.getAttribute("data-period") || "monthly";
      const data = pricingData[period] || pricingData.monthly;

      if (priceFree) priceFree.textContent = data.free;
      if (pricePro) pricePro.textContent = data.pro;
      if (priceTeam) priceTeam.textContent = data.team;
      if (priceProSub) priceProSub.textContent = data.proSub;
      if (priceTeamSub) priceTeamSub.textContent = data.teamSub;
    });
  });

  // 4. Interactive FAQ Accordion
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");
    if (question) {
      question.addEventListener("click", () => {
        const isActive = item.classList.contains("active");
        faqItems.forEach((i) => i.classList.remove("active"));
        if (!isActive) {
          item.classList.add("active");
        }
      });
    }
  });

  // 5. Dynamic Production Link Rewriter for Cloud Deployments
  const isLocal = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
  if (!isLocal) {
    const protocol = window.location.protocol;
    const host = window.location.host;
    document.querySelectorAll("a[href^='http://localhost:3000']").forEach((link) => {
      const original = link.getAttribute("href") || "";
      const path = original.replace("http://localhost:3000", "");
      link.setAttribute("href", `${protocol}//cms.${host.replace(/^www\./, "")}${path}`);
    });
  }
});

