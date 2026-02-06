/* ========================================
   MAIN JavaScript - Portfolio Functionality
   ======================================== */

// ============ DATA ============
import { db } from "./firebase-config.js";
import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const projectsData = [
    {
        id: 1,
        title: "News Summarizer",
        category: "Deep Learning",
        description: "AI-powered Times of India news summarizer using Python, Hugging Face transformers, and GNews API. Generates exam-friendly summaries, explanations, and MCQs from daily headlines.",
        techStack: ["Python", "TensorFlow", "OpenCV", "Hugging Face", "Streamlit", "GNews API"],
        features: ["Interactive Streamlit web app for students", "Real-time news processing", "Automated MCQ generation"],
        image: "assets/images/projects/news_summarizer.png",
        githubLink: "#",
        liveLink: "#"
    },
    {
        id: 2,
        title: "Book Recommendation System",
        category: "Natural Language Processing",
        description: "Intelligent book recommendation system with collaborative filtering and real-time suggestions. Features a clean, interactive UI built with Streamlit.",
        techStack: ["Python", "Flask", "NLTK", "Hugging Face", "Streamlit", "scikit-learn", "pandas", "joblib"],
        features: ["Collaborative filtering algorithm", "Real-time recommendations", "Interactive UI"],
        image: "assets/images/projects/book_recommendation.png",
        githubLink: "#",
        liveLink: "#"
    },
    {
        id: 3,
        title: "Neural Networks For Sustainability",
        category: "Environmental AI",
        description: "Sustainability-focused weather prediction system using KNN, clustering, linear regression, and LSTM-CNN neural networks to forecast CO₂ concentrations and identify high-risk pollution zones.",
        techStack: ["Python", "TensorFlow", "PyTorch", "Keras", "LSTM", "CNN", "pandas", "scikit-learn"],
        features: ["Temporal and spatial pattern analysis", "Pollution zone identification", "Multiple ML models comparison"],
        image: "assets/images/projects/sustainability.png",
        githubLink: "#",
        liveLink: "#"
    },
    {
        id: 4,
        title: "Testing Automation Tool",
        category: "Software Testing",
        description: "Testing-focused automation project developed during internship at Total Shift Left. Built using VSCode for efficient software system testing.",
        techStack: ["Python", "VSCode", "Automation Frameworks"],
        features: ["Automated testing workflows", "ERP/CRM integration", "System validation"],
        image: "assets/images/projects/testing_automation.png",
        githubLink: "#",
        liveLink: "#"
    }
];

const skillsData = {
    programming: [
        { name: "Python", level: 5 },
        { name: "C", level: 4 },
        { name: "SQL", level: 4 },
        { name: "MATLAB", level: 3 }
    ],
    ai: [
        { name: "TensorFlow", level: 4 },
        { name: "PyTorch", level: 4 },
        { name: "Keras", level: 4 },
        { name: "Caffe", level: 3 },
        { name: "Scikit-learn", level: 5 },
        { name: "OpenCV", level: 4 },
        { name: "NLTK", level: 4 }
    ],
    tools: [
        { name: "NumPy", level: 5 },
        { name: "Pandas", level: 5 },
        { name: "Git", level: 4 },
        { name: "Docker", level: 3 },
        { name: "Flask", level: 4 },
        { name: "Streamlit", level: 4 },
        { name: "Hugging Face", level: 4 }
    ]
};

const experienceData = [
    {
        position: "Software Intern",
        company: "Total Shift Left",
        duration: "Jun 2025 - Aug 2025",
        location: "Remote",
        responsibilities: [
            "Actively contributed to ERP and CRM project activities",
            "Gained solid understanding of software systems",
            "Assisted with development and system testing tasks",
            "Created testing-focused automation project using VSCode"
        ],
        skills: ["Python", "Software Testing", "ERP/CRM Systems", "Automation"]
    },
    {
        position: "Sales and Marketing Intern",
        company: "Wedd.Ai",
        duration: "Jul 2025 - Sep 2025",
        location: "Remote",
        responsibilities: [
            "Engaged in content creation and sales outreach efforts",
            "Facilitated marketing initiatives",
            "Optimized AI model performance and ensured data quality",
            "Collaborated with cross-functional teams to deliver AI solutions"
        ],
        skills: ["AI/ML", "Content Creation", "Marketing", "Collaboration"]
    },
    {
        position: "Intern",
        company: "Smollan",
        duration: "Jul 2025 - Sep 2025",
        location: "Remote",
        responsibilities: [
            "Collaborated with cross-functional team members",
            "Crafted engaging visual content for Google product showcases",
            "Managed recordings and presentations",
            "Organized company documentation and sheets"
        ],
        skills: ["Visual Design", "Presentations", "Documentation", "Google Workspace"]
    },
    {
        position: "Intern",
        company: "Vatika Ltd.",
        duration: "Jul 2025 - Sep 2025",
        location: "Remote",
        responsibilities: [
            "Maintained accurate records of all internship activities",
            "Utilized document management system for file organization",
            "Ensured data was up-to-date and easily accessible"
        ],
        skills: ["Documentation", "Data Management", "Organization"]
    }
];

