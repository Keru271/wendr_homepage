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

  // 4. Interactive Developer API Sandbox
  const sendBtn = document.getElementById("api-send-btn");
  const methodSelect = document.getElementById("api-method-select");
  const endpointInput = document.getElementById("api-endpoint-input");
  const terminalEl = document.getElementById("api-response-terminal");
  const presetBtns = document.querySelectorAll(".api-preset-btn");

  presetBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const url = btn.getAttribute("data-url");
      const method = btn.getAttribute("data-method") || "GET";
      if (url && endpointInput) endpointInput.value = url;
      if (method && methodSelect) methodSelect.value = method;
    });
  });

  if (sendBtn && terminalEl && endpointInput) {
    sendBtn.addEventListener("click", async () => {
      const url = endpointInput.value.trim();
      const method = methodSelect ? methodSelect.value : "GET";
      terminalEl.innerHTML = `<div class="code-comment">// Fetching ${method} ${url}...</div>`;

      try {
        const res = await fetch(url, { method });
        if (res.ok) {
          const json = await res.json();
          terminalEl.innerHTML = `
            <div style="color: #4ade80; font-weight: 700; margin-bottom: 8px;">HTTP/1.1 200 OK (${res.headers.get("content-type") || "application/json"})</div>
            <pre style="line-height: 1.5;"><code class="code-prop">${JSON.stringify(json, null, 2)}</code></pre>
          `;
          return;
        }
      } catch (err) {
        // Fallback realistic response if port 5002 is not actively running
      }

      // Mock output preview if live network fetch fails
      const mockResult = url.includes("products")
        ? {
            status: "success",
            total: 24,
            products: [
              { id: "prod_01", title: "Nova Smart Speaker Pro", price: 189.0, inventory: 45, status: "ACTIVE" },
              { id: "prod_02", title: "Minimalist Leather Tote", price: 240.0, inventory: 18, status: "ACTIVE" },
              { id: "prod_03", title: "Wireless ANC Headphones", price: 249.0, inventory: 32, status: "ACTIVE" },
            ],
          }
        : url.includes("collections")
          ? {
              status: "success",
              collections: [
                { id: "col_01", name: "Summer Drops 2026", slug: "summer-2026", productCount: 14 },
                { id: "col_02", name: "Featured Catalog", slug: "featured", productCount: 28 },
              ],
            }
          : {
              status: "success",
              store: {
                id: "store_nova",
                name: "Nova Horizon Goods",
                currency: "USD",
                status: "ACTIVE",
                theme: "default",
              },
            };

      terminalEl.innerHTML = `
        <div style="color: var(--accent); font-weight: 700; margin-bottom: 8px;">HTTP/1.1 200 OK • FASTIFY DEVELOPER API (/api/v1)</div>
        <pre style="line-height: 1.5;"><code class="code-prop">${JSON.stringify(mockResult, null, 2)}</code></pre>
      `;
    });
  }

  // 5. Interactive FAQ Accordion
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
});
