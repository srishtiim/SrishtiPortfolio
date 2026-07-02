/* ========================================
   MAIN JavaScript - Portfolio Functionality
   ======================================== */

// Nuclear loader kill — runs before anything else
function hideLoader() {
    const loader = document.getElementById('page-loader');
    if (loader) {
        loader.classList.add('hidden');
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
        id: 5,
        company: "Scalable Analytics Research Lab, SUNY Buffalo",
        position: "Research Intern",
        duration: "May 2026 – Ongoing",
        location: "Remote",
        type: "Internship",
        shortDescription: "Conducting clinical outcome prediction using multimodal Electronic Health Records (EHR) data under Dr. Haimonti Dutta.",
        fullDescription: "Conducting clinical outcome prediction using multimodal Electronic Health Records (EHR) data under Dr. Haimonti Dutta. Generating synthetic EHR datasets using the Synthea data generator; preprocessing and structuring data for downstream ML pipelines. Applying NLP techniques including LLMs for clinical note processing and EHR analysis.",
        responsibilities: [
            "Conducting clinical outcome prediction using multimodal Electronic Health Records (EHR) data under Dr. Haimonti Dutta",
            "Generating synthetic EHR datasets using the Synthea data generator; preprocessing and structuring data for downstream ML pipelines",
            "Applying NLP techniques including LLMs for clinical note processing and EHR analysis"
        ],
        skills: [
            { name: "Machine Learning", type: "tech" },
            { name: "NLP", type: "tech" },
            { name: "LLMs", type: "tech" },
            { name: "Data Preprocessing", type: "tech" }
        ]
    },
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
    hideLoader();
    initNavigation();
    initCustomCursor();
    renderProjects();
    renderSkills();
    renderTimeline();
    renderEducation();
    renderCertifications();
    initContactForm();
    initMicroInteractions();
    initStickerHub();
    initScrollReveal();
    initWorkExperienceModal();
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
        if (window.scrollY > 30) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Hamburger menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navbar.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu on link click
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navbar.classList.remove('active');
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

// Theme Toggle (removed — no theme toggle element in current HTML)

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

/* Experience Bento Grid */
function renderTimeline() {
    const bentoContainer = document.getElementById('experience-bento');
    if (!bentoContainer) return;

    bentoContainer.innerHTML = experienceData.map(exp => `
        <div class="exp-card exp-reveal" data-id="${exp.id}">
            <div class="exp-front">
                <div class="company-name">${exp.company}</div>
                <div class="role-title">${exp.position}</div>
                <div class="duration">${exp.duration}</div>
                <div class="tap-label">tap to read →</div>
            </div>
            <div class="exp-back">
                <button class="exp-close" aria-label="Close">✕</button>
                <div class="company-name">${exp.company}</div>
                <div class="role-title">${exp.position}</div>
                <div class="meta-info">${exp.duration} | ${exp.location}</div>
                <div class="divider"></div>
                <ul>
                    ${exp.responsibilities.map(r => `<li>${r}</li>`).join('')}
                </ul>
            </div>
        </div>
    `).join('');

    initExperienceBentoInteractivity();
}

function initExperienceBentoInteractivity() {
    const cards = document.querySelectorAll('.exp-card');
    
    // JS logic click handler
    cards.forEach(card => {
        card.addEventListener('click', (e) => {
            const isMobile = window.innerWidth < 768;
            const isFlipped = card.classList.contains('flipped');

            // Handle close button click
            if (e.target.classList.contains('exp-close') || e.target.closest('.exp-close')) {
                e.stopPropagation();
                closeCard(card, isMobile);
                return;
            }

            if (isFlipped) {
                // On mobile, clicking the card front collapses it, but clicking inside the back shouldn't collapse
                if (isMobile) {
                    if (e.target.closest('.exp-back')) {
                        return;
                    }
                    closeCard(card, isMobile);
                }
                return;
            }

            // Open card
            openCard(card, isMobile);
        });
    });

    // Scroll reveal stagger animation
    const revealObserver = new IntersectionObserver((entries) => {
        let delay = 0;
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const card = entry.target;
                if (!card.classList.contains('visible')) {
                    setTimeout(() => {
                        card.classList.add('visible');
                    }, delay);
                    delay += 100;
                }
                revealObserver.unobserve(card);
            }
        });
    }, { threshold: 0.1 });

    cards.forEach(card => revealObserver.observe(card));
}

