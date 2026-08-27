# images/

Put your real images here, for example:

- `coach.jpg` — your headshot, used in the "The Coach" section
- `og-image.jpg` — optional, a 1200×630 image for social media link previews

Once you add `coach.jpg`, open `index.html`, find the `.coach__photo-frame`
placeholder block inside the `<!-- ===== THE COACH ===== -->` section, and
replace it with:

```html
<div class="coach__photo">
  <img src="images/coach.jpg" alt="[Your Name], chess coach">
</div>
```
