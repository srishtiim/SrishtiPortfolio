# Srishti Mukherjee - Portfolio Website

A modern, responsive portfolio website showcasing my projects, skills, and experience in Computer Science and Data Science.

## 🚀 Features

- Elegant cream/beige design with red accents
- Fully responsive (mobile, tablet, desktop)
- Smooth animations and transitions
- Interactive project showcases with modals
- Contact form with Firebase integration
- Dark mode toggle
- GitHub Pages deployment ready

## 🛠️ Technologies Used

- HTML5
- CSS3 (Grid, Flexbox, Animations)
- Vanilla JavaScript
- Firebase (Firestore for dynamic content)
- GitHub Pages (hosting)

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/srishtiim/srishti-portfolio.git
```

2. Navigate to the project directory:
```bash
cd srishti-portfolio
```

3. Open `index.html` in your browser or use a local server:
```bash
python -m http.server 8000
```

4. Visit `http://localhost:8000`

## 🚀 Deployment

This site is automatically deployed to GitHub Pages. Any push to the `main` branch will trigger a deployment.

### Manual Deployment Steps:

1. Go to repository Settings
2. Navigate to Pages section
3. Select `main` branch as source
4. Click Save
5. Your site will be live at `https://srishtiim.github.io/srishti-portfolio/`

## 🎨 Customization

### Updating Content:

1. **Projects**: Edit the `projectsData` array in `js/main.js`
2. **Skills**: Modify the `skillsData` object in `js/main.js`
3. **Experience**: Update the `experienceData` array in `js/main.js`
4. **Education**: Change `educationData` in `js/main.js`
5. **Contact Info**: Update contact details in `index.html` and `js/main.js`

### Changing Colors:

Update CSS variables in `css/style.css`:
```css
:root {
    --cream: #F5EFE7;
    --beige: #E8DCC4;
    --dark: #1a1a1a;
    --red: #D32F2F;
}
```

## 🔥 Firebase Setup

1. Create a project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Firestore Database
3. Get your config from Project Settings > Web
4. Update `js/firebase-config.js` with your credentials

See `js/firebase-config.js` for detailed setup instructions.

## 📧 Contact Form Setup

The contact form saves to Firebase Firestore. For email notifications, integrate with:
- [EmailJS](https://www.emailjs.com/)
- [Formspree](https://formspree.io/)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Srishti Mukherjee**
- LinkedIn: [@srishti-mukherjee](https://www.linkedin.com/in/srishti-mukherjee/)
- GitHub: [@srishtiim](https://github.com/srishtiim)
- Email: srishtii.mukherjee@gmail.com

## 🙏 Acknowledgments

- Fonts: Google Fonts (Playfair Display, Space Grotesk)
- Icons: Font Awesome
- Hosting: GitHub Pages

---

⭐ Star this repo if you like it!