function openCard(card, isMobile) {
    // Only one card can be open at a time
    const openCardEl = document.querySelector('.exp-card.flipped');
    if (openCardEl && openCardEl !== card) {
        closeCard(openCardEl, isMobile);
    }

    card.classList.add('flipped');

    if (!isMobile) {
        // Inject dark overlay behind the expanded card
        let overlay = document.getElementById('exp-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.id = 'exp-overlay';
            document.body.appendChild(overlay);
            overlay.addEventListener('click', () => {
                const currentOpen = document.querySelector('.exp-card.flipped');
                if (currentOpen) {
                    closeCard(currentOpen, false);
                }
            });
        }
        document.body.style.overflow = 'hidden';
    }
}

function closeCard(card, isMobile) {
    card.classList.remove('flipped');
    if (!isMobile) {
        const overlay = document.getElementById('exp-overlay');
        if (overlay) {
            overlay.remove();
        }
        document.body.style.overflow = '';
    }
}

function initExperienceInteractivity() {
    // Replaced by bento logic
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

// Legacy project modal (element removed from HTML — no-op guard)
function initModal() {
    if (!projectModal || !modalClose) return;
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

// loadSkills() removed — Firebase dependency removed. Skills rendered from local data via renderSkills().

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

// ==========================================================================
// THREE.JS 3D LANDING PAGE & MACOS DOCK MAGNIFICATION ENGINE
// ==========================================================================

// Helper to create code terminal textures
function createCodeTexture(textColor) {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    
    ctx.fillStyle = '#0a0a0c';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = textColor || '#00ff66';
    ctx.font = 'bold 20px "Courier New", monospace';
    
    const lines = [
        'import * as THREE from "three";',
        'const sceneBg = new THREE.Scene();',
        'const sceneFg = new THREE.Scene();',
        '// strange pixels engine v1.0.3',
        'function animate() {',
        '  requestAnimationFrame(animate);',
        '  mesh.rotation.x += 0.01;',
        '  mesh.rotation.y += 0.02;',
        '  renderer.render(scene, camera);',
        '}',
        '// compiling neural net constraints',
        'const model = tf.sequential();',
        'model.add(tf.layers.dense({units: 32}));',
        'model.compile({optimizer: "adam"});',
        '// data science mode active',
        'df = pd.read_csv("sustainability.csv")',
        'X = df[["co2", "temp"]].values',
        'y = df["risk_factor"].values',
        '// let\'s make a change...',
        'console.log("Strange Pixels Initialized");',
        '// srishti portfolio load system'
    ];
    
    for (let i = 0; i < 24; i++) {
        const line = lines[i % lines.length];
        ctx.fillText(line, 20, 35 + i * 20);
    }
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    return texture;
}

// Procedural Mesh Builders
function createPadlock() {
    const group = new THREE.Group();
    const brassMaterial = new THREE.MeshStandardMaterial({
        color: 0xcca353, // warm brass yellow
        metalness: 0.9,
        roughness: 0.15
    });
    
    // Body (box shape)
    const bodyGeom = new THREE.BoxGeometry(3, 2.5, 1.2);
    const body = new THREE.Mesh(bodyGeom, brassMaterial);
    group.add(body);
    
    // Shackle (curved torus)
    const shackleGeom = new THREE.TorusGeometry(0.9, 0.22, 16, 64, Math.PI);
    const shackle = new THREE.Mesh(shackleGeom, brassMaterial);
    shackle.position.y = 1.25;
    shackle.rotation.z = Math.PI; // invert curve upwards
    shackle.scale.set(1, 1.3, 1);
    group.add(shackle);
    
    // Shackle insertion base
    const legGeom = new THREE.CylinderGeometry(0.22, 0.22, 0.4, 16);
    const leg1 = new THREE.Mesh(legGeom, brassMaterial);
    leg1.position.set(-0.9, 1.1, 0);
    const leg2 = leg1.clone();
    leg2.position.x = 0.9;
    group.add(leg1, leg2);
    
    // Keyhole shape
    const darkMat = new THREE.MeshBasicMaterial({ color: 0x111111 });
    const keyholeTopGeom = new THREE.CylinderGeometry(0.18, 0.18, 0.1, 16);
    const keyholeTop = new THREE.Mesh(keyholeTopGeom, darkMat);
    keyholeTop.rotation.x = Math.PI / 2;
    keyholeTop.position.set(0, -0.3, 0.61);
    group.add(keyholeTop);
    
    const keyholeBottomGeom = new THREE.BoxGeometry(0.12, 0.3, 0.1);
    const keyholeBottom = new THREE.Mesh(keyholeBottomGeom, darkMat);
    keyholeBottom.position.set(0, -0.45, 0.61);
    group.add(keyholeBottom);
    
    return group;
}

function createCRTMonitor() {
    const group = new THREE.Group();
    const shellMat = new THREE.MeshStandardMaterial({
        color: 0x3d3e42, // vintage charcoal grey
        metalness: 0.15,
        roughness: 0.75
    });
    
    const screenText = createCodeTexture('#00ffff');
    const screenMat = new THREE.MeshStandardMaterial({
        color: 0x001a1a,
        emissive: 0x00dddd,
        emissiveMap: screenText,
        emissiveIntensity: 0.7,
        metalness: 0.2,
        roughness: 0.2
    });
    
    // Main tube case
    const caseGeom = new THREE.BoxGeometry(3.6, 3.2, 3);
    const caseMesh = new THREE.Mesh(caseGeom, shellMat);
    group.add(caseMesh);
    
    // Screen bezel plane
    const screenGeom = new THREE.BoxGeometry(3.1, 2.6, 0.15);
    const screen = new THREE.Mesh(screenGeom, screenMat);
    screen.position.set(0, 0, 1.45);
    group.add(screen);
    
    // Screen framing bezels
    const bezelGeom1 = new THREE.BoxGeometry(3.3, 0.2, 0.25);
    const bezelTop = new THREE.Mesh(bezelGeom1, shellMat);
    bezelTop.position.set(0, 1.4, 1.45);
    const bezelBottom = bezelTop.clone();
    bezelBottom.position.y = -1.4;
    
    const bezelGeom2 = new THREE.BoxGeometry(0.2, 2.8, 0.25);
    const bezelLeft = new THREE.Mesh(bezelGeom2, shellMat);
    bezelLeft.position.set(-1.65, 0, 1.45);
    const bezelRight = bezelLeft.clone();
    bezelRight.position.x = 1.65;
    
    group.add(bezelTop, bezelBottom, bezelLeft, bezelRight);
    
    // Stand support neck
    const neckGeom = new THREE.CylinderGeometry(0.4, 0.5, 0.5, 16);
    const neck = new THREE.Mesh(neckGeom, shellMat);
    neck.position.set(0, -1.85, 0);
    group.add(neck);
    
    // Foot base plate
    const baseGeom = new THREE.BoxGeometry(2.2, 0.15, 2.2);
    const base = new THREE.Mesh(baseGeom, shellMat);
    base.position.set(0, -2.1, 0);
    group.add(base);
    
    return { group, texture: screenText };
}

function createCardboardBox() {
    const group = new THREE.Group();
    const cardboardMat = new THREE.MeshStandardMaterial({
        color: 0xad8255, // packing brown cardboard
        metalness: 0.05,
        roughness: 0.95
    });
    const tapeMat = new THREE.MeshStandardMaterial({
        color: 0x5a3f28, // brown shipping tape
        metalness: 0.15,
        roughness: 0.55
    });
    
    // Main cargo box
    const boxGeom = new THREE.BoxGeometry(3.1, 3.1, 3.1);
    const mainBox = new THREE.Mesh(boxGeom, cardboardMat);
    group.add(mainBox);
    
    // Packaging tape down the seams
    const tapeSeam = new THREE.BoxGeometry(0.5, 3.15, 3.15);
    const tape1 = new THREE.Mesh(tapeSeam, tapeMat);
    tape1.position.set(0, 0.02, 0);
    group.add(tape1);
    
    const tapeAcross = new THREE.BoxGeometry(3.15, 0.35, 3.15);
    const tape2 = new THREE.Mesh(tapeAcross, tapeMat);
    tape2.position.set(0, 0, 0);
    group.add(tape2);
    
    return group;
}

function createMonsterTruck() {
    const group = new THREE.Group();
    const bodyMat = new THREE.MeshStandardMaterial({
        color: 0xd32f2f, // fire engine red
        metalness: 0.6,
        roughness: 0.3
    });
    const tireMat = new THREE.MeshStandardMaterial({
        color: 0x222222, // rubber carbon grey
        metalness: 0.08,
        roughness: 0.95
    });
    const metalMat = new THREE.MeshStandardMaterial({
        color: 0x888888, // chrome metal axles
        metalness: 0.85,
        roughness: 0.2
    });
    
    // Truck body chassis
    const bodyGeom = new THREE.BoxGeometry(3.3, 1.1, 1.6);
    const body = new THREE.Mesh(bodyGeom, bodyMat);
    body.position.y = 0.5;
    group.add(body);
    
    // Driver cabin
    const cabinGeom = new THREE.BoxGeometry(1.6, 0.8, 1.4);
    const cabin = new THREE.Mesh(cabinGeom, bodyMat);
    cabin.position.set(-0.2, 1.4, 0);
    group.add(cabin);
    
    // Windows overlay
    const glassMat = new THREE.MeshBasicMaterial({ color: 0x050505 });
    const windGeom = new THREE.BoxGeometry(1.1, 0.55, 1.42);
    const wind = new THREE.Mesh(windGeom, glassMat);
    wind.position.set(-0.2, 1.4, 0);
    group.add(wind);
    
    // Heavy suspension axles
    const axleGeom = new THREE.CylinderGeometry(0.12, 0.12, 2.2, 12);
    const axle1 = new THREE.Mesh(axleGeom, metalMat);
    axle1.rotation.x = Math.PI / 2;
    axle1.position.set(-0.9, -0.2, 0);
    
    const axle2 = axle1.clone();
    axle2.position.x = 0.9;
    
    group.add(axle1, axle2);
    
    // 4 oversized wheels
    const wheelGeom = new THREE.CylinderGeometry(0.85, 0.85, 0.7, 24);
    const wheelOffsets = [
        [-0.9, -0.2, 1.1],
        [-0.9, -0.2, -1.1],
        [0.9, -0.2, 1.1],
        [0.9, -0.2, -1.1]
    ];
    
    wheelOffsets.forEach(pos => {
        const wheel = new THREE.Mesh(wheelGeom, tireMat);
        wheel.rotation.x = Math.PI / 2;
        wheel.position.set(pos[0], pos[1], pos[2]);
        group.add(wheel);
    });
    
    return group;
}

function createDigitalCoin() {
    const group = new THREE.Group();
    const goldMat = new THREE.MeshStandardMaterial({
        color: 0xecb813, // shiny gold
        metalness: 0.95,
        roughness: 0.1
    });
    
    // Gold disc
    const discGeom = new THREE.CylinderGeometry(1.6, 1.6, 0.2, 32);
    const disc = new THREE.Mesh(discGeom, goldMat);
    disc.rotation.x = Math.PI / 2; // layout flat facing camera
    group.add(disc);
    
    // Raised circular border rim
    const rimGeom = new THREE.TorusGeometry(1.4, 0.08, 8, 32);
    const rim1 = new THREE.Mesh(rimGeom, goldMat);
    rim1.position.z = 0.11;
    const rim2 = rim1.clone();
    rim2.position.z = -0.11;
    group.add(rim1, rim2);
    
    // Pixel star/icon details on face
    const symbolGeom = new THREE.BoxGeometry(0.65, 0.65, 0.05);
    const symbol = new THREE.Mesh(symbolGeom, goldMat);
    symbol.rotation.z = Math.PI / 4;
    symbol.position.z = 0.11;
    group.add(symbol);
    
    const symbolBack = symbol.clone();
    symbolBack.position.z = -0.11;
    group.add(symbolBack);
    
    return group;
}

function createLaptop() {
    const group = new THREE.Group();
    const aluminumMat = new THREE.MeshStandardMaterial({
        color: 0x9fa1a6, // sleek silver space grey
        metalness: 0.85,
        roughness: 0.25
    });
    const keyboardMat = new THREE.MeshStandardMaterial({
        color: 0x1d1d1f, // keyboard block
        metalness: 0.15,
        roughness: 0.8
    });
    
    const screenText = createCodeTexture('#00ff66');
    const screenMat = new THREE.MeshStandardMaterial({
        color: 0x000000,
        emissive: 0x00ee55,
        emissiveMap: screenText,
        emissiveIntensity: 0.65,
        metalness: 0.1,
        roughness: 0.1
    });
    
    // Bottom chassis base
    const baseGeom = new THREE.BoxGeometry(4, 0.1, 2.7);
    const base = new THREE.Mesh(baseGeom, aluminumMat);
    group.add(base);
    
    // Keyboard inset layout
    const kbGeom = new THREE.BoxGeometry(3.5, 0.02, 1.7);
    const keyboard = new THREE.Mesh(kbGeom, keyboardMat);
    keyboard.position.set(0, 0.06, 0.2);
    group.add(keyboard);
    
    // Screen Pivot hinge
    const screenPivot = new THREE.Group();
    screenPivot.position.set(0, 0.05, -1.3);
    
    // Laptop lid back
    const lidGeom = new THREE.BoxGeometry(4, 2.6, 0.08);
    const lid = new THREE.Mesh(lidGeom, aluminumMat);
    lid.position.set(0, 1.3, -0.04);
    screenPivot.add(lid);
    
    // Matrix console screen display
    const screenGeom = new THREE.BoxGeometry(3.7, 2.3, 0.02);
    const screen = new THREE.Mesh(screenGeom, screenMat);
    screen.position.set(0, 1.3, 0.015);
    screenPivot.add(screen);
    
    // Standard tilted screen angle (110 degrees)
    screenPivot.rotation.x = THREE.MathUtils.degToRad(110);
    group.add(screenPivot);
    
    return { group, texture: screenText };
}

// Three.js Engine Setup
function init3DScene() {
    const welcome = document.getElementById('welcome');
    const canvasBg = document.getElementById('canvas-bg');
    const canvasFg = document.getElementById('canvas-fg');
    
    if (!welcome || !canvasBg || !canvasFg) return;
    
    let width = welcome.offsetWidth;
    let height = welcome.offsetHeight;
    
    // Setup background and foreground transparent WebGL renderers
    const rendererBg = new THREE.WebGLRenderer({ canvas: canvasBg, alpha: true, antialias: true });
    rendererBg.setSize(width, height);
    rendererBg.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererBg.setClearColor(0x000000, 0);
    
    const rendererFg = new THREE.WebGLRenderer({ canvas: canvasFg, alpha: true, antialias: true });
    rendererFg.setSize(width, height);
    rendererFg.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererFg.setClearColor(0x000000, 0);
    
    // Set up parallel Scenes
    const sceneBg = new THREE.Scene();
    const sceneFg = new THREE.Scene();
    
    // Set up shared projection camera
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    camera.position.z = 28;
    
    // Add lighting sets to both background/foreground layers
    const configureLights = (scene) => {
        const ambient = new THREE.AmbientLight(0xffffff, 0.45);
        scene.add(ambient);
        
        const keyLight = new THREE.DirectionalLight(0xffffff, 0.95);
        keyLight.position.set(15, 25, 20);
        scene.add(keyLight);
        
        const fillLight = new THREE.DirectionalLight(0xffffff, 0.35);
        fillLight.position.set(-15, -15, -10);
        scene.add(fillLight);
        
        const spotLight = new THREE.PointLight(0xff00a0, 0.6, 35);
        spotLight.position.set(0, 0, 8);
        scene.add(spotLight);
    };
    
    configureLights(sceneBg);
    configureLights(sceneFg);
    
    // Instantiate 3D meshes
    const padlock = createPadlock();
    const monitorObj = createCRTMonitor();
    const box = createCardboardBox();
    const truck = createMonsterTruck();
    const coin = createDigitalCoin();
    const laptopObj = createLaptop();
    
    // Object Configurations: Base positions, drift variables, rotations
    const activeObjects = [
        {
            mesh: padlock,
            baseX: -8.0, baseY: 3.5, baseZ: -2.0,
            driftX: 0.5, driftY: 0.6, driftZ: 0.4,
            ampX: 1.0, ampY: 1.2, ampZ: 5.0, // large Z amplitude to cross threshold
            rotX: 0.15, rotY: 0.25, rotZ: 0.08,
            pIntensity: 3.0
        },
        {
            mesh: monitorObj.group,
            texture: monitorObj.texture,
            baseX: 8.0, baseY: 4.2, baseZ: 2.5,
            driftX: 0.4, driftY: 0.5, driftZ: 0.6,
            ampX: 0.8, ampY: 1.0, ampZ: 5.5,
            rotX: 0.08, rotY: 0.18, rotZ: 0.05,
            pIntensity: 2.8
        },
        {
            mesh: box,
            baseX: -8.5, baseY: -3.8, baseZ: 3.0,
            driftX: 0.6, driftY: 0.4, driftZ: 0.5,
            ampX: 1.1, ampY: 0.9, ampZ: 6.0,
            rotX: 0.2, rotY: 0.12, rotZ: 0.15,
            pIntensity: 3.2
        },
        {
            mesh: truck,
            baseX: 8.5, baseY: -4.2, baseZ: -1.5,
            driftX: 0.5, driftY: 0.5, driftZ: 0.4,
            ampX: 1.2, ampY: 1.1, ampZ: 5.2,
            rotX: 0.12, rotY: 0.2, rotZ: 0.1,
            pIntensity: 3.0
        },
        {
            mesh: coin,
            baseX: -3.0, baseY: 5.5, baseZ: 4.0,
            driftX: 0.7, driftY: 0.6, driftZ: 0.5,
            ampX: 0.9, ampY: 1.3, ampZ: 5.8,
            rotX: 0.3, rotY: 0.3, rotZ: 0.2,
            pIntensity: 2.5
        },
        {
            mesh: laptopObj.group,
            texture: laptopObj.texture,
            baseX: 3.5, baseY: -5.5, baseZ: -3.0,
            driftX: 0.4, driftY: 0.4, driftZ: 0.6,
            ampX: 0.7, ampY: 0.8, ampZ: 5.4,
            rotX: 0.1, rotY: 0.15, rotZ: 0.05,
            pIntensity: 2.7
        }
    ];
    
    // Add all meshes to background initially
    activeObjects.forEach(obj => {
        sceneBg.add(obj.mesh);
    });
    
    // Mouse Interaction Parallax tracking
    let rawMouseX = 0;
    let rawMouseY = 0;
    
    window.addEventListener('mousemove', (e) => {
        rawMouseX = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2); // -1 to +1
        rawMouseY = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2); // -1 to +1
    });
    
    // Smooth interpolations
    let targetMouseX = 0;
    let targetMouseY = 0;
    
    const startTime = Date.now();
    
    // Main Render Loop
    function animate() {
        requestAnimationFrame(animate);
        
        const time = (Date.now() - startTime) * 0.001;
        
        // Lerp mouse variables for smooth lag parallax effect
        targetMouseX += (rawMouseX - targetMouseX) * 0.07;
        targetMouseY += (rawMouseY - targetMouseY) * 0.07;
        
        activeObjects.forEach(obj => {
            // 1. Calculate base floating drift using sine/cosine waves
            const driftX = Math.sin(time * obj.driftX) * obj.ampX;
            const driftY = Math.cos(time * obj.driftY) * obj.ampY;
            const driftZ = Math.sin(time * obj.driftZ) * obj.ampZ;
            
            // 2. Add mouse tracking parallax
            const targetX = obj.baseX + driftX + targetMouseX * obj.pIntensity;
            const targetY = obj.baseY + driftY - targetMouseY * obj.pIntensity;
            const targetZ = obj.baseZ + driftZ;
            
            // Apply coordinates with smooth interpolation
            obj.mesh.position.x += (targetX - obj.mesh.position.x) * 0.08;
            obj.mesh.position.y += (targetY - obj.mesh.position.y) * 0.08;
            obj.mesh.position.z += (targetZ - obj.mesh.position.z) * 0.08;
            
            // Update rotations dynamically
            const targetRotX = time * obj.rotX + targetMouseY * 0.4;
            const targetRotY = time * obj.rotY + targetMouseX * 0.4;
            const targetRotZ = time * obj.rotZ;
            
            obj.mesh.rotation.x += (targetRotX - obj.mesh.rotation.x) * 0.08;
            obj.mesh.rotation.y += (targetRotY - obj.mesh.rotation.y) * 0.08;
            obj.mesh.rotation.z += (targetRotZ - obj.mesh.rotation.z) * 0.08;
            
            // 3. Dynamic Z-Index depth sorting relative to typography plane (Z = 0)
            if (obj.mesh.position.z > 0) {
                // Should pass in front of text (belongs in foreground scene)
                if (obj.mesh.parent !== sceneFg) {
                    sceneBg.remove(obj.mesh);
                    sceneFg.add(obj.mesh);
                }
            } else {
                // Should pass behind text (belongs in background scene)
                if (obj.mesh.parent !== sceneBg) {
                    sceneFg.remove(obj.mesh);
                    sceneBg.add(obj.mesh);
                }
            }
            
            // 4. Scroll terminal code lines on computer screens
            if (obj.texture) {
                obj.texture.offset.y -= 0.003;
            }
        });
        
        // Render layers in alignment
        rendererBg.render(sceneBg, camera);
        rendererFg.render(sceneFg, camera);
    }
    
    // Responsive Resize Handler
    window.addEventListener('resize', () => {
        width = welcome.offsetWidth;
        height = welcome.offsetHeight;
        
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        
        rendererBg.setSize(width, height);
        rendererBg.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        
        rendererFg.setSize(width, height);
        rendererFg.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });
    
    // Start loop
    animate();
}

