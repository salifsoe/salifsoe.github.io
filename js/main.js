const PROJECTS_JSON_URL = "projects.json";
const MAX_FEATURED_PROJECTS = 6;

function $(id) {
  return document.getElementById(id);
}

function normalize(value) {
  return String(value || "")
    .toLowerCase()
    .trim();
}

function escapeHtml(unsafe) {
  return String(unsafe)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function uniqSorted(values) {
  return Array.from(new Set(values.filter(Boolean))).sort((a, b) =>
    a.localeCompare(b, undefined, { sensitivity: "base" })
  );
}

function renderProjects(projects) {
  const grid = $("projects-grid");
  if (!grid) return;

  if (!projects.length) {
    grid.innerHTML = '<p class="muted">Aucun projet trouvé.</p>';
    return;
  }

  grid.innerHTML = projects
    .map((p, idx) => {
      const name = escapeHtml(p.name || "Untitled");
      const url = escapeHtml(p.url || "#");
      const description = escapeHtml(p.description || "");
      const language = escapeHtml(p.language || "");
      const fadeIn = idx < 6 ? "fade-in" : "";

      return `
        <article class="card ${fadeIn}">
          <h3>
            <a class="repo-link" href="${url}" target="_blank" rel="noopener noreferrer">
              <span>${name}</span>
              <span class="link-icon" aria-hidden="true">↗</span>
            </a>
          </h3>
          ${description ? `<p>${description}</p>` : ""}
          ${language ? `<span class="lang">${language}</span>` : ""}
        </article>
      `.trim();
    })
    .join("\n");
}

function applyFilters(allProjects) {
  const searchInput = $("search");
  const langSelect = $("lang-filter");

  const q = normalize(searchInput?.value);
  const lang = normalize(langSelect?.value);

  let filtered = allProjects;
  if (q) {
    filtered = filtered.filter((p) => {
      const hay = normalize(`${p.name || ""} ${p.description || ""}`);
      return hay.includes(q);
    });
  }

  if (lang) {
    filtered = filtered.filter((p) => normalize(p.language) === lang);
  }

  renderProjects(filtered.slice(0, MAX_FEATURED_PROJECTS));
}

function populateLanguageFilter(allProjects) {
  const langSelect = $("lang-filter");
  if (!langSelect) return;

  const languages = uniqSorted(allProjects.map((p) => p.language));

  const keepFirst = langSelect.querySelector('option[value=""]');
  langSelect.innerHTML = "";
  if (keepFirst) langSelect.appendChild(keepFirst);
  else {
    const opt = document.createElement("option");
    opt.value = "";
    opt.textContent = "All languages";
    langSelect.appendChild(opt);
  }

  for (const l of languages) {
    const opt = document.createElement("option");
    opt.value = l;
    opt.textContent = l;
    langSelect.appendChild(opt);
  }
}

async function loadProjects() {
  const res = await fetch(PROJECTS_JSON_URL, { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to load ${PROJECTS_JSON_URL}: ${res.status}`);

  const data = await res.json();
  if (!Array.isArray(data)) throw new Error("projects.json must be an array");

  return data
    .filter((p) => p && typeof p === "object")
    .map((p) => ({
      name: p.name,
      url: p.url,
      description: p.description,
      language: p.language,
    }));
}

function initYear() {
  const el = $("year");
  if (el) el.textContent = String(new Date().getFullYear());
}

async function init() {
  initYear();

  const grid = $("projects-grid");
  if (grid) grid.innerHTML = '<p class="muted">Chargement des projets…</p>';

  try {
    const allProjects = await loadProjects();
    populateLanguageFilter(allProjects);

    const searchInput = $("search");
    const langSelect = $("lang-filter");

    if (searchInput) {
      searchInput.addEventListener("input", () => applyFilters(allProjects));
    }
    if (langSelect) {
      langSelect.addEventListener("change", () => applyFilters(allProjects));
    }

    applyFilters(allProjects);
  } catch (err) {
    if (grid) {
      grid.innerHTML =
        '<p class="muted">Impossible de charger les projets. Vérifie que <code>projects.json</code> est présent.</p>';
    }
    console.error(err);
  }
}

document.addEventListener("DOMContentLoaded", init);
