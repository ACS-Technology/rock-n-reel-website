// Integrations stay inert on local files, localhost, LAN previews and staging hosts.
const productionHosts = new Set(["getrockandreel.com", "www.getrockandreel.com"]);
const isProduction = location.protocol === "https:" && productionHosts.has(location.hostname);

if (isProduction) {
  const analytics = document.createElement("script");
  analytics.type = "module";
  analytics.src = "https://static.cloudflareinsights.com/beacon.min.js";
  analytics.setAttribute("data-cf-beacon", '{"token":"14f0848816214ab6982079dc518ba7c0"}');
  document.head.append(analytics);

  const form = document.querySelector(".signup-form");
  if (form) {
    form.action = form.dataset.action;
    form.querySelectorAll(":disabled").forEach(control => { control.disabled = false; });
    document.getElementById("signup-status").hidden = true;

    const kit = document.createElement("script");
    kit.src = "https://f.convertkit.com/ckjs/ck.5.js";
    document.head.append(kit);
  }
} else {
  document.querySelector(".signup-form")?.addEventListener("submit", event => event.preventDefault());
}