// macOS Dock Magnification interaction
function initMacosDock() {
    const dock = document.querySelector('.macos-dock');
    const items = document.querySelectorAll('.dock-item');
    
    if (!dock || items.length === 0) return;
    
    dock.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        items.forEach(item => {
            const rect = item.getBoundingClientRect();
            const itemCenterX = rect.left + rect.width / 2;
            const itemCenterY = rect.top + rect.height / 2;
            
            // Distance from mouse to center of the icon
            const distance = Math.hypot(mouseX - itemCenterX, mouseY - itemCenterY);
            const maxDistance = 140; // threshold for magnification scale
            
            if (distance < maxDistance) {
                // Magnify scale up to 1.7x depending on proximity
                const scale = 1 + (0.7 * (1 - distance / maxDistance));
                item.style.transform = `scale(${scale})`;
                // Add spacing dynamically so icons spread out organically
                item.style.margin = `0 ${8 * (scale - 1)}px`;
            } else {
                item.style.transform = 'scale(1)';
                item.style.margin = '0 0px';
            }
        });
    });
    
    dock.addEventListener('mouseleave', () => {
        items.forEach(item => {
            item.style.transform = 'scale(1)';
            item.style.margin = '0 0px';
        });
    });
}


// ============================================================
//  STICKER HUB – radial pop + modal open/close
// ============================================================

