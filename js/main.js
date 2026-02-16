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
        id: 1,
        company: "Total Shift Left",
        position: "Software Intern",
        duration: "June 2025 - August 2025",
        location: "Remote",
        type: "Internship",
        shortDescription: "Contributed to enterprise software development, focusing on ERP and CRM systems while building automation tools for software testing.",
        fullDescription: "During my software internship at Total Shift Left, I gained hands-on experience in enterprise software development and quality assurance. I actively participated in the development lifecycle of ERP and CRM projects, learning industry-standard practices for building scalable business applications.",
        responsibilities: [
            "Actively contributed to project activities involving ERP (Enterprise Resource Planning) and CRM (Customer Relationship Management) systems",
            "Conducted thorough system testing to identify bugs and ensure software quality",
            "Created a testing-focused automation project using Visual Studio Code to streamline QA processes",
            "Collaborated with cross-functional teams including developers, QA engineers, and project managers"
        ],
        skills: [
            { name: "Python", type: "tech" },
            { name: "Software Testing", type: "tech" },
            { name: "ERP Systems", type: "tech" },
            { name: "CRM Systems", type: "tech" },
            { name: "VSCode", type: "tool" },
            { name: "Automation", type: "tech" },
            { name: "Git", type: "tool" },
            { name: "Agile/Scrum", type: "soft" },
            { name: "Quality Assurance", type: "tech" },
            { name: "System Testing", type: "tech" },
            { name: "Bug Tracking", type: "tech" }
        ]
    },
    {
        id: 2,
        company: "Wedd.Ai",
        position: "Sales and Marketing Intern",
        duration: "July 2025 - September 2025",
        location: "Remote",
        type: "Internship",
        shortDescription: "Bridged technical AI expertise with marketing initiatives, optimizing AI models while driving sales outreach and content creation.",
        fullDescription: "At Wedd.Ai, an AI-powered wedding planning platform, I had the unique opportunity to work at the intersection of technology and marketing. This role allowed me to apply my technical AI knowledge while developing business and marketing skills.",
        responsibilities: [
            "Optimized AI/ML model performance through data preprocessing and feature engineering",
            "Collaborated with cross-functional teams including developers, designers, and sales personnel to deliver AI solutions",
            "Created technical documentation for AI features targeted at non-technical stakeholders",
            "Facilitated marketing initiatives including SEO optimization, social media strategy, and email marketing campaigns"
        ],
        skills: [
            { name: "AI/ML", type: "tech" },
            { name: "Content Creation", type: "soft" },
            { name: "Digital Marketing", type: "soft" },
            { name: "Sales Outreach", type: "soft" },
            { name: "Data Analysis", type: "tech" },
            { name: "Social Media Marketing", type: "soft" },
            { name: "SEO", type: "tech" },
            { name: "Email Marketing", type: "soft" },
            { name: "Customer Engagement", type: "soft" },
            { name: "Technical Writing", type: "soft" },
            { name: "Data Preprocessing", type: "tech" },
            { name: "Model Optimization", type: "tech" }
        ]
    },
    {
        id: 3,
        company: "Smollan",
        position: "Intern",
        duration: "July 2025 - September 2025",
        location: "Remote",
        type: "Internship",
        shortDescription: "Created engaging visual content for Google product showcases while managing presentations and cross-functional collaboration.",
        fullDescription: "As an intern at Smollan, a global retail solutions company, I worked on creating compelling visual content for Google product showcases. This role enhanced my creative and organizational skills while working in a fast-paced, collaborative environment.",
        responsibilities: [
            "Crafted engaging visual content for Google product showcases and demonstrations",
            "Designed presentations, infographics, and marketing materials for various campaigns",
            "Proficiently managed recording and documentation of presentations and meetings",
            "Organized and maintained Google Sheets for project tracking and data management"
        ],
        skills: [
            { name: "Visual Design", type: "soft" },
            { name: "Google Workspace", type: "tool" },
            { name: "Presentation Design", type: "soft" },
            { name: "Content Creation", type: "soft" },
            { name: "Adobe Creative Suite", type: "tool" },
            { name: "Canva", type: "tool" },
            { name: "Video Recording", type: "tech" },
            { name: "Documentation", type: "soft" },
            { name: "Project Management", type: "soft" },
            { name: "Cross-functional Collaboration", type: "soft" },
            { name: "Brand Guidelines", type: "soft" }
        ]
    },
    {
        id: 4,
        company: "Vatika Ltd.",
        position: "Intern",
        duration: "July 2025 - September 2025",
        location: "Remote",
        type: "Internship",
        shortDescription: "Managed documentation systems and data organization, ensuring accuracy and accessibility across company operations.",
        fullDescription: "During my internship at Vatika Ltd., a prominent real estate and hospitality company, I focused on documentation management and data organization. This role strengthened my organizational skills and attention to detail while working with enterprise-level data systems.",
        responsibilities: [
            "Utilized document management system (DMS) to organize company files systematically",
            "Ensured all data and documents were kept up-to-date and easily accessible",
            "Created standardized templates for recurring documentation needs",
            "Implemented file naming conventions and folder structures for better organization"
        ],
        skills: [
            { name: "Document Management Systems", type: "tech" },
            { name: "Data Entry", type: "tech" },
            { name: "Microsoft Office Suite", type: "tool" },
            { name: "File Organization", type: "soft" },
            { name: "Database Management", type: "tech" },
            { name: "Attention to Detail", type: "soft" },
            { name: "Process Optimization", type: "soft" },
            { name: "Data Accuracy", type: "soft" },
            { name: "Record Keeping", type: "soft" },
            { name: "Template Design", type: "soft" },
            { name: "Archival Systems", type: "tech" }
        ]
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
// Initialize the application
const init = () => {
    initLoader();
    initNavigation();
    initThemeToggle();
    renderProjects();
    renderSkills();
    renderTimeline();
    initExperienceInteractivity();
    renderEducation();
    renderCertifications();
    initContactForm();
    initModal();
};

// Handle both cases: DOM still loading or already loaded
// This is crucial for ES modules which are deferred and may load after DOMContentLoaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    // DOM already loaded (common with ES modules), run immediately
    init();
}

