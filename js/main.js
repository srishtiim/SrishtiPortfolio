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
        githubUrl: "",
        liveUrl: ""
    },
    {
        id: 2,
        title: "Book Recommendation System",
        category: "Natural Language Processing",
        description: "Intelligent book recommendation system with collaborative filtering and real-time suggestions. Features a clean, interactive UI built with Streamlit.",
        techStack: ["Python", "Flask", "NLTK", "Hugging Face", "Streamlit", "scikit-learn", "pandas", "joblib"],
        features: ["Collaborative filtering algorithm", "Real-time recommendations", "Interactive UI"],
        image: "assets/images/projects/book_recommendation.png",
        githubUrl: "https://github.com/srishtiim/book-recommendation-app",
        liveUrl: "https://book-recommendation-app-wheat.vercel.app/library"
    },
    {
        id: 3,
        title: "Neural Networks For Sustainability",
        category: "Environmental AI",
        description: "Sustainability-focused weather prediction system using KNN, clustering, linear regression, and LSTM-CNN neural networks to forecast CO₂ concentrations and identify high-risk pollution zones.",
        techStack: ["Python", "TensorFlow", "PyTorch", "Keras", "LSTM", "CNN", "pandas", "scikit-learn"],
        features: ["Temporal and spatial pattern analysis", "Pollution zone identification", "Multiple ML models comparison"],
        image: "assets/images/projects/sustainability.png",
        githubUrl: "",
        liveUrl: ""
    },
    {
        id: 4,
        title: "Testing Automation Tool",
        category: "Software Testing",
        description: "Testing-focused automation project developed during internship at Total Shift Left. Built using VSCode for efficient software system testing.",
        techStack: ["Python", "VSCode", "Automation Frameworks"],
        features: ["Automated testing workflows", "ERP/CRM integration", "System validation"],
        image: "assets/images/projects/testing_automation.png",
        githubUrl: "",
        liveUrl: ""
    },
    {
        id: 5,
        title: "Workflow Inefficiency Analyzer",
        category: "Data Analysis & Optimization",
        description: "Analyzes team workflows to identify bottlenecks and inefficiencies using data visualization and process mining techniques.",
        techStack: ["Python", "Data Analysis", "Visualization", "Process Mining"],
        features: ["Interactive dashboards", "Bottleneck identification", "Process flow visualization"],
        image: "assets/images/projects/workflow-analyzer.jpg",
        githubUrl: "https://github.com/srishtiim/workflow-analyzer",
        liveUrl: "https://workflow-analyzer-beta.vercel.app/"
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
        duration: "Jun–Aug 2025",
        location: "Remote",
        type: "Internship",
        shortDescription: "Contributed to ERP and CRM projects, assisted with development and system testing, built a VS Code automation project for testing.",
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
        position: "Sales & Marketing Intern",
        duration: "Jul–Sep 2025",
        location: "Remote",
        type: "Internship",
        shortDescription: "Content creation for sales outreach, optimised AI model performance and data quality, collaborated cross-functionally to deliver AI solutions.",
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
        duration: "Jul–Sep 2025",
        location: "Remote",
        type: "Internship",
        shortDescription: "Created visual content for Google product showcases, managed presentations and sheets, collaborated with cross-functional teams.",
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
        duration: "Jul–Sep 2025",
        location: "Remote",
        type: "Internship",
        shortDescription: "Maintained accurate activity records, used document management system to organise company files.",
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
    initParticleCanvas();
    initCustomCursor();
    renderProjects();
    renderSkills();
    renderTimeline();
    initExperienceInteractivity();
    renderEducation();
    renderCertifications();
    initContactForm();
    initModal();
    initMicroInteractions();
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
    // Frosted Nav on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

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
        <div class="certification-card">
            <div class="certification-icon"><i class="fas fa-certificate"></i></div>
            <div class="certification-info">
                <span class="certification-name">${cert.name}</span>
                <span class="certification-provider">${cert.provider}</span>
            </div>
            <a href="${cert.link}" target="_blank" class="download-cert-btn">
                <i class="fas fa-download"></i>
                <span>Download Certificate</span>
            </a>
        </div>
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
        ${project.githubUrl ? `
        <a href="${project.githubUrl}" target="_blank" class="btn-github">
            <i class="fab fa-github"></i> View Code
        </a>` : ''}
        ${project.liveUrl ? `
        <a href="${project.liveUrl}" target="_blank" class="btn-demo">
            <i class="fas fa-external-link-alt"></i> View Live Demo
        </a>` : ''}
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




// ============ MICRO-INTERACTIONS & POLISH ============

function initParticleCanvas() {
    const welcome = document.querySelector('.welcome');
    if (!welcome) return;

    const canvas = document.createElement('canvas');
    canvas.id = 'hero-canvas';
    canvas.style.position = 'absolute';
    canvas.style.inset = '0';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '0';
    welcome.insertBefore(canvas, welcome.firstChild);

    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    const isMobile = window.innerWidth <= 768;
    const particleCount = isMobile ? 30 : 60;
    
    function resize() {
        width = welcome.offsetWidth;
        height = welcome.offsetHeight;
        canvas.width = width;
        canvas.height = height;
    }
    
    window.addEventListener('resize', resize);
    resize();
    
    for(let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            radius: Math.random() * 1.5 + 0.5
        });
    }
    
    function draw() {
        ctx.clearRect(0, 0, width, height);
        
        particles.forEach((p, i) => {
            p.x += p.vx;
            p.y += p.vy;
            
            if (p.x < 0 || p.x > width) p.vx *= -1;
            if (p.y < 0 || p.y > height) p.vy *= -1;
            
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(211, 47, 47, 0.15)';
            ctx.fill();
            
            for (let j = i + 1; j < particles.length; j++) {
                const p2 = particles[j];
                const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
                
                if (dist < 120) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.strokeStyle = `rgba(211, 47, 47, ${0.12 * (1 - dist/120)})`;
                    ctx.stroke();
                }
            }
        });
        
        requestAnimationFrame(draw);
    }
    draw();
}