function initStickerHub() {
    const center = document.getElementById('sticker-center');
    const radials = document.querySelectorAll('.sticker-radial');
    const modals = document.querySelectorAll('.hub-modal');
    const closeBtns = document.querySelectorAll('.modal-close-btn');

    if (!center) return;

    let popped = false;

    // Toggle radial stickers on center click
    center.addEventListener('click', () => {
        popped = !popped;
        radials.forEach((sticker, i) => {
            if (popped) {
                setTimeout(() => {
                    sticker.classList.add('popped');
                }, i * 80);
            } else {
                sticker.classList.remove('popped');
            }
        });
    });

    // Open modal on radial sticker click
    radials.forEach(sticker => {
        sticker.addEventListener('click', (e) => {
            e.stopPropagation();
            if (!sticker.classList.contains('popped')) return;
            const targetId = sticker.dataset.target;
            const modal = document.getElementById(targetId);
            if (modal) openModal(modal);
        });
    });

    // Close buttons
    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.hub-modal');
            if (modal) closeModal(modal);
        });
    });

    // Click outside modal inner to close
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal(modal);
        });
    });

    // ESC key closes any open modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.hub-modal.active').forEach(m => closeModal(m));
        }
    });

    // Render content into modals that need it
    renderWorkExperienceCards();
    renderCertsModal();
    renderTechModal();
    renderEducationModal();
    renderProjectsModal();
}