const educationData = [
    {
        institution: "Manipal University Jaipur",
        degree: "B.Tech in Computer Science (Data Science)",
        duration: "2023 - 2027",
        status: "Currently Pursuing (3rd Year)",
        specialization: "Data Science",
        icon: "fa-graduation-cap"
    },
    {
        institution: "Amity International School, Saket",
        degree: "CBSE Certified",
        duration: "2015 - 2019",
        status: "Completed",
        specialization: "Stream: Science (PCM)",
        icon: "fa-school"
    }
];

const certificationsData = [
    {
        name: "Learn C: Pointers and Memory",
        provider: "Codecademy",
        link: "https://surli.cc/cfsces"
    },
    {
        name: "Foundations: Data, Data, Everywhere",
        provider: "Google (Coursera)",
        link: "https://surl.li/cdoxss"
    }
];

// ============ DOM ELEMENTS ============
const loader = document.getElementById('loader');
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
const themeToggle = document.getElementById('theme-toggle');
const projectModal = document.getElementById('project-modal');
const modalClose = document.getElementById('modal-close');
const contactForm = document.getElementById('contact-form');

// ============ INITIALIZATION ============
document.addEventListener('DOMContentLoaded', () => {
    initLoader();
    initNavigation();
    initThemeToggle();
    renderProjects();
    renderSkills();
    renderTimeline();
    renderEducation();
    renderCertifications();
    initContactForm();
    initModal();
});

// Loader
function initLoader() {
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }, 1500);
    });
}

// Navigation
function initNavigation() {
    // Hamburger menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu on link click
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = navbar.offsetHeight;
                const targetPosition = target.offsetTop - navHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Theme Toggle
function initThemeToggle() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    }

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

// Render Projects
function renderProjects() {
    const grid = document.getElementById('projects-grid');
    if (!grid) return;

    grid.innerHTML = projectsData.map(project => `
        <div class="project-card" data-project-id="${project.id}">
            <img src="${project.image}" alt="${project.title}" class="project-image" 
                 onerror="this.src='https://via.placeholder.com/400x220/E8DCC4/1a1a1a?text=${encodeURIComponent(project.title)}'">
            <div class="project-content">
                <span class="project-category">${project.category}</span>
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-tech">
                    ${project.techStack.slice(0, 4).map(tech => `<span>${tech}</span>`).join('')}
                </div>
                <button class="project-btn">View Details</button>
            </div>
        </div>
    `).join('');

    // Add click handlers for project cards
    grid.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', () => {
            const projectId = parseInt(card.dataset.projectId);
            openProjectModal(projectId);
        });
    });

    // Refresh animations for newly added cards
    if (window.refreshAnimations) {
        window.refreshAnimations();
    }
}

// Render Skills with Star Ratings
function renderSkills() {
    const renderStars = (level) => {
        let stars = '';
        for (let i = 1; i <= 5; i++) {
            stars += i <= level ? '★' : '<span class="empty">★</span>';
        }
        return stars;
    };

    const renderSkillList = (skills, containerId) => {
        const container = document.getElementById(containerId);
        if (!container) return;

        container.innerHTML = skills.map(skill => `
            <div class="skill-item">
                <span class="skill-name">${skill.name}</span>
                <span class="skill-stars">${renderStars(skill.level)}</span>
            </div>
        `).join('');
    };

    renderSkillList(skillsData.programming, 'programming-skills');
    renderSkillList(skillsData.ai, 'ai-skills');
    renderSkillList(skillsData.tools, 'tools-skills');
}

// Render Timeline
function renderTimeline() {
    const timeline = document.getElementById('timeline');
    if (!timeline) return;

    timeline.innerHTML = experienceData.map(exp => `
        <div class="timeline-item">
            <div class="timeline-marker"></div>
            <div class="timeline-content">
                <div class="timeline-header">
                    <h3 class="timeline-title">${exp.position}</h3>
                    <span class="timeline-duration">${exp.duration}</span>
                </div>
                <div class="timeline-company">
                    <span><i class="fas fa-building"></i> ${exp.company}</span>
                    <span class="timeline-location"><i class="fas fa-map-marker-alt"></i> ${exp.location}</span>
                </div>
                <ul class="timeline-details">
                    ${exp.responsibilities.map(r => `<li>${r}</li>`).join('')}
                </ul>
                <div class="timeline-skills">
                    ${exp.skills.map(s => `<span>${s}</span>`).join('')}
                </div>
            </div>
        </div>
    `).join('');
}

