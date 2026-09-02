# Pantograph — animated HTML/CSS/JS prototype

A close, responsive recreation of the supplied Pantograph prototype.

## Files
- `index.html` — page structure
- `styles.css` — layout, typography, responsive styling and animations
- `script.js` — content/image/link configuration + scroll animations

## Add your images/links
Open `script.js` and edit `SITE_CONFIG`:

```js
LOGO_URL: "YOUR_LOGO_URL",
HERO_IMAGE_URL: "YOUR_BACKGROUND_IMAGE_URL",
```

Each project supports:

```js
{
  image: "PROJECT_IMAGE_URL",
  title: "Project name",
  description: "Short description",
  url: "https://..."
}
```

Company and contact cards have their own `url` fields.

The project image area is intentionally rectangular at the top of every project card.

## Run
No framework or build step is needed. Open `index.html` in a browser, or serve the folder with any static web server.