function openModal(modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    // Focus the close button for accessibility
    const closeBtn = modal.querySelector('.modal-close-btn');
    if (closeBtn) setTimeout(() => closeBtn.focus(), 50);
}

function closeModal(modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// ============================================================
//  WORK EXPERIENCE BENTO GRID inside modal
// ============================================================

function renderWorkExperienceCards() {
    const grid = document.getElementById('modal-experience-content');
    if (!grid) return;

    // Map experience IDs to bento grid area names
    const areaMap = {
        5: 'current',  // SUNY (featured large)
        1: 'tsl',
        2: 'wedd',
        3: 'smollan',
        4: 'vatika'
    };

    grid.innerHTML = experienceData.map(exp => {
        const area = areaMap[exp.id];
        const isSlate = (exp.id === 1 || exp.id === 4);
        return `
            <div class="folder-card ${isSlate ? 'bg-slate' : ''}" id="card-${area}" style="grid-area:${area}">
                <div class="folder-tab"></div>
                <div class="folder-role">${exp.position}</div>
                <div class="folder-company">${exp.company}</div>
                <span class="folder-duration">${exp.duration} · ${exp.location}</span>
                <div class="folder-details" id="details-${area}">
                    <ul class="folder-bullets">
                        ${exp.responsibilities.map(r => `<li>${r}</li>`).join('')}
                    </ul>
                </div>
                <button class="btn-read-more" data-target="details-${area}">Read more ↓</button>
            </div>
        `;
    }).join('');

    // Read-more toggle
    grid.querySelectorAll('.btn-read-more').forEach(btn => {
        btn.addEventListener('click', () => {
            const detailsId = btn.dataset.target;
            const details = document.getElementById(detailsId);
            if (!details) return;
            const expanded = details.classList.toggle('expanded');
            btn.textContent = expanded ? 'Show less ↑' : 'Read more ↓';
        });
    });
}

function initWorkExperienceModal() {
    // Work is now opened via the sticker hub; this is a no-op placeholder
}

// ============================================================
//  CERTS MODAL
// ============================================================

function renderCertsModal() {
    const container = document.getElementById('modal-certs-content');
    if (!container) return;

    container.innerHTML = certificationsData.map(cert => `
        <div class="cert-card">
            <div>
                <div class="cert-name">${cert.name}</div>
                <div class="cert-provider">${cert.provider}</div>
            </div>
            <a href="${cert.link}" target="_blank" class="cert-btn" rel="noopener noreferrer">View ↗</a>
        </div>
    `).join('');
}

// ============================================================
//  TECH STACK MODAL
// ============================================================

function renderTechModal() {
    const container = document.getElementById('modal-tech-content');
    if (!container) return;

    const categories = {
        'Programming & Languages': skillsData.programming,
        'AI & Machine Learning': skillsData.ai,
        'Creative Tools': skillsData.creative_tools,
        'Dev Tools': skillsData.dev_tools,
        'Data Tools': skillsData.data_tools
    };

    container.innerHTML = Object.entries(categories).map(([label, skills]) => `
        <div class="tech-category">
            <h3 class="tech-category-label">${label}</h3>
            <div class="tech-pills">
                ${skills.map(s => `
                    <div class="tech-pill">
                        <span class="tech-name">${s.name}</span>
                        <span class="tech-stars">${'●'.repeat(s.level)}${'○'.repeat(5 - s.level)}</span>
                    </div>
                `).join('')}
            </div>
        </div>
    `).join('');
}

// ============================================================
//  EDUCATION MODAL
// ============================================================

function renderEducationModal() {
    const container = document.getElementById('modal-education-content');
    if (!container) return;

    container.innerHTML = educationData.map(edu => `
        <div class="education-entry">
            <div class="education-icon-wrap"><i class="fas ${edu.icon}"></i></div>
            <div class="education-body">
                <h3>${edu.institution}</h3>
                <p class="edu-degree">${edu.degree}</p>
                <p class="edu-meta">${edu.duration} · ${edu.status}</p>
                <p class="edu-spec">${edu.specialization}</p>
            </div>
        </div>
    `).join('');
}

// ============================================================
//  PROJECTS MODAL
// ============================================================

function renderProjectsModal() {
    const container = document.getElementById('modal-projects-content');
    if (!container) return;

    container.innerHTML = projectsData.map(project => `
        <div class="project-modal-card">
            <div class="project-modal-img-wrap">
                <img src="${project.image}" alt="${project.title}" loading="lazy"
                     onerror="this.src='https://via.placeholder.com/400x180/25344F/D5B893?text=${encodeURIComponent(project.title)}'">
            </div>
            <div class="project-modal-body">
                <span class="project-modal-cat">${project.category}</span>
                <h3 class="project-modal-title">${project.title}</h3>
                <p class="project-modal-desc">${project.description}</p>
                <div class="project-modal-tech">
                    ${project.techStack.map(t => `<span class="tech-tag">${t}</span>`).join('')}
                </div>
                <div class="project-modal-links">
                    ${project.githubUrl ? `<a href="${project.githubUrl}" target="_blank" rel="noopener" class="project-link-btn">GitHub ↗</a>` : ''}
                    ${project.liveUrl ? `<a href="${project.liveUrl}" target="_blank" rel="noopener" class="project-link-btn primary">Live Demo ↗</a>` : ''}
                    ${project.downloadPaper ? `<a href="${project.downloadPaper}" download class="project-link-btn">Download Paper ↓</a>` : ''}
                </div>
            </div>
        </div>
    `).join('');
}

// ============================================================
//  SCROLL-DRIVEN INTRO REVEAL
// ============================================================

function initScrollReveal() {
    const section = document.getElementById('intro-section');
    const sticky = section ? section.querySelector('.intro-sticky-container') : null;
    const groups = section ? section.querySelectorAll('.reveal-group') : [];

    if (!section || !groups.length) return;

    function onScroll() {
        const sectionTop = section.getBoundingClientRect().top;
        const sectionHeight = section.offsetHeight;
        const viewH = window.innerHeight;

        // How far into the section we've scrolled (0 → 1)
        const progress = Math.min(Math.max(-sectionTop / (sectionHeight - viewH), 0), 1);

        const count = groups.length;
        groups.forEach((group, i) => {
            // Each group reveals in sequence across the scroll range
            const threshold = i / count;
            const groupProgress = Math.min(Math.max((progress - threshold) / (1 / count), 0), 1);

            group.style.opacity = 0.12 + groupProgress * 0.88;
            group.style.filter = `blur(${6 - groupProgress * 6}px)`;
        });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // run once on mount
}
