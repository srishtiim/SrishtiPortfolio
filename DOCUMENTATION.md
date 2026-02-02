# Portfolio Website - Technical Documentation

## Technologies Used

| Technology | Purpose |
|------------|---------|
| **HTML5** | Page structure and semantic markup |
| **CSS3** | Styling, animations, responsive design |
| **JavaScript** | Interactivity, DOM manipulation, data rendering |
| **Firebase Firestore** | Cloud database for storing tabular data |
| **Google Fonts** | Typography (Playfair Display, Space Grotesk) |
| **Font Awesome** | Icons throughout the site |

---

## File Structure

```
portfolio/
├── index.html              # Main HTML page
├── css/
│   ├── style.css           # Main styles + animations
│   └── responsive.css      # Mobile/tablet breakpoints
├── js/
│   ├── main.js             # Core functionality + local data
│   ├── animations.js       # Scroll effects
│   └── firebase-config.js  # Firebase database connection
├── assets/images/projects/ # Project images
├── .github/workflows/
│   └── deploy.yml          # Auto-deployment workflow
├── README.md
└── .gitignore
```

---

## Hosting

### Current Status
The website is **NOT yet deployed** to GitHub. It exists only locally at `/Users/apple/portfolio/`.

### How to Deploy to GitHub Pages

1. **Create GitHub Repository**
   ```bash
   cd "/Users/apple/portfolio "
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**
   - Go to repository Settings → Pages
   - Select "main" branch as source
   - Site will be live at: `https://YOUR_USERNAME.github.io/portfolio/`

3. **Auto-Deployment**
   - The `.github/workflows/deploy.yml` file automatically deploys on every push to main

---

## Data Storage

### Where is the Tabular Data Stored?

**Currently:** All data is stored **locally in JavaScript arrays** inside `js/main.js`:

| Data Type | Location in main.js | Format |
|-----------|---------------------|--------|
| Projects | `projectsData` array | Array of objects |
| Skills | `skillsData` object | Object with categories |
| Experience | `experienceData` array | Array of objects |
| Education | `educationData` array | Array of objects |
| Certifications | `certificationsData` array | Array of objects |

**Example structure:**
```javascript
const projectsData = [
    {
        id: 1,
        title: "News Summarizer",
        category: "Deep Learning",
        description: "...",
        techStack: ["Python", "TensorFlow", ...],
        image: "assets/images/projects/news_summarizer.png"
    }
];
```

### Firebase Integration (Optional)

The `js/firebase-config.js` file is set up to connect to Firebase Firestore, but **requires your credentials**.

**To enable Firebase:**

1. Create project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Firestore Database
3. Update `js/firebase-config.js` with your config:
   ```javascript
   const firebaseConfig = {
       apiKey: "YOUR_API_KEY",
       authDomain: "your-project.firebaseapp.com",
       projectId: "your-project",
       ...
   };
   ```

**Firebase Collections Structure:**
- `projects` - Project entries
- `skills` - Skill items with categories
- `messages` - Contact form submissions

---

## How Data Flows

```
┌─────────────────┐
│   Page Loads    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐     ┌─────────────────┐
│ Check Firebase  │────▶│ Firebase Active │────▶ Fetch from cloud
│   Connection    │     └─────────────────┘
└────────┬────────┘
         │ (if not configured)
         ▼
┌─────────────────┐
│ Use Local Data  │────▶ Render from main.js arrays
│  (main.js)      │
└─────────────────┘
```

---

## Summary

| Aspect | Current State |
|--------|---------------|
| **Frontend** | HTML + CSS + JavaScript (no frameworks) |
| **Hosting** | Local only (GitHub Pages ready) |
| **Database** | Local JS arrays (Firebase optional) |
| **Deployment** | Manual (auto-deploy workflow included) |
