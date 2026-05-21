/* ========================================
   MAIN JavaScript - Portfolio Functionality
   ======================================== */

import { db } from "./firebase-config.js";
import {
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Nuclear loader kill — runs before anything else
function hideLoader() {
    const loader = document.getElementById('page-loader');
    if (loader) {
        loader.classList.add('force-hide');
    }
}
window.addEventListener('load', hideLoader);
document.addEventListener('DOMContentLoaded', hideLoader);
setTimeout(hideLoader, 2000);

// ============ DATA ============

const projectsData = [
    {
        id: 1,
        title: "News Summarizer",
        category: "Deep Learning",
        description: "AI-powered Times of India news summarizer using Python, Hugging Face transformers, and GNews API. Generates exam-friendly summaries, explanations, and MCQs from daily headlines.",
        techStack: ["Python", "TensorFlow", "OpenCV", "Hugging Face", "Streamlit", "GNews API"],
        features: ["Interactive Streamlit web app for students", "Real-time news processing", "Automated MCQ generation"],
        image: "assets/images/projects/news_summarizer.png",
        githubUrl: "https://github.com/srishtiim/news-summarizer",
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
        liveUrl: "",
        downloadPaper: "assets/neural-networks-sustainability.pdf"
    },
    {
        id: 5,
        title: "Workflow Analyzer",
        category: "Data Analysis & Optimization",
        description: "Analyzes team workflows to identify bottlenecks and inefficiencies using data visualization and process mining techniques.",
        techStack: ["Python", "Data Analysis", "Visualization", "Process Mining"],
        features: ["Interactive dashboards", "Bottleneck identification", "Process flow visualization"],
        image: "assets/images/projects/workflow-analyzer.jpg",
        githubUrl: "https://github.com/srishtiim/workflow-analyzer",
        liveUrl: "https://workflow-analyzer-beta.vercel.app/"
    },
    {
        id: 6,
        title: "Stock Data Intelligence Dashboard",
        category: "Financial Technology",
        description: "A mini fintech platform built during an internship that tracks real NSE stock data. Features a Python FastAPI backend, SQLite database, and a machine learning engine using Linear Regression to generate 7-day stock price forecasts. Includes a volatility score metric, top gainers/losers, and stock comparison tools.",
        techStack: ["Python", "FastAPI", "SQLite", "scikit-learn", "yfinance", "Chart.js", "HTML/CSS"],
        features: ["7-day stock price forecasts", "Volatility score metric", "Stock comparison tools"],
        image: "assets/images/projects/stock-dashboard.png",
        githubUrl: "https://github.com/srishtiim/stock-dashboard",
        liveUrl: "https://finance-dashboard-two-mu.vercel.app/"
    },
    {
        id: 7,
        title: "Clause Guard",
        category: "Legal Technology",
        description: "An AI-powered legal technology platform that analyzes rental agreements and lease documents. Uses NLP and Retrieval-Augmented Generation (RAG) to identify predatory or illegal clauses, scores risk from 0–100, and translates complex legal jargon into plain English. Built with jurisdiction awareness for Indian Tenancy Laws.",
        techStack: ["FastAPI", "Python", "LangChain", "Ollama", "ChromaDB", "Tesseract OCR", "Next.js", "TypeScript"],
        features: ["Predatory clause identification", "0-100 risk scoring", "Plain English translations"],
        image: "assets/images/projects/clause-guard.png",
        githubUrl: "https://github.com/weblaze/clause-guard",
        liveUrl: "https://clause-guard-pi.vercel.app/"
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
    creative_tools: [
        { name: "Canva", level: 4 },
        { name: "Adobe Creative Suite", level: 4 },
        { name: "Visual Design", level: 4 },
        { name: "Template Design", level: 4 },
        { name: "Presentation Design", level: 4 }
    ],
    dev_tools: [
        { name: "VSCode", level: 5 },
        { name: "Git", level: 4 },
        { name: "Docker", level: 3 },
        { name: "Streamlit", level: 4 },
        { name: "Flask", level: 4 },
        { name: "Hugging Face", level: 4 }
    ],
    data_tools: [
        { name: "Pandas", level: 5 },
        { name: "NumPy", level: 5 },
        { name: "MATLAB", level: 3 },
        { name: "SQL", level: 4 },
        { name: "Data Preprocessing", level: 4 },
        { name: "Data Accuracy", level: 4 }
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
// loader is now handled by nuclear hideLoader at top of file
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
    // Loader is now handled by nuclear hideLoader at top of file
    initNavigation();
    initThemeToggle();
    initParticleCanvas();
    initCustomCursor();
    renderProjects();
    renderSkills();
    renderTimeline();
    // initExperienceInteractivity(); // replaced by terminal
    renderEducation();
    renderCertifications();
    initNotebookSpread();
    initContactForm();
    initModal();
    initMicroInteractions();
    initHeroSpotlight();
    
    // Bold Effects
    init3DTiltHero();
    initDeveloperDissolve();
    initMagneticContacts();
    initBentoHero();
};

// Handle both cases: DOM still loading or already loaded
// This is crucial for ES modules which are deferred and may load after DOMContentLoaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    // DOM already loaded (common with ES modules), run immediately
    init();
}

// Loader is now handled by nuclear hideLoader at top of file

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
// Render Projects (Effect 3: Conveyor Belt)
function renderProjects() {
    const belt = document.getElementById('projects-belt');
    const dotsContainer = document.getElementById('conveyor-dots');
    if (!belt) return;

    belt.innerHTML = projectsData.map((project, index) => {
        let buttonsHtml = '';
        if (project.liveUrl) buttonsHtml += `<a href="${project.liveUrl}" target="_blank" class="btn btn-primary project-action-btn">Live Demo</a>`;
        if (project.downloadPaper) buttonsHtml += `<a href="${project.downloadPaper}" download class="btn btn-primary project-action-btn">Download Paper</a>`;
        if (project.githubUrl) buttonsHtml += `<a href="${project.githubUrl}" target="_blank" class="btn btn-secondary project-action-btn">View Repository</a>`;

        return `
        <div class="project-card" data-project-id="${project.id}">
            <div class="card-inner">
                <div class="card-front">
                    <img src="${project.image}" alt="${project.title}" class="project-image" onerror="this.src='https://via.placeholder.com/400x220/E8DCC4/1a1a1a?text=${encodeURIComponent(project.title)}'">
                    <div class="project-content">
                        <span class="project-category">${project.category}</span>
                        <h3 class="project-title">${project.title}</h3>
                        <p class="project-description">${project.description.split('.')[0] + '.'}</p>
                    </div>
                </div>
                <div class="card-back">
                    <div class="project-tech">
                        ${project.techStack.map(tech => `<span>${tech}</span>`).join('')}
                    </div>
                    <p class="project-description">${project.description}</p>
                    <div class="project-actions" style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
                        ${buttonsHtml}
                    </div>
                </div>
            </div>
        </div>`;
    }).join('');

    if (dotsContainer) {
        dotsContainer.innerHTML = projectsData.map((_, i) => `<div class="conveyor-dot ${i === 0 ? 'active' : ''}"></div>`).join('');
    }

    const wrapper = document.getElementById('projects-track-wrapper');
    if (window.innerWidth < 768) return;

    wrapper.style.height = `calc(100vh + ${projectsData.length * 80}vh)`;
    let currentTranslate = 0;
    let targetTranslate = 0;
    let isActive = false;

    const observer = new IntersectionObserver(entries => {
        isActive = entries[0].isIntersecting;
    });
    observer.observe(wrapper);

    const dots = dotsContainer ? dotsContainer.querySelectorAll('.conveyor-dot') : [];

    function renderLoop() {
        if (isActive) {
            currentTranslate += (targetTranslate - currentTranslate) * 0.1;
            belt.style.transform = `translate3d(${-currentTranslate}px, 0, 0)`;

            if (dots.length > 0) {
                const totalScroll = belt.scrollWidth - window.innerWidth;
                const progress = totalScroll > 0 ? currentTranslate / totalScroll : 0;
                const activeIndex = Math.min(Math.max(Math.floor(progress * projectsData.length), 0), projectsData.length - 1);
                dots.forEach((dot, i) => dot.classList.toggle('active', i === activeIndex));
            }
        }
        requestAnimationFrame(renderLoop);
    }
    renderLoop();

    window.addEventListener('scroll', () => {
        if (!isActive) return;
        const rect = wrapper.getBoundingClientRect();
        const maxScroll = rect.height - window.innerHeight;
        let progress = Math.abs(rect.top) / maxScroll;
        if (rect.top > 0) progress = 0;
        if (rect.top < -maxScroll) progress = 1;
        targetTranslate = progress * (belt.scrollWidth - window.innerWidth + 48); // 48px margin padding
    });
}

// Render Skills with Star Ratings
// Render Skills (Effect 4: Constellation Canvas)
function renderSkills() {
    const canvas = document.getElementById('skills-constellation');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    const expGroups = {
        'business': { label: 'Business & Operations', items: ['CRM Systems', 'ERP Systems', 'Process Optimization', 'Database Management', 'File Organization', 'Record Keeping'] },
        'marketing': { label: 'Marketing & Comms', items: ['Social Media Marketing', 'Digital Marketing', 'Sales Outreach', 'Customer Engagement', 'Content Creation', 'Technical Writing'] },
        'quality': { label: 'Quality & Testing', items: ['Software Testing', 'Bug Tracking', 'Quality Assurance', 'Automation', 'Data Analysis', 'Model Optimization'] }
    };
    
    let allSkills = [];
    Object.keys(skillsData).forEach(catKey => {
        skillsData[catKey].forEach(s => {
            if (!allSkills.find(sk => sk.name === s.name)) {
                allSkills.push({ name: s.name, category: catKey });
            }
        });
    });
    experienceData.forEach(exp => exp.skills.forEach(s => {
        if (!allSkills.find(sk => sk.name === s.name)) {
            allSkills.push({ name: s.name, category: 'experience' });
        }
    }));
    
    // Nodes - positions will be corrected to zone bounds after resize()
    let nodes = allSkills.map(s => ({
        name: s.name,
        category: s.category,
        x: 0,
        y: 0,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        radius: 6,
        targetRadius: 6,
        hovered: false,
        connectedHovered: false,
        _randX: Math.random(), // store random factors for zone placement
        _randY: Math.random()
    }));

    // Random connections for demo
    let edges = [];
    for (let i = 0; i < nodes.length; i++) {
        const numEdges = Math.floor(Math.random() * 2) + 1;
        for(let j = 0; j < numEdges; j++) {
            const target = Math.floor(Math.random() * nodes.length);
            if (i !== target) edges.push([i, target]);
        }
    }

    const zones = {};
    function updateZones() {
        const padding = 20;
        const w = Math.max(0, (canvas.width - padding * 3) / 2);
        const h = Math.max(0, (canvas.height - padding * 3) / 2);
        
        zones['programming'] = { x: padding, y: padding, w, h, label: 'PROGRAMMING & LANGUAGES' };
        zones['ai']          = { x: padding * 2 + w, y: padding, w, h, label: 'AI & MACHINE LEARNING' };
        const gap = 10;
        const w3 = Math.max(0, (w - gap * 2) / 3);
        zones['creative_tools'] = { x: padding, y: padding * 2 + h, w: w3, h, label: 'CREATIVE TOOLS' };
        zones['dev_tools']      = { x: padding + w3 + gap, y: padding * 2 + h, w: w3, h, label: 'DEV TOOLS' };
        zones['data_tools']     = { x: padding + (w3 + gap) * 2, y: padding * 2 + h, w: w3, h, label: 'DATA TOOLS' };
        zones['experience']  = { x: padding * 2 + w, y: padding * 2 + h, w, h, label: 'EXPERIENCE & DOMAIN' };
    }

    function resize() {
        canvas.width = canvas.parentElement.offsetWidth;
        canvas.height = 500;
        updateZones();
        // Reposition nodes inside their zones after resize using stored random factors
        nodes.forEach(n => {
            if (n.category === 'experience') {
                const z = zones['experience'];
                let groupIdx = -1;
                let itemIdx = -1;
                const groupKeys = Object.keys(expGroups);
                for (let i = 0; i < groupKeys.length; i++) {
                    const idx = expGroups[groupKeys[i]].items.indexOf(n.name);
                    if (idx !== -1) {
                        groupIdx = i;
                        itemIdx = idx;
                        break;
                    }
                }
                
                if (groupIdx !== -1) {
                    const rowH = z.h / 3;
                    const rowY = z.y + groupIdx * rowH;
                    const totalItems = expGroups[groupKeys[groupIdx]].items.length;
                    const itemsPerRow = Math.ceil(totalItems / 2);
                    const row = Math.floor(itemIdx / itemsPerRow);
                    const col = itemIdx % itemsPerRow;
                    const cellW = (z.w - 10) / itemsPerRow;
                    
                    const startY = groupIdx === 0 ? rowY + 45 : rowY + 20;
                    const availH = rowY + rowH - startY;
                    const cellH = availH / 2;
                    
                    n.x = z.x + 5 + col * cellW + cellW / 2;
                    n.y = startY + row * cellH + cellH / 2;
                    n.vx = 0;
                    n.vy = 0;
                } else {
                    n.x = z.x + n._randX * z.w;
                    n.y = z.y + n._randY * z.h;
                    n.vx = 0;
                    n.vy = 0;
                }
            } else {
                const z = zones[n.category] || zones['programming'];
                const margin = 20;
                n.x = z.x + margin + n._randX * (z.w - margin * 2);
                n.y = z.y + margin + n._randY * (z.h - margin * 2);
            }
        });
    }
    window.addEventListener('resize', resize);
    resize(); // This now also calls updateZones() and positions all nodes

    let mouseX = -1000, mouseY = -1000;
    canvas.addEventListener('mousemove', e => {
        const rect = canvas.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
    });
    canvas.addEventListener('mouseleave', () => {
        mouseX = -1000; mouseY = -1000;
    });

    function loop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        updateZones();
        
        // Draw zones
        ctx.textAlign = 'left';
        
        Object.values(zones).forEach(z => {
            ctx.strokeStyle = 'rgba(0,0,0,0.7)';
            ctx.lineWidth = 2;
            ctx.beginPath();
            
            // Ensure width and height are non-negative to prevent DOMException
            const safeW = Math.max(0, z.w);
            const safeH = Math.max(0, z.h);
            
            if (ctx.roundRect) {
                ctx.roundRect(z.x, z.y, safeW, safeH, 12);
            } else {
                ctx.rect(z.x, z.y, safeW, safeH); // fallback for older browsers
            }
            ctx.stroke();
            
            ctx.fillStyle = '#1a1a1a';
            ctx.font = '600 13px sans-serif';
            ctx.fillText(z.label.toUpperCase(), z.x + 10, z.y + 20);
            
            if (z.label === 'EXPERIENCE & DOMAIN') {
                const rowH = z.h / 3;
                const groupKeys = Object.keys(expGroups);
                for (let i = 0; i < 3; i++) {
                    const rowY = z.y + i * rowH;
                    if (i > 0) {
                        ctx.strokeStyle = 'rgba(0,0,0,0.1)';
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(z.x + 10, rowY);
                        ctx.lineTo(z.x + z.w - 10, rowY);
                        ctx.stroke();
                    }
                    ctx.fillStyle = 'rgba(0,0,0,0.6)';
                    ctx.font = 'italic 11px sans-serif';
                    const textY = i === 0 ? rowY + 38 : rowY + 18;
                    ctx.fillText(expGroups[groupKeys[i]].label, z.x + 10, textY);
                }
            }
        });
        
        // Repulsion & bounds
        nodes.forEach((n, i) => {
            if (n.category !== 'experience') {
                n.x += n.vx;
                n.y += n.vy;
                
                const z = zones[n.category] || zones['programming'];
                
                if (n.x - n.radius < z.x) { n.x = z.x + n.radius; n.vx *= -1; }
                if (n.x + n.radius > z.x + z.w) { n.x = z.x + z.w - n.radius; n.vx *= -1; }
                if (n.y - n.radius < z.y) { n.y = z.y + n.radius; n.vy *= -1; }
                if (n.y + n.radius > z.y + z.h) { n.y = z.y + z.h - n.radius; n.vy *= -1; }
            }

            // Hover check
            const distToMouse = Math.hypot(n.x - mouseX, n.y - mouseY);
            if (distToMouse < 40) {
                n.hovered = true;
                n.targetRadius = 10;
            } else {
                n.hovered = false;
                n.targetRadius = 6;
            }
            n.connectedHovered = false;
        });

        // Edges
        ctx.lineWidth = 1;
        edges.forEach(([i, j]) => {
            const n1 = nodes[i];
            const n2 = nodes[j];
            if (n1.hovered || n2.hovered) {
                if(n1.hovered) n2.connectedHovered = true;
                if(n2.hovered) n1.connectedHovered = true;
                ctx.strokeStyle = `rgba(211, 47, 47, 0.8)`;
                ctx.lineWidth = 2;
            } else {
                ctx.strokeStyle = `rgba(211, 47, 47, 0.15)`;
                ctx.lineWidth = 1;
            }
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.stroke();
        });

        // Draw nodes
        const anyHovered = nodes.some(n => n.hovered);
        nodes.forEach(n => {
            n.radius += (n.targetRadius - n.radius) * 0.2;
            
            let currentRadius = n.radius;
            if (n.connectedHovered) {
                currentRadius = 6 + Math.sin(Date.now() / 100) * 2;
            }

            ctx.globalAlpha = (anyHovered && !n.hovered && !n.connectedHovered) ? 0.3 : 1;
            
            ctx.beginPath();
            ctx.arc(n.x, n.y, currentRadius, 0, Math.PI * 2);
            ctx.fillStyle = '#D32F2F';
            ctx.fill();
            
            ctx.fillStyle = getComputedStyle(document.body).getPropertyValue('--dark').trim() || '#1a1a1a';
            ctx.font = n.hovered ? 'bold 16px sans-serif' : '12px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(n.name, n.x, n.y + currentRadius + 12);
        });
        
        ctx.globalAlpha = 1;

        requestAnimationFrame(loop);
    }
    
    // Entry animation
    nodes.forEach(n => {
        const targetX = n.x;
        const targetY = n.y;
        const z = zones[n.category] || zones['programming'];
        n.x = z.x + z.w / 2;
        n.y = z.y + z.h / 2;
        
        let t = 0;
        function entry() {
            t += 0.02;
            if (t > 1) t = 1;
            const easeOutElastic = (x) => x === 0 ? 0 : x === 1 ? 1 : Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * ((2 * Math.PI) / 3)) + 1;
            const startX = z.x + z.w / 2;
            const startY = z.y + z.h / 2;
            n.x = startX + (targetX - startX) * easeOutElastic(t);
            n.y = startY + (targetY - startY) * easeOutElastic(t);
            if (t < 1) requestAnimationFrame(entry);
        }
        
        const obs = new IntersectionObserver(e => {
            if(e[0].isIntersecting) {
                updateZones(); // ensure zones are ready
                entry();
                obs.disconnect();
            }
        });
        obs.observe(canvas);
    });

    loop();
}