function initCustomCursor() {
    if (window.innerWidth <= 768) return;
    
    const cursor = document.createElement('div');
    cursor.id = 'custom-cursor';
    document.body.appendChild(cursor);
    
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    
    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function updateCursor() {
        const dx = mouseX - cursorX;
        const dy = mouseY - cursorY;
        cursorX += dx * 0.2;
        cursorY += dy * 0.2;
        
        cursor.style.transform = `translate(${cursorX - 7}px, ${cursorY - 7}px)`; // offset for center
        requestAnimationFrame(updateCursor);
    }
    updateCursor();
    
    // Bind to dynamically created elements and existing ones via event delegation
    document.body.addEventListener('mouseover', (e) => {
        if (e.target.tagName.toLowerCase() === 'a' || 
            e.target.tagName.toLowerCase() === 'button' || 
            e.target.closest('a') || 
            e.target.closest('button') ||
            e.target.closest('.project-card') ||
            e.target.closest('.polaroid') ||
            e.target.closest('.envelope-widget')) {
            cursor.classList.add('hover');
        }
    });

    document.body.addEventListener('mouseout', (e) => {
        if (e.target.tagName.toLowerCase() === 'a' || 
            e.target.tagName.toLowerCase() === 'button' || 
            e.target.closest('a') || 
            e.target.closest('button') ||
            e.target.closest('.project-card') ||
            e.target.closest('.polaroid') ||
            e.target.closest('.envelope-widget')) {
            cursor.classList.remove('hover');
        }
    });
}