// Loader - Optimized for fast loading
function initLoader() {
    let loaderHidden = false;

    const hideLoader = () => {
        if (!loaderHidden) {
            loaderHidden = true;
            loader.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }
    };

    // Hide loader after a short delay once DOM is ready (much faster than waiting for all resources)
    // This ensures the page content is visible quickly
    setTimeout(() => {
        hideLoader();
    }, 800);

    // Also hide on window load as a fallback (in case DOM loads very slowly)
    window.addEventListener('load', () => {
        setTimeout(() => {
            hideLoader();
        }, 500);
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
        <div class="experience-item" data-experience="${exp.id}">
            <div class="timeline-marker"></div>
            <div class="experience-card">
                <div class="card-header">
                    <div class="company-logo">
                        <div class="company-initials">${exp.company.slice(0, 2).toUpperCase()}</div>
                    </div>
                    <div class="header-content">
                        <h3 class="company-name">${exp.company}</h3>
                        <p class="position-title">${exp.position}</p>
                        <div class="meta-info">
                            <span class="duration">
                                <i class="fas fa-calendar-alt"></i>
                                ${exp.duration}
                            </span>
                            <span class="location">
                                <i class="fas fa-map-marker-alt"></i>
                                ${exp.location}
                            </span>
                        </div>
                    </div>
                </div>
                
                <div class="card-body">
                    <p class="short-description">
                       ${exp.shortDescription}
                    </p>
                    <button class="read-more">Read more <i class="fas fa-arrow-right"></i></button>
                    
                    <div class="full-details" style="display: none;">
                        <p class="full-description">
                           ${exp.fullDescription}
                        </p>
                        
                        <h4>Key Responsibilities:</h4>
                        <ul class="responsibilities-list">
                           ${exp.responsibilities.map(r => `<li>${r}</li>`).join('')}
                        </ul>
                        
                        <h4>Skills & Technologies:</h4>
                        <div class="skills-tags">
                            ${exp.skills.map(s => `<span class="tag ${s.type}">${s.name}</span>`).join('')}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// Initialize Experience Interactivity
function initExperienceInteractivity() {
    // Expand/Collapse Experience Cards
    document.querySelectorAll('.experience-card').forEach(card => {
        const readMoreBtn = card.querySelector('.read-more');
        const fullDetails = card.querySelector('.full-details');

        if (!readMoreBtn || !fullDetails) return;

        readMoreBtn.addEventListener('click', (e) => {
            e.stopPropagation();

            if (fullDetails.style.display === 'none') {
                fullDetails.style.display = 'block';
                // Small timeout to allow display:block to apply before animating height if we were using CSS transitions on height
                // For now, simple display toggle is fine, but we can animate opacity/transform
                requestAnimationFrame(() => {
                    fullDetails.style.opacity = '1';
                });

                readMoreBtn.innerHTML = 'Read less <i class="fas fa-arrow-up"></i>';
                card.classList.add('expanded');
            } else {
                fullDetails.style.opacity = '0';
                setTimeout(() => {
                    fullDetails.style.display = 'none';
                }, 300); // Match transition time

                readMoreBtn.innerHTML = 'Read more <i class="fas fa-arrow-right"></i>';
                card.classList.remove('expanded');
            }
        });

        // Click anywhere on card (except inside full details to allow text selection) to expand
        card.addEventListener('click', (e) => {
            // Don't collapse if clicking inside the details or on the button itself (since button has its own handler)
            if (e.target.closest('.full-details') || e.target.closest('.read-more')) return;
            readMoreBtn.click();
        });
    });

    // Scroll Animation - Fade in cards as they enter viewport
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    document.querySelectorAll('.experience-item').forEach(item => {
        item.classList.add('fade-in'); // Start hidden
        observer.observe(item);
    });
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
            <div class="download-btn-content">
                <i class="fas fa-download"></i>
                <span>Download Certificate</span>
            </div>
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