// Render Timeline
// Render Experience (Effect 5: Terminal Experience)
function renderTimeline() {
    const timeline = document.getElementById('timeline');
    const prompt = document.getElementById('terminal-prompt');
    if (!timeline || !prompt) return;

    let html = '';
    experienceData.forEach(exp => {
        html += `<div class="terminal-line empty"></div>`;
        html += `<div class="terminal-line company">▸ ${exp.company}</div>`;
        html += `<div class="terminal-line role">${exp.position}</div>`;
        html += `<div class="terminal-line duration">${exp.duration} | ${exp.location}</div>`;
        exp.responsibilities.forEach(r => {
            html += `<div class="terminal-line bullet">  → ${r}</div>`;
        });
    });
    
    timeline.innerHTML = html;
    const lines = timeline.querySelectorAll('.terminal-line');
    lines.forEach(l => l.style.display = 'none');
    
    const observer = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
            observer.disconnect();
            
            // Type prompt
            const promptText = "$ cat experience.log";
            let i = 0;
            function typePrompt() {
                if (i < promptText.length) {
                    prompt.textContent += promptText.charAt(i);
                    i++;
                    setTimeout(typePrompt, 40);
                } else {
                    setTimeout(showLines, 300);
                }
            }
            
            let lineIdx = 0;
            function showLines() {
                if (lineIdx < lines.length) {
                    lines[lineIdx].style.display = 'block';
                    lineIdx++;
                    setTimeout(showLines, 80);
                }
            }
            
            typePrompt();
        }
    }, { threshold: 0.2 });
    
    observer.observe(document.querySelector('.terminal-frame'));
}

