# ChessBeast

A one-page website for chess coaching and the ChessBeast community. Pure
HTML/CSS/JS — no build step, no dependencies, works on GitHub Pages for free.

## File structure

```
chessbeast/
├── index.html          → all page content
├── css/
│   └── style.css       → all styling (colors, type, layout)
├── js/
│   └── script.js       → nav toggle, hero animation, form handling
├── images/
│   └── README.md       → notes on adding your own photo
├── .gitignore
└── README.md            → this file
```

## 1. Before you publish: things to personalize

Open `index.html` and replace every bracketed placeholder:

- `[Your Name]` — appears in the page title and the "Coach" section
- `[X] years` playing / teaching, `[FM / CM / NM / your title]`, `[your rating]`
- The three testimonial names/quotes near `<!-- ===== TESTIMONIALS ===== -->`
- The Discord/community link in `<!-- ===== COMMUNITY ===== -->` (currently `href="#"`)
- Pricing in `<!-- ===== COACHING PROGRAMS ===== -->` if $60 / $200 / $350 aren't right
- `images/coach.jpg` — add a real photo (see `images/README.md`)

## 2. Connecting the contact form

Right now the form on the page doesn't send anywhere — it just shows a message.
Pick one:

**Option A — Formspree (easiest, free tier available)**
1. Go to formspree.io and create a free account.
2. Create a new form, get your form endpoint (looks like `https://formspree.io/f/xxxxxxx`).
3. In `index.html`, change:
   ```html
   <form class="form" id="contactForm">
   ```
   to:
   ```html
   <form class="form" id="contactForm" action="https://formspree.io/f/xxxxxxx" method="POST">
   ```
4. In `js/script.js`, delete (or comment out) the `form.addEventListener('submit', ...)` block at the bottom — Formspree will handle the submission and redirect for you.

**Option B — mailto (no signup, but opens the user's email app)**
Change the form tag to:
```html
<form class="form" id="contactForm" action="mailto:you@example.com" method="post" enctype="text/plain">
```

## 3. Uploading to GitHub — step by step

1. **Create the repository**
   - Go to github.com and log in.
   - Click the **+** icon (top right) → **New repository**.
   - Name it `chessbeast` (or anything you like).
   - Keep it **Public** (required for free GitHub Pages).
   - Do **not** check "Add a README" (you already have one) — leave it empty.
   - Click **Create repository**.

2. **Upload the files**
   - On the new repo's page, click **uploading an existing file**.
   - Drag in everything from this `chessbeast` folder — including the `css`,
     `js`, and `images` folders and the `.gitignore` (GitHub's uploader
     preserves folder structure if you drag the folders themselves).
   - Scroll down, add a commit message like "Initial site", click **Commit changes**.

   *(Alternative — using git on your computer instead of the browser uploader:)*
   ```bash
   cd chessbeast
   git init
   git add .
   git commit -m "Initial site"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/chessbeast.git
   git push -u origin main
   ```

3. **Turn on GitHub Pages**
   - In your repository, click **Settings** (top nav of the repo).
   - In the left sidebar, click **Pages**.
   - Under "Build and deployment" → **Source**, choose **Deploy from a branch**.
   - Under **Branch**, choose `main` and folder `/ (root)`, then click **Save**.
   - Wait 1–2 minutes. Refresh the page — you'll see a message like
     "Your site is live at `https://YOUR-USERNAME.github.io/chessbeast/`".

4. **Visit your site** at that URL. Any time you edit and commit files, the
   live site updates automatically within a minute or two.

## 4. Optional: custom domain

If you own a domain (e.g. `chessbeast.com`):
1. In repo **Settings → Pages**, enter your domain under "Custom domain."
2. At your domain registrar, add a `CNAME` record pointing to `YOUR-USERNAME.github.io`.
3. Wait for DNS to propagate (can take up to 24 hours) and check "Enforce HTTPS" once it's available.

## 5. Making future edits

You don't need any special software. For small text/copy changes:
- Open the file directly on GitHub, click the pencil (✏️) icon to edit,
  commit the change — the live site updates automatically.

For bigger changes, it's worth installing a code editor like
[VS Code](https://code.visualstudio.com/) and cloning the repo locally.

## Notes on the design

- Colors, fonts, and spacing are all defined as CSS variables at the top of
  `css/style.css` under `:root` — change a value there to re-theme the whole site.
- The gold line animating in the hero is a knight's tour, computed live in
  `js/script.js` — it's not a static image.
- The site is fully responsive and respects `prefers-reduced-motion`.