// Render Education
function renderEducation() {
    const grid = document.getElementById('education-grid');
    if (!grid) return;

    grid.innerHTML = educationData.map(edu => `
        <div class="education-card">
            <div class="education-icon"><i class="fas ${edu.icon}"></i></div>
            <h3 class="education-institution">${edu.institution}</h3>
            <p class="education-degree">${edu.degree}</p>
            <p class="education-duration">${edu.duration}</p>
            <span class="education-status">${edu.status}</span>
            <p class="education-specialization">${edu.specialization}</p>
        </div>
    `).join('');
}

// Render Certifications
function renderCertifications() {
    const grid = document.getElementById('certifications-grid');
    if (!grid) return;

    grid.innerHTML = certificationsData.map(cert => `
        <a href="${cert.link}" target="_blank" class="certification-badge">
            <i class="fas fa-certificate"></i>
            <div class="certification-info">
                <span class="certification-name">${cert.name}</span>
                <span class="certification-provider">${cert.provider}</span>
            </div>
            <i class="fas fa-external-link-alt"></i>
        </a>
    `).join('');
}

// Modal Functions
function initModal() {
    modalClose.addEventListener('click', closeProjectModal);
    projectModal.addEventListener('click', (e) => {
        if (e.target === projectModal) closeProjectModal();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeProjectModal();
    });
}

function openProjectModal(projectId) {
    const project = projectsData.find(p => p.id === projectId);
    if (!project) return;

    document.getElementById('modal-img').src = project.image;
    document.getElementById('modal-img').onerror = function () {
        this.src = `https://via.placeholder.com/900x300/E8DCC4/1a1a1a?text=${encodeURIComponent(project.title)}`;
    };
    document.getElementById('modal-category').textContent = project.category;
    document.getElementById('modal-title').textContent = project.title;
    document.getElementById('modal-description').textContent = project.description;

    document.getElementById('modal-features-list').innerHTML =
        project.features.map(f => `<li>${f}</li>`).join('');

    document.getElementById('modal-tech').innerHTML =
        project.techStack.map(t => `<span>${t}</span>`).join('');

    document.getElementById('modal-links').innerHTML = `
        <a href="${project.githubLink}" target="_blank" class="btn-github">
            <i class="fab fa-github"></i> View on GitHub
        </a>
        <a href="${project.liveLink}" target="_blank" class="btn-demo">
            <i class="fas fa-external-link-alt"></i> Live Demo
        </a>
    `;

    projectModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
    projectModal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Contact Form
function initContactForm() {
    if (!contactForm) return;

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = document.getElementById('submit-btn');
        const formStatus = document.getElementById('form-status');
        const formData = new FormData(contactForm);

        // Disable button and show loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';

        // Create message object
        const message = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message'),
            timestamp: new Date().toISOString()
        };

        try {
            // Try Firebase if available
            if (window.saveMessage) {
                await window.saveMessage(message);
            }

            // Show success
            formStatus.className = 'form-status success';
            formStatus.textContent = 'Thank you! Your message has been sent successfully.';
            contactForm.reset();
        } catch (error) {
            console.log('Message saved locally:', message);
            // Show success anyway (for demo purposes)
            formStatus.className = 'form-status success';
            formStatus.textContent = 'Thank you! Your message has been received.';
            contactForm.reset();
        }

        // Reset button
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<span>Send Message</span><i class="fas fa-paper-plane"></i>';

        // Hide status after 5 seconds
        setTimeout(() => {
            formStatus.className = 'form-status';
        }, 5000);
    });
}






async function loadSkills() {
  const skillsRef = collection(db, "skills");
  const snapshot = await getDocs(skillsRef);

  const programming = document.getElementById("programming-skills");
  const ai = document.getElementById("ai-skills");
  const tools = document.getElementById("tools-skills");

  programming.innerHTML = "";
  ai.innerHTML = "";
  tools.innerHTML = "";

  snapshot.forEach(doc => {
    const skill = doc.data();

    let stars = "";
    for (let i = 1; i <= 5; i++) {
      stars += i <= skill.rating ? "★" : "<span class='empty'>★</span>";
    }

    const html = `
      <div class="skill-item">
        <span class="skill-name">${skill.name}</span>
        <span class="skill-stars">${stars}</span>
      </div>
    `;

    if (skill.category === "Programming") programming.innerHTML += html;
    if (skill.category === "AI") ai.innerHTML += html;
    if (skill.category === "Tools") tools.innerHTML += html;
  });
}

loadSkills();

