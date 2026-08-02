// ==========================================================================
// NEXUS PETROLEUM — INTERACTIVE UI & TELEMETRY CONTROLLER
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------------------------
    // 1. NAVBAR SCROLL & ACTIVE SECTION HIGHLIGHTING (SCROLLSPY)
    // ----------------------------------------------------------------------
    const navbar = document.getElementById('navbar');
    const backToTop = document.getElementById('backToTop');
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Navbar glassmorphic background
        if (currentScroll > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Back to top button visibility
        if (backToTop) {
            if (currentScroll > 400) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        }

        // Active link scrollspy
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            if (currentScroll >= sectionTop && currentScroll < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });

    // ----------------------------------------------------------------------
    // 2. MOBILE HAMBURGER TOGGLE
    // ----------------------------------------------------------------------
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }

    // ----------------------------------------------------------------------
    // 3. FLOATING HERO PARTICLES GENERATOR
    // ----------------------------------------------------------------------
    const particlesContainer = document.getElementById('particles');
    if (particlesContainer) {
        function createParticle() {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 5 + 's';
            particle.style.animationDuration = (Math.random() * 5 + 5) + 's';
            
            const size = Math.random() * 3 + 2;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            particle.style.background = Math.random() > 0.4 ? '#FF6B00' : '#10B981';
            
            particlesContainer.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, 9000);
        }

        // Create initial batch
        for (let i = 0; i < 24; i++) {
            setTimeout(createParticle, i * 180);
        }
        setInterval(createParticle, 600);
    }

    // ----------------------------------------------------------------------
    // 4. INTERACTIVE TIMELINE / HISTORY TABS (ABOUT SECTION)
    // ----------------------------------------------------------------------
    const timelineTabs = document.querySelectorAll('.time-tab');
    const timelineItems = document.querySelectorAll('.timeline-item');

    timelineTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const selectedYear = tab.getAttribute('data-year');
            
            timelineTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            timelineItems.forEach(item => {
                if (item.getAttribute('data-year') === selectedYear) {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            });
        });
    });

    // ----------------------------------------------------------------------
    // 5. INTERACTIVE PROJECT FILTERING (FEATURED ASSETS)
    // ----------------------------------------------------------------------
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const filterValue = btn.getAttribute('data-filter');

            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(10px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 200);
                }
            });
        });
    });

    // ----------------------------------------------------------------------
    // 6. INTERACTIVE SVG WORLD MAP & REGIONAL TELEMETRY DATA
    // ----------------------------------------------------------------------
    const regionalData = {
        na: {
            badge: 'NORTH AMERICA HUB',
            title: 'Permian Basin & Gulf of Mexico Deepwater',
            desc: 'Headquarters operations overseeing 120+ exploration sites, world-scale LNG export facilities, and our primary CCUS carbon capture network.',
            output: '1,250,000 bbl/d',
            rigs: '42 Offshore/Onshore',
            esg: '100% Zero-Flaring'
        },
        eu: {
            badge: 'NORTH SEA & EUROPE HUB',
            title: 'North Sea Horizon IV & Rotterdam Cleantech',
            desc: 'Operating fully electrified offshore platforms powered by adjacent wind farms and Europe’s largest synthetic aviation biofuel processing hub.',
            output: '480,000 bbl/d',
            rigs: '18 Electric Platforms',
            esg: '72% CO₂ Intensity Cut'
        },
        me: {
            badge: 'MIDDLE EAST & GULF HUB',
            title: 'Arabian Gulf Refining & Hydrogen Complex',
            desc: 'High-throughput low-sulfur refining facilities integrated with industrial-scale blue and green hydrogen production for Asian and European markets.',
            output: '620,000 bbl/d',
            rigs: '24 Processing Hubs',
            esg: 'ISO 14001 Audited'
        },
        af: {
            badge: 'WEST AFRICA DEEPWATER HUB',
            title: 'Gulf of Guinea Deepwater Exploration',
            desc: 'Ultra-deepwater FPSO vessels featuring computerized blowout preventers and community-first solar infrastructure initiatives across West Africa.',
            output: '310,000 bbl/d',
            rigs: '14 Offshore FPSOs',
            esg: 'Zero Marine Spills'
        },
        ap: {
            badge: 'ASIA-PACIFIC & SINGAPORE HUB',
            title: 'Singapore Cryogenic LNG & Biofuels Hub',
            desc: 'Asia’s primary distribution terminal for LNG and marine clean fuel bunkering, supplying 18 regional economies with reliable transition energy.',
            output: '12M Tons LNG/Yr',
            rigs: '8 Terminals / Hubs',
            esg: '9 Yrs Zero-LTI'
        },
        sa: {
            badge: 'SOUTH AMERICA OFFSHORE HUB',
            title: 'Atlantic Margin Deepwater Basin',
            desc: 'Pioneering subsea robotic extraction and advanced 4D seismic imaging that minimizes seafloor disturbance while uncovering high-yield reserves.',
            output: '180,000 bbl/d',
            rigs: '9 Deepwater Units',
            esg: '99.9% Site Safety'
        }
    };

    const mapDots = document.querySelectorAll('.map-dot');
    const regionPills = document.querySelectorAll('.region-pill');
    const regionBadge = document.getElementById('regionBadge');
    const regionTitle = document.getElementById('regionTitle');
    const regionDesc = document.getElementById('regionDesc');
    const regionOutput = document.getElementById('regionOutput');
    const regionRigs = document.getElementById('regionRigs');
    const regionEsg = document.getElementById('regionEsg');
    const regionDetailCard = document.getElementById('regionDetailCard');

    function selectRegion(regionKey) {
        const data = regionalData[regionKey];
        if (!data) return;

        // Update active dot and pill classes
        mapDots.forEach(dot => {
            dot.classList.toggle('active', dot.getAttribute('data-region') === regionKey);
        });
        regionPills.forEach(pill => {
            pill.classList.toggle('active', pill.getAttribute('data-region') === regionKey);
        });

        // Smooth card transition
        if (regionDetailCard) {
            regionDetailCard.style.opacity = '0';
            regionDetailCard.style.transform = 'translateY(8px)';

            setTimeout(() => {
                if (regionBadge) regionBadge.innerText = data.badge;
                if (regionTitle) regionTitle.innerText = data.title;
                if (regionDesc) regionDesc.innerText = data.desc;
                if (regionOutput) regionOutput.innerText = data.output;
                if (regionRigs) regionRigs.innerText = data.rigs;
                if (regionEsg) regionEsg.innerText = data.esg;

                regionDetailCard.style.opacity = '1';
                regionDetailCard.style.transform = 'translateY(0)';
            }, 180);
        }
    }

    mapDots.forEach(dot => {
        dot.addEventListener('click', () => selectRegion(dot.getAttribute('data-region')));
        dot.addEventListener('mouseenter', () => selectRegion(dot.getAttribute('data-region')));
    });

    regionPills.forEach(pill => {
        pill.addEventListener('click', () => selectRegion(pill.getAttribute('data-region')));
    });

    // ----------------------------------------------------------------------
    // 7. SERVICE TECHNICAL SPECIFICATIONS MODAL SYSTEM
    // ----------------------------------------------------------------------
    const serviceSpecs = {
        exploration: {
            tag: 'UPSTREAM TECH • EXPLORATION',
            title: 'Upstream Exploration Technical Specifications',
            body: `
                <p>Nexus Upstream Exploration combines high-density 3D/4D seismic imaging, AI-assisted stratigraphy modeling, and non-invasive geochemical surveys to identify hydrocarbon and natural gas reservoirs with unprecedented precision.</p>
                <ul>
                    <li><strong>Seismic Accuracy:</strong> Sub-surface imaging resolution down to 10-meter intervals at depths exceeding 8,000 meters.</li>
                    <li><strong>AI Reservoir Modeling:</strong> Predicts well-yield and reservoir pressure with 96.4% verified historical accuracy.</li>
                    <li><strong>Environmental Footprint:</strong> Zero-explosive vibroseis acoustic sources with 100% surface reclamation.</li>
                    <li><strong>Global Footprint:</strong> Currently managing 42 exploration licenses across North America, the North Sea, and West Africa.</li>
                </ul>
            `
        },
        production: {
            tag: 'UPSTREAM TECH • PRODUCTION',
            title: 'Deepwater & Onshore Production Specifications',
            body: `
                <p>Our extraction platforms are engineered for extreme environments, utilizing fully automated Blowout Preventers (BOPs), closed-loop methane recovery, and modular subsea manifolds.</p>
                <ul>
                    <li><strong>Deepwater Capacity:</strong> Operating subsea drilling assemblies down to 3,500m water depth in the Gulf of Mexico and Atlantic Margin.</li>
                    <li><strong>Methane Sealing:</strong> Continuous optical gas imaging (OGI) cameras achieve 99.99% fugitive emission containment.</li>
                    <li><strong>Electrification:</strong> 60% of offshore platforms are now connected to shore grid or adjacent wind turbines.</li>
                    <li><strong>Safety Rating:</strong> 9 consecutive years of Tier-1 API Process Safety Compliance across all active rigs.</li>
                </ul>
            `
        },
        refining: {
            tag: 'MIDSTREAM TECH • REFINING',
            title: 'Refining & Petrochemicals Specifications',
            body: `
                <p>Nexus refining hubs convert crude feedstock into ultra-low-sulfur diesel, sustainable aviation fuel (SAF), synthetic lubricants, and high-purity industrial monomers.</p>
                <ul>
                    <li><strong>Hydroprocessing Efficiency:</strong> Catalytic cracking units achieving 99.2% conversion efficiency with minimal residue.</li>
                    <li><strong>Bio-Feedstock Integration:</strong> Refineries equipped to co-process up to 25% bio-based triglycerides and recycled oils.</li>
                    <li><strong>Water Recycling:</strong> Closed-loop cooling towers recycle 88% of process water on-site.</li>
                    <li><strong>Energy Intensity:</strong> 34% reduction in refinery energy consumption per barrel since 2018.</li>
                </ul>
            `
        },
        distribution: {
            tag: 'DOWNSTREAM TECH • LNG & LOGISTICS',
            title: 'Global Logistics & LNG Specifications',
            body: `
                <p>We manage an integrated global supply chain comprising double-hulled cryogenic LNG carriers, automated pipeline networks, and smart marine terminals.</p>
                <ul>
                    <li><strong>Cryogenic Containment:</strong> LNG vessels maintain -162°C storage with boil-off rates under 0.08% per day.</li>
                    <li><strong>Pipeline Telemetry:</strong> Real-time fiber-optic acoustic leak detection monitoring 14,000 km of distribution pipe.</li>
                    <li><strong>Bunkering Network:</strong> 18 international ports offering low-sulfur marine bunker fuel and LNG refueling.</li>
                    <li><strong>Reliability:</strong> 99.8% on-time delivery record across six continents over the past decade.</li>
                </ul>
            `
        },
        sustainability: {
            tag: 'CLEAN TECH • CCUS SEQUESTRATION',
            title: 'Carbon Capture, Utilization & Storage (CCUS)',
            body: `
                <p>Our CCUS division captures industrial CO₂ emissions at refining and power facilities, compressing and permanently injecting them into deep saline aquifers.</p>
                <ul>
                    <li><strong>Sequestration Volume:</strong> 4.5 Million Metric Tons of CO₂ safely stored annually across Texas and North Sea reservoirs.</li>
                    <li><strong>Capture Purity:</strong> Amine solvent absorption towers capture 94.2% of flue-gas CO₂ at 99.9% purity.</li>
                    <li><strong>Geological Verification:</strong> Continuous seismic micro-monitoring ensures zero CO₂ plume migration over decades.</li>
                    <li><strong>Carbon Credits:</strong> All sequestration volumes verified under ISO 14064 and SGS Global standards.</li>
                </ul>
            `
        },
        renewables: {
            tag: 'CLEAN TECH • RENEWABLES & H₂',
            title: 'Renewables & Green Hydrogen Specifications',
            body: `
                <p>Nexus is building a multi-gigawatt renewable portfolio to power refinery operations and feed commercial proton-exchange membrane (PEM) green hydrogen electrolyzers.</p>
                <ul>
                    <li><strong>Installed Capacity:</strong> 3.8 GW of integrated offshore wind and utility-scale solar arrays in development.</li>
                    <li><strong>Green H₂ Production:</strong> Texas and Singapore facilities producing 85,000 tons/yr of zero-carbon hydrogen.</li>
                    <li><strong>Grid Integration:</strong> Direct power purchase agreements (PPAs) supplying clean energy to regional utility grids.</li>
                    <li><strong>Net-Zero Roadmap:</strong> On track to power 100% of internal operations with zero-carbon energy by 2040.</li>
                </ul>
            `
        }
    };

    const modalBackdrop = document.getElementById('serviceModal');
    const modalTag = document.getElementById('modalTag');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    const modalCloseSecondaryBtn = document.getElementById('modalCloseSecondaryBtn');
    const modalTriggers = document.querySelectorAll('.btn-modal-trigger');

    function openModal(serviceKey) {
        const spec = serviceSpecs[serviceKey];
        if (!spec || !modalBackdrop) return;

        if (modalTag) modalTag.innerText = spec.tag;
        if (modalTitle) modalTitle.innerText = spec.title;
        if (modalBody) modalBody.innerHTML = spec.body;

        modalBackdrop.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        if (!modalBackdrop) return;
        modalBackdrop.classList.remove('active');
        document.body.style.overflow = '';
    }

    modalTriggers.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const serviceKey = btn.getAttribute('data-service');
            openModal(serviceKey);
        });
    });

    if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
    if (modalCloseSecondaryBtn) modalCloseSecondaryBtn.addEventListener('click', closeModal);

    if (modalBackdrop) {
        modalBackdrop.addEventListener('click', (e) => {
            if (e.target === modalBackdrop) closeModal();
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalBackdrop && modalBackdrop.classList.contains('active')) {
            closeModal();
        }
    });

    // ----------------------------------------------------------------------
    // 8. ONE-CLICK COPY TO CLIPBOARD & TOAST NOTIFICATION
    // ----------------------------------------------------------------------
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');

    function showToast(message) {
        if (!toast || !toastMessage) return;
        toastMessage.innerText = message;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3200);
    }

    document.querySelectorAll('.btn-copy').forEach(btn => {
        btn.addEventListener('click', () => {
            const textToCopy = btn.getAttribute('data-copy');
            if (textToCopy) {
                navigator.clipboard.writeText(textToCopy).then(() => {
                    showToast(`Copied "${textToCopy}" to clipboard!`);
                }).catch(() => {
                    showToast(`Contact: ${textToCopy}`);
                });
            }
        });
    });

    // ----------------------------------------------------------------------
    // 9. ANIMATED STAT COUNTERS & ESG PROGRESS BARS ON SCROLL
    // ----------------------------------------------------------------------
    const counters = document.querySelectorAll('[data-target]');
    
    const animateCounter = (counter) => {
        const target = parseFloat(counter.getAttribute('data-target'));
        const duration = 1800; // ms
        const startTime = performance.now();

        const updateCounter = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const current = easeProgress * target;

            if (target % 1 === 0) {
                counter.innerText = Math.round(current).toLocaleString();
            } else {
                counter.innerText = current.toFixed(1);
            }

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                if (target % 1 === 0) {
                    counter.innerText = target.toLocaleString();
                } else {
                    counter.innerText = target.toFixed(1);
                }
            }
        };

        requestAnimationFrame(updateCounter);
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.animated) {
                entry.target.dataset.animated = 'true';
                animateCounter(entry.target);
            }
        });
    }, { threshold: 0.25 });

    counters.forEach(counter => counterObserver.observe(counter));

    // Animate ESG Progress Bars
    const esgBars = document.querySelectorAll('.progress-fill');
    const esgObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.animated) {
                entry.target.dataset.animated = 'true';
                const targetWidth = entry.target.style.width;
                entry.target.style.width = '0%';
                setTimeout(() => {
                    entry.target.style.width = targetWidth;
                }, 100);
            }
        });
    }, { threshold: 0.3 });

    esgBars.forEach(bar => esgObserver.observe(bar));

    // ----------------------------------------------------------------------
    // 10. CONTACT FORM & NEWSLETTER SUBMISSION HANDLERS
    // ----------------------------------------------------------------------
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const button = contactForm.querySelector('button[type="submit"]');
            const originalText = button.innerHTML;

            button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Transmitting Inquiry...';
            button.disabled = true;

            setTimeout(() => {
                button.innerHTML = '<i class="fas fa-check"></i> Message Successfully Transmitted!';
                button.style.background = '#10B981';

                showToast('Thank you! A Nexus Petroleum representative will respond within 24 hours.');
                contactForm.reset();

                setTimeout(() => {
                    button.innerHTML = originalText;
                    button.style.background = '';
                    button.disabled = false;
                }, 3500);
            }, 1400);
        });
    }

    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = newsletterForm.querySelector('input[type="email"]');
            const button = newsletterForm.querySelector('button');
            const originalText = button.innerText;

            button.innerText = 'Subscribing...';
            button.disabled = true;

            setTimeout(() => {
                showToast(`Subscribed "${input.value}" to Nexus Quarterly Briefs!`);
                input.value = '';
                button.innerText = 'Subscribed!';
                button.style.background = '#10B981';

                setTimeout(() => {
                    button.innerText = originalText;
                    button.style.background = '';
                    button.disabled = false;
                }, 3000);
            }, 1000);
        });
    }

    // ----------------------------------------------------------------------
    // 11. DYNAMIC FOOTER COPYRIGHT YEAR
    // ----------------------------------------------------------------------
    const copyrightText = document.getElementById('copyrightText');
    if (copyrightText) {
        const year = new Date().getFullYear();
        copyrightText.innerHTML = `&copy; ${year} Nexus Petroleum Corporation. All rights reserved.`;
    }

    // ----------------------------------------------------------------------
    // 12. CONSOLE WELCOME MESSAGE
    // ----------------------------------------------------------------------
    console.log('%c⚡ NEXUS PETROLEUM CORPORATION ⚡', 'color: #FF6B00; font-size: 22px; font-weight: bold; font-family: monospace;');
    console.log('%cPowering Tomorrow\'s Clean Energy Future • ISO 14001 & 45001 Certified', 'color: #10B981; font-size: 13px; font-weight: 600;');
    console.log('%cInterested in our carbon capture or offshore technologies? Email us at contact@nexuspetroleum.com', 'color: #94A3B8; font-size: 11px;');
});
