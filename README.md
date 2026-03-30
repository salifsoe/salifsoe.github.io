# Portfolio — Salif Sow

Portfolio personnel statique, hébergé sur GitHub Pages.  
Langue : français (avec quelques libellés EN).  
Projets : sélection manuelle via `projects.json` (max 6 affichés).  
Pas de fetch GitHub API.

## Contenu

- **Hero** : Salif Sow, avatar tech (SVG), liens GitHub/LinkedIn/Contact
- **Projets** : cartes depuis `projects.json`, recherche + filtre par langage
- **About** : bio FR courte, localisation
- **Contact** : GitHub, LinkedIn, email
- **Footer** : année dynamique

## Personnalisation

- Modifier `projects.json` pour ajouter/modifier des projets
- Adapter `css/style.css` pour le style
- Adapter `js/main.js` pour le comportement (nombre de projets, filtres)

## Local testing

```powershell
python -m http.server 8000
# ou
py -m http.server 8000
# puis ouvrir http://localhost:8000
```

## Publication GitHub Pages

Le dépôt est déjà configuré pour GitHub Pages via la branche `main`.  
Après un `git push origin main`, le site se met à jour automatiquement à :

https://salifsoe.github.io

## Structure

```
/
├── index.html          # page principale
├── css/
│   └── style.css       # styles
├── js/
│   └── main.js         # logique (projets, filtres, année)
├── images/
│   └── avatar-tech.svg # avatar tech
└── projects.json       # projets (statique)
```

## Licence / crédit

Template de portfolio personnalisé. Conserve cette mention si tu le réutilises.
