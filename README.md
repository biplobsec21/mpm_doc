# Manpower Management System - Documentation Website

A modern, static documentation website for the Manpower Management System. Built with **HTML, TailwindCSS, and Vanilla JavaScript** - no build tools required!

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Status](https://img.shields.io/badge/status-Active-success)

## 🎯 Quick Start

### Opening Locally
1. Download or clone this repository
2. Open `index.html` in any modern web browser
3. That's it! No build process needed.

### File Structure
```
docs-site/
├── index.html                           # Landing page
├── styles.css                           # Custom CSS (enhances TailwindCSS)
├── script.js                            # Navigation, search, interactions
│
├── modules/                             # Module documentation pages
│   ├── settings.html                    # Settings & Configuration
│   ├── duty-management.html             # Duty Management
│   ├── soldier-management.html          # Soldier Management
│   ├── absence-management.html          # Absence Management
│   ├── leave-management.html            # Leave Management
│   ├── training-module.html             # Training Module
│   ├── appointment-management.html      # Appointment Management
│   ├── reports-analytics.html           # Reports & Analytics
│   └── duty-advanced.html               # Advanced Duty Assignments
│
├── assets/
│   └── images/                          # Screenshot placeholders
│       └── screenshots-placeholder.png  # Add screenshots here
│
└── README.md                            # This file
```

---

## 🚀 GitHub Pages Deployment

### Step 1: Create a GitHub Repository

1. Go to [GitHub](https://github.com) and log in
2. Click **New Repository**
3. Name it `docs` or `manpower-docs`
4. Choose **Public** (required for free GitHub Pages)
5. Click **Create repository**

### Step 2: Upload the Documentation

**Option A: Using Git (Recommended)**

```bash
# Clone your new repository
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
cd YOUR_REPO

# Copy all docs-site files into the repository
cp -r /path/to/docs-site/* .

# Add, commit, and push
git add .
git commit -m "Initial commit: Add documentation website"
git push origin main
```

**Option B: Using GitHub Website**

1. Open your repository on GitHub
2. Click **Add file** → **Upload files**
3. Select all files from `docs-site` folder
4. Commit changes

### Step 3: Enable GitHub Pages

1. Go to repository **Settings**
2. Scroll to **GitHub Pages** section
3. Under "Source", select **main** branch
4. Select **/root** folder
5. Click **Save**

### Step 4: Access Your Documentation

Your site will be available at:
```
https://YOUR_USERNAME.github.io/YOUR_REPO
```

For example: `https://mycompany.github.io/manpower-docs`

> It may take 1-2 minutes for the site to deploy. Refresh after a few moments.

---

## 📝 Editing Documentation

### Updating Module Content

Each module is a standalone HTML file in the `modules/` folder:

```
modules/
├── duty-management.html     # Update duty content here
├── soldier-management.html  # Update soldier content here
├── leave-management.html    # Update leave content here
...
```

### How to Edit a Module

1. Open the module file (e.g., `modules/duty-management.html`)
2. Locate the section you want to update
3. Edit the content within the HTML
4. Save the file
5. Push to GitHub (if using Git)
6. Site updates automatically within minutes

### Example: Adding FAQ to a Module

```html
<section id="faq" class="mb-16">
    <h2 class="text-3xl font-bold text-slate-900 mb-8">FAQ</h2>
    
    <div class="space-y-4">
        <details class="bg-white border border-slate-200 rounded-lg p-6 cursor-pointer">
            <summary class="font-semibold text-slate-900">Your question here?</summary>
            <p class="text-slate-600 mt-4">Your answer here.</p>
        </details>
    </div>
</section>
```

---

## 🖼️ Adding Screenshots

### Where to Place Screenshots

1. Add screenshot images to: `assets/images/`
2. Keep file size reasonable (< 500KB each)
3. Use descriptive filenames

### How to Add Screenshots to Pages

Find the screenshot placeholder section in each module:

```html
<section id="screenshots" class="mb-16">
    <h2>Visual Guide</h2>
    <div class="grid md:grid-cols-2 gap-6">
        <img src="../assets/images/duty-creation.png" 
             alt="Duty Creation Page" 
             class="rounded-xl border border-slate-200">
    </div>
</section>
```

---

## 🎨 Customization

### Changing Colors

Edit `styles.css` to change the theme:

```css
:root {
    --color-primary: #2563eb;        /* Blue */
    --color-primary-dark: #1d4ed8;
    --color-secondary: #7c3aed;      /* Purple */
    --color-slate: #64748b;
}
```

### Adding a New Module

1. **Create new file**: `modules/new-module.html`
2. **Copy template** from an existing module (e.g., `modules/settings.html`)
3. **Update content**: Change title, descriptions, features, etc.
4. **Add navigation link** in `index.html` sidebar
5. **Add module card** to index.html features section
6. **Push to GitHub**

### Changing the Logo

In `index.html`, update the header logo:

```html
<div class="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
    <i class="fas fa-users text-white"></i>  <!-- Change icon here -->
</div>
```

---

## 📚 Available Components

### Callout Boxes
```html
<div class="bg-blue-50 border border-blue-200 rounded-xl p-8">
    <p class="text-blue-700">Important information</p>
</div>
```

### Feature Cards
```html
<div class="bg-white rounded-xl p-6 border border-slate-200 hover:shadow-lg transition">
    <h3 class="font-semibold text-slate-900 mb-2">Feature Title</h3>
    <p class="text-slate-600">Feature description</p>
</div>
```

### FAQ Section
```html
<details class="bg-white border border-slate-200 rounded-lg p-6 cursor-pointer">
    <summary class="font-semibold text-slate-900">Question?</summary>
    <p class="text-slate-600 mt-4">Answer here.</p>
</details>
```

### Tables
```html
<table class="w-full bg-white rounded-xl border border-slate-200">
    <thead>
        <tr class="border-b border-slate-200">
            <th class="px-6 py-4 text-left font-semibold">Column 1</th>
            <th class="px-6 py-4 text-left font-semibold">Column 2</th>
        </tr>
    </thead>
    <!-- Rows here -->
</table>
```

---

## 🔍 Search Functionality

The search bar is a frontend placeholder. To add full search:

1. Consider using **Algolia** (free tier available)
2. Or implement **Lunr.js** for client-side search
3. Or use **GitHub Search API** integration

Current implementation shows visual search feedback but doesn't actually search. Update `script.js` to add real search.

---

## ♿ Accessibility

The documentation follows WCAG 2.1 guidelines:

- ✅ Semantic HTML structure
- ✅ Proper heading hierarchy (H1 → H2 → H3)
- ✅ Keyboard navigation support
- ✅ Focus indicators on interactive elements
- ✅ Alt text for all images
- ✅ Color contrast compliance

---

## 🔒 Performance

The site is optimized for speed:

- **Static files only** - CDN-friendly, no backend
- **TailwindCSS CDN** - Latest version, cached
- **Minified assets** - Optional compression with GitHub Pages
- **Fast load times** - Typical < 2 seconds
- **Mobile optimized** - Responsive design
- **SEO friendly** - Proper meta tags

---

## 📱 Browser Support

Modern browsers only (no IE support):

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers

---

## 🛠️ Development Tips

### Testing Locally

1. Use Python's built-in server:
```bash
cd docs-site
python -m http.server 8000
# Visit http://localhost:8000
```

2. Or use Node's `http-server`:
```bash
npm install -g http-server
http-server
```

### Before Deploying

1. ✅ Test all links work
2. ✅ Check all images load
3. ✅ Verify mobile layout
4. ✅ Test navigation menu
5. ✅ Check spelling and grammar

---

## 📊 Usage Analytics

Add Google Analytics for tracking:

1. Create a Google Analytics account at [analytics.google.com](https://analytics.google.com)
2. Get your **Measurement ID** (format: `G-XXXXXXXXXX`)
3. Add this to `index.html` before `</head>`:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

---

## 🚨 Troubleshooting

### Links not working
- Check relative paths in `href` attributes
- Make sure file names match exactly (case-sensitive)
- Use `../` to go up directories

### Images not showing
- Add images to `assets/images/` folder
- Use correct path: `../assets/images/filename.png`
- Compress large images

### GitHub Pages not updating
- Wait 1-2 minutes for deployment
- Clear browser cache (Ctrl+Shift+Delete)
- Check repository settings → GitHub Pages
- Ensure files are in correct branch and folder

### Search not working
- It's a placeholder! Implement real search as described above
- Check browser console for JavaScript errors
- Search only works on current page by default

---

## 📞 Support & Maintenance

### Regular Updates
1. Update content as system changes
2. Add new modules when features are added
3. Keep screenshots current
4. Review and fix broken links quarterly

### Contributing
To contribute improvements:

1. Fork the repository
2. Create a branch: `git checkout -b feature/improvements`
3. Make changes
4. Commit: `git commit -m "Improve documentation"`
5. Push: `git push origin feature/improvements`
6. Open a Pull Request

---

## 📄 License

This documentation website is provided as-is for the Manpower Management System.

---

## 🎯 Next Steps

1. ✅ Deploy to GitHub Pages (see instructions above)
2. 🖼️ Add screenshot images to `assets/images/`
3. 📝 Remove placeholder content and add real documentation
4. 🔍 Implement search functionality
5. 📊 Set up analytics
6. 🎨 Customize colors if needed
7. 📱 Test on mobile devices
8. 🚀 Share with your team!

---

## 📚 Resources

- **TailwindCSS Documentation**: https://tailwindcss.com/docs
- **GitHub Pages Help**: https://docs.github.com/en/pages
- **Font Awesome Icons**: https://fontawesome.com/icons
- **HTML Reference**: https://developer.mozilla.org/en-US/docs/Web/HTML
- **Web Accessibility**: https://www.w3.org/WAI/

---

## 💡 Pro Tips

1. **Use version numbers** - Add them to HTML comments for tracking changes
2. **Link to external resources** - Link to API docs, source code, issue trackers
3. **Add breadcrumbs** - Helps users understand navigation depth
4. **Create index pages** - Organize related topics
5. **Enable search** - Use Algolia or Lunr.js for better UX
6. **Monitor analytics** - See what users are reading most
7. **Gather feedback** - Add a feedback form or survey
8. **Keep it updated** - Outdated docs hurt credibility

---

## 🎉 Getting Help

- Check the FAQ sections in each module
- Review troubleshooting guides
- Search documentation for keywords
- Check GitHub Issues if deployed
- Contact your system administrator

---

**Last Updated:** March 12, 2026  
**Documentation Version:** 1.0  
**Built with:** HTML, TailwindCSS, Vanilla JavaScript