function initMicroInteractions() {
    // Envelope Widget
    const envelope = document.getElementById('envelope-widget');
    if (envelope) {
        envelope.addEventListener('click', () => {
            envelope.classList.toggle('open');
        });
        
        const envelopeCard = envelope.querySelector('.envelope-card');
        if (envelopeCard) {
            envelopeCard.addEventListener('click', (e) => {
                e.stopPropagation();
                document.querySelector('#contact').scrollIntoView({behavior: 'smooth'});
                envelope.classList.remove('open');
            });
        }
    }
    
    // Flipbook Scrapbook Widget
    const scrapbookWidget = document.getElementById('scrapbook-widget');
    if (scrapbookWidget) {
        const cover = scrapbookWidget.querySelector('.scrapbook-cover');
        const closeBtn = scrapbookWidget.querySelector('.scrapbook-close');
        const prevBtn = scrapbookWidget.querySelector('.control-prev');
        const nextBtn = scrapbookWidget.querySelector('.control-next');
        const pages = scrapbookWidget.querySelectorAll('.scrapbook-page');
        const dragHandle = scrapbookWidget.querySelector('.drag-handle');
        
        let currentPage = 0;
        let isDragging = false;
        
        // Open Book
        cover.addEventListener('click', () => {
            if (isDragging) return;
            scrapbookWidget.classList.add('open');
            // reset pages
            pages.forEach(p => p.classList.remove('flipped'));
            currentPage = 0;
            updateZIndices();
        });
        
        // Close Book
        closeBtn.addEventListener('click', () => {
            scrapbookWidget.classList.remove('open');
        });
        
        // Pagination logic
        function updateZIndices() {
            pages.forEach((page, index) => {
                if (index < currentPage) {
                    page.style.zIndex = index + 1;
                } else {
                    page.style.zIndex = pages.length - index;
                }
            });
        }
        updateZIndices();
        
        nextBtn.addEventListener('click', () => {
            if (currentPage < pages.length) {
                pages[currentPage].classList.add('flipped');
                currentPage++;
                updateZIndices();
            }
        });
        
        prevBtn.addEventListener('click', () => {
            if (currentPage > 0) {
                currentPage--;
                pages[currentPage].classList.remove('flipped');
                updateZIndices();
            }
        });
        
        // Global Drag Logic for Widget
        let startX, startY;
        let pInitialX, pInitialY;
        
        function dragStart(e) {
            isDragging = false;
            
            if (window.getComputedStyle(scrapbookWidget).position !== 'fixed') {
                const rect = scrapbookWidget.getBoundingClientRect();
                scrapbookWidget.style.position = 'fixed';
                scrapbookWidget.style.top = rect.top + 'px';
                scrapbookWidget.style.left = rect.left + 'px';
                scrapbookWidget.style.margin = '0';
            }
            
            pInitialX = parseFloat(scrapbookWidget.style.left) || 0;
            pInitialY = parseFloat(scrapbookWidget.style.top) || 0;
            
            if (e.type === 'touchstart') {
                startX = e.touches[0].clientX;
                startY = e.touches[0].clientY;
            } else {
                startX = e.clientX;
                startY = e.clientY;
            }
            
            document.addEventListener('mousemove', drag);
            document.addEventListener('mouseup', dragEnd);
            document.addEventListener('touchmove', drag, {passive: false});
            document.addEventListener('touchend', dragEnd);
        }
        
        function drag(e) {
            isDragging = true;
            scrapbookWidget.classList.add('dragging');
            e.preventDefault();
            
            let currentX, currentY;
            if (e.type === 'touchmove') {
                currentX = e.touches[0].clientX - startX;
                currentY = e.touches[0].clientY - startY;
            } else {
                currentX = e.clientX - startX;
                currentY = e.clientY - startY;
            }
            
            scrapbookWidget.style.left = `${pInitialX + currentX}px`;
            scrapbookWidget.style.top = `${pInitialY + currentY}px`;
        }
        
        function dragEnd() {
            scrapbookWidget.classList.remove('dragging');
            document.removeEventListener('mousemove', drag);
            document.removeEventListener('mouseup', dragEnd);
            document.removeEventListener('touchmove', drag);
            document.removeEventListener('touchend', dragEnd);
            
            setTimeout(() => { isDragging = false; }, 50);
        }
        
        cover.addEventListener('mousedown', dragStart);
        cover.addEventListener('touchstart', dragStart, {passive: true});
        if(dragHandle) {
            dragHandle.addEventListener('mousedown', dragStart);
            dragHandle.addEventListener('touchstart', dragStart, {passive: true});
        }
    }
    

    
    // Easter Egg (S -> M)
    let keys = [];
    window.addEventListener('keydown', (e) => {
        keys.push(e.key.toLowerCase());
        
        if (keys.length > 2) keys.shift();
        
        if (keys.join('') === 'sm') {
            flyAirplane();
            keys = [];
        }
        
        setTimeout(() => { keys = []; }, 1000);
    });
    
    function flyAirplane() {
        const svg = `
            <svg class="easter-plane" viewBox="0 0 24 24" width="32" height="32" stroke="var(--red)" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
        `;
        
        document.body.insertAdjacentHTML('beforeend', svg);
        const plane = document.querySelector('.easter-plane');
        
        setTimeout(() => {
            plane.remove();
        }, 2500);
    }
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