function initExperienceInteractivity() {
    // Replaced by terminal logic, kept empty to satisfy existing calls if any
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

// Effect 2: Cursor Spotlight / Torch Effect
function initHeroSpotlight() {
    const hero = document.querySelector('.welcome');
    const spotlight = document.getElementById('hero-spotlight');
    
    if (!hero || !spotlight) return;
    
    // Disable on mobile
    if (window.innerWidth < 768) return;

    hero.addEventListener('mousemove', (e) => {
        const rect = hero.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        spotlight.style.setProperty('--x', `${x}px`);
        spotlight.style.setProperty('--y', `${y}px`);
    });

    hero.addEventListener('mouseenter', () => {
        spotlight.style.opacity = '1';
        // Fade to 1 over 0.3s (handled by JS overriding CSS transition if we wanted, 
        // but CSS already handles the transition differences based on opacity values)
        spotlight.style.transitionDuration = '0.3s';
    });

    hero.addEventListener('mouseleave', () => {
        spotlight.style.opacity = '0';
        // Fade to 0 over 0.4s
        spotlight.style.transitionDuration = '0.4s';
    });
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
    

    
    // Filing Cabinet Widget
    const cabinetWidget = document.getElementById('cabinet-widget');
    if (cabinetWidget) {
        const topDrawer = cabinetWidget.querySelector('.drawer-top');
        const resumePaper = cabinetWidget.querySelector('.resume-paper');
        
        if (topDrawer) {
            topDrawer.addEventListener('click', (e) => {
                topDrawer.classList.toggle('open');
            });
        }
        
        if (resumePaper) {
            resumePaper.addEventListener('click', (e) => {
                e.stopPropagation(); // prevent toggling drawer when clicking paper
                const link = document.createElement('a');
                link.href = 'assets/SrishtiMukherjee-Resume.pdf';
                link.download = 'SrishtiMukherjee-Resume.pdf';
                link.click();
            });
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

// ========================================
// BOLD EFFECTS IMPLEMENTATIONS
// ========================================

// Effect 1: 3D Tilt Hero
function init3DTiltHero() {
    const hero = document.querySelector('.welcome');
    const layers = {
        bg: document.querySelector('.layer-bg'),
        creative: document.querySelector('.layer-creative'),
        developer: document.querySelector('.layer-developer'),
        name: document.querySelector('.layer-name')
    };
    
    if (!hero || !layers.bg) return;

    let targetRotX = 0;
    let targetRotY = 0;
    let currRotX = 0;
    let currRotY = 0;

    hero.addEventListener('mousemove', (e) => {
        if (window.innerWidth < 768) return;
        const rect = hero.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        targetRotX = (y / rect.height) * 30; // -15 to 15
        targetRotY = (x / rect.width) * 30;
    });

    hero.addEventListener('mouseleave', () => {
        targetRotX = 0;
        targetRotY = 0;
    });

    function renderParallax() {
        if (window.innerWidth >= 768) {
            currRotX += (targetRotX - currRotX) * 0.08;
            currRotY += (targetRotY - currRotY) * 0.08;
            
            if (layers.bg) layers.bg.style.transform = `translate(${currRotY * 0.5}px, ${currRotX * 0.5}px)`;
            if (layers.creative) layers.creative.style.transform = `translate(${currRotY * 1.2}px, ${currRotX * 1.2}px)`;
            if (layers.developer) layers.developer.style.transform = `translate(${currRotY * 2}px, ${currRotX * 2}px)`;
            if (layers.name) layers.name.style.transform = `translate(${currRotY * 3}px, ${currRotX * 3}px)`;
        }
        requestAnimationFrame(renderParallax);
    }
    renderParallax();
}

// Effect 2 (Updated): Particle Dissolve Hover
function initDeveloperDissolve() {
    const devText = document.querySelector('.developer-text');
    if (!devText) return;

    const text = devText.textContent;
    devText.innerHTML = '';
    const letterSpans = [];
    
    for (let i = 0; i < text.length; i++) {
        const span = document.createElement('span');
        span.textContent = text[i];
        span.className = 'letter';
        devText.appendChild(span);
        letterSpans.push({
            el: span,
            dissolved: false,
            particles: []
        });
    }

    let mouseX = -1000, mouseY = -1000;
    document.addEventListener('mousemove', e => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function renderParticles() {
        letterSpans.forEach(item => {
            const rect = item.el.getBoundingClientRect();
            // Letters are attached to viewport scrolling so rect updates naturally
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const dist = Math.hypot(mouseX - centerX, mouseY - centerY);

            if (dist < 150) {
                if (!item.dissolved) {
                    item.dissolved = true;
                    item.el.style.opacity = '0';
                    
                    for (let i = 0; i < 16; i++) {
                        const p = document.createElement('div');
                        p.className = 'developer-particle';
                        p.style.left = `${centerX - 2}px`;
                        p.style.top = `${centerY - 2}px`;
                        document.body.appendChild(p);
                        
                        const angle = Math.random() * Math.PI * 2;
                        const speed = 1 + Math.random() * 2;
                        item.particles.push({
                            el: p,
                            x: centerX - 2,
                            y: centerY - 2,
                            originX: centerX - 2, // will be dynamic based on scroll, handled below
                            originY: centerY - 2,
                            vx: Math.cos(angle) * speed,
                            vy: Math.sin(angle) * speed,
                            life: 1.0
                        });
                    }
                }
            } else {
                if (item.dissolved) {
                    item.dissolved = false;
                    item.el.style.opacity = '1';
                }
            }

            for (let i = item.particles.length - 1; i >= 0; i--) {
                const p = item.particles[i];
                if (item.dissolved) {
                    p.x += p.vx;
                    p.y += p.vy;
                    p.life -= 0.03;
                    if (p.life <= 0) {
                        p.el.style.opacity = '0';
                    } else {
                        p.el.style.opacity = p.life;
                        p.el.style.left = `${p.x}px`;
                        p.el.style.top = `${p.y}px`;
                    }
                } else {
                    // Update origin continuously to track the element (in case of scroll)
                    p.originX = rect.left + rect.width / 2 - 2;
                    p.originY = rect.top + rect.height / 2 - 2;

                    p.x += (p.originX - p.x) * 0.2;
                    p.y += (p.originY - p.y) * 0.2;
                    p.life += 0.05;
                    p.el.style.opacity = Math.min(p.life, 1);
                    p.el.style.left = `${p.x}px`;
                    p.el.style.top = `${p.y}px`;
                    
                    if (Math.hypot(p.x - p.originX, p.y - p.originY) < 1) {
                        p.el.remove();
                        item.particles.splice(i, 1);
                    }
                }
            }
        });
        
        requestAnimationFrame(renderParticles);
    }
    renderParticles();
}

// Effect 6: Magnetic Elements
function initMagneticContacts() {
    const contactSection = document.getElementById('contact');
    const elements = document.querySelectorAll('.contact-item, .social-link, #submit-btn');
    
    if (!contactSection || elements.length === 0) return;

    contactSection.addEventListener('mousemove', (e) => {
        if (window.innerWidth < 768) return;
        
        elements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const dist = Math.hypot(e.clientX - centerX, e.clientY - centerY);
            
            if (dist < 80) {
                const strength = 12 * (1 - dist / 80);
                const dx = ((e.clientX - centerX) / dist) * strength;
                const dy = ((e.clientY - centerY) / dist) * strength;
                
                el.style.transform = `translate(${dx}px, ${dy}px)`;
                el.style.transition = `transform 0.15s ease-out`;
                
                if (Math.abs(dx) > 6 || Math.abs(dy) > 6) {
                    el.classList.add('magnetic-glow');
                } else {
                    el.classList.remove('magnetic-glow');
                }
            } else {
                el.style.transform = `translate(0, 0)`;
                el.style.transition = `transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)`;
                el.classList.remove('magnetic-glow');
            }
        });
    });

    contactSection.addEventListener('mouseleave', () => {
        elements.forEach(el => {
            el.style.transform = `translate(0, 0)`;
            el.style.transition = `transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)`;
            el.classList.remove('magnetic-glow');
        });
    });
}

/* ========================================
   Bento Hero Animations
   ======================================== */
function initBentoHero() {
    const welcomeSection = document.getElementById('welcome');
    if (!welcomeSection) return;

    // Only run on desktop
    if (window.innerWidth >= 768) {
        // Bind Data
        const featuredProject = projectsData[0];
        const latestExp = experienceData[0];

        const titleEl = document.getElementById('bento-featured-title');
        const descEl = document.getElementById('bento-featured-desc');
        const catEl = document.getElementById('bento-featured-category');
        const compEl = document.getElementById('bento-exp-company');
        const roleEl = document.getElementById('bento-exp-role');
        const durEl = document.getElementById('bento-exp-duration');

        if (titleEl) titleEl.innerText = featuredProject.title;
        if (descEl) descEl.innerText = featuredProject.description;
        if (catEl) catEl.innerText = featuredProject.category;
        
        if (compEl) compEl.innerText = latestExp.company;
        if (roleEl) roleEl.innerText = latestExp.position;
        if (durEl) durEl.innerText = latestExp.duration;

        // Entry Animations via timeouts to match CSS transitions
        const centerText = document.getElementById('bento-center-text');
        if (centerText) {
            setTimeout(() => {
                centerText.classList.add('bento-animate-center');
            }, 300);
        }

        const delays = {
            'bento-card-1': 500,
            'bento-card-2': 650,
            'bento-card-3': 800,
            'bento-card-4': 950,
            'bento-card-5': 1100,
            'bento-card-6': 1250
        };

        for (const [id, delay] of Object.entries(delays)) {
            const el = document.getElementById(id);
            if (el) {
                setTimeout(() => {
                    el.classList.add(`bento-animate-card-${id.replace('bento-card-', '')}`);
                }, delay);
            }
        }

        const decors = document.querySelectorAll('.bento-decor');
        decors.forEach(decor => {
            setTimeout(() => {
                decor.classList.add('bento-animate-decor');
            }, 1400);
        });
    } else {
        // On mobile, just fade in center text
        const centerText = document.getElementById('bento-center-text');
        if (centerText) {
            setTimeout(() => {
                centerText.style.opacity = '1';
                centerText.style.transition = 'opacity 0.6s ease';
            }, 300);
        }
    }
}



/* ========================================
   Notebook Spread Layout
   ======================================== */
function initNotebookSpread() {
    const spread = document.getElementById('notebook-spread');
    if (!spread) return;

    // ---- LEFT PAGE: Education entries ----
    const eduContainer = document.getElementById('nb-education-entries');
    if (eduContainer) {
        eduContainer.innerHTML = educationData.map(edu => `
            <div class="nb-edu-entry">
                <div class="nb-edu-left">
                    <div class="nb-edu-institution">${edu.institution}</div>
                    <div class="nb-edu-degree">${edu.degree}</div>
                    <div class="nb-edu-spec">${edu.specialization}</div>
                </div>
                <div class="nb-edu-right">
                    <div class="nb-edu-duration">${edu.duration}</div>
                    <div class="nb-edu-status">${edu.status}</div>
                </div>
            </div>
        `).join('');
    }

    // ---- LEFT PAGE: Certifications (only if data exists) ----
    const certBlock = document.getElementById('nb-certifications-block');
    if (certBlock && typeof certificationsData !== 'undefined' && certificationsData.length > 0) {
        let certHTML = '<div class="nb-section-header" style="margin-top:32px;">CERTIFICATIONS</div>';
        certHTML += certificationsData.map(cert => `
            <div class="nb-cert-entry">
                <div>
                    <div class="nb-cert-name">${cert.name}</div>
                    <div class="nb-cert-provider">${cert.provider}</div>
                </div>
                ${cert.link ? '<a href="' + cert.link + '" target="_blank" class="nb-cert-link">View ↗</a>' : ''}
            </div>
        `).join('');
        certBlock.innerHTML = certHTML;
    }

    // ---- RIGHT PAGE: Skills badges ----
    const badgesWrap = document.getElementById('nb-badges-wrap');
    if (!badgesWrap) return;

    // Curated skill lists by category
    const aiSkills = ['Python', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'OpenCV', 'NLTK', 'Caffe', 'Hugging Face', 'Data Preprocessing', 'Data Analysis', 'Model Optimization'];
    const devSkills = ['VSCode', 'Git', 'Docker', 'Flask', 'Streamlit', 'Canva', 'Adobe Creative Suite', 'Visual Design'];
    const domainSkills = ['Agile/Scrum', 'Documentation', 'Technical Writing', 'Data Accuracy', 'Quality Assurance', 'Software Testing'];

    const shapes = ['capsule', 'rounded', 'starburst', 'stamp'];

    function makeBadge(name, category) {
        const shape = shapes[Math.floor(Math.random() * shapes.length)];
        const rotation = (Math.random() * 6 - 3).toFixed(1);
        const colorClass = category === 'ai' ? 'nb-badge-ai' : category === 'dev' ? 'nb-badge-dev' : 'nb-badge-domain';
        const shapeClass = 'nb-badge-' + shape;
        return '<span class="nb-badge ' + shapeClass + ' ' + colorClass + '" style="transform: rotate(' + rotation + 'deg)" data-rotation="' + rotation + '">' + name + '</span>';
    }

    let badgesHTML = '';
    aiSkills.forEach(s => { badgesHTML += makeBadge(s, 'ai'); });
    devSkills.forEach(s => { badgesHTML += makeBadge(s, 'dev'); });
    domainSkills.forEach(s => { badgesHTML += makeBadge(s, 'domain'); });
    badgesWrap.innerHTML = badgesHTML;

    // ---- ANIMATIONS via IntersectionObserver ----
    const leftPage = document.getElementById('notebook-page-left');
    const rightPage = document.getElementById('notebook-page-right');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate pages
                if (leftPage) leftPage.classList.add('nb-visible');
                if (rightPage) rightPage.classList.add('nb-visible');

                // Stagger badges
                const badges = badgesWrap.querySelectorAll('.nb-badge');
                badges.forEach((badge, i) => {
                    setTimeout(() => {
                        const rot = badge.getAttribute('data-rotation') || '0';
                        badge.style.transform = 'rotate(' + rot + 'deg) translateY(0)';
                        badge.classList.add('nb-badge-visible');
                    }, 700 + i * 40);
                });

                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    observer.observe(spread);
}
