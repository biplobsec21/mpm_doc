// Dark Mode Management
function initializeDarkMode() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;

    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);

    themeToggle.addEventListener('click', function () {
        const currentTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

function applyTheme(theme) {
    if (theme === 'dark') {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
}

// Sidebar Collapsible Groups
function initializeCollapsibleGroups() {
    const groupTitles = document.querySelectorAll('.nav-group-title');

    groupTitles.forEach(title => {
        title.addEventListener('click', function (e) {
            e.preventDefault();
            const group = this.closest('.nav-group');
            if (!group) return;

            const items = group.querySelector('.nav-group-items');
            const toggle = this.querySelector('.nav-group-toggle');

            if (!items || !toggle) return;

            items.classList.toggle('collapsed');
            toggle.classList.toggle('collapsed');

            // Save state to localStorage
            const groupName = this.textContent.trim();
            const isCollapsed = items.classList.contains('collapsed');
            localStorage.setItem(`nav-group-${groupName}`, isCollapsed ? 'collapsed' : 'expanded');
        });
    });

    // Restore saved states
    groupTitles.forEach(title => {
        const group = title.closest('.nav-group');
        if (!group) return;

        const groupName = title.textContent.trim();
        const savedState = localStorage.getItem(`nav-group-${groupName}`);
        const items = group.querySelector('.nav-group-items');
        const toggle = title.querySelector('.nav-group-toggle');

        if (savedState === 'collapsed' && items && toggle) {
            items.classList.add('collapsed');
            toggle.classList.add('collapsed');
        }
    });
}

// Module Search and Filter   
function initializeModuleSearch() {
    const searchInput = document.getElementById('moduleSearch');
    if (!searchInput) return;

    searchInput.addEventListener('input', function (e) {
        const searchTerm = e.target.value.toLowerCase();
        const moduleItems = document.querySelectorAll('.module-item');
        let visibleCount = 0;

        moduleItems.forEach(item => {
            const text = item.textContent.toLowerCase();
            if (text.includes(searchTerm)) {
                item.classList.remove('hidden');
                visibleCount++;
            } else {
                item.classList.add('hidden');
            }
        });

        // Show/hide "no results" message
        const noResults = document.querySelector('.modules-no-results');
        if (noResults) {
            if (visibleCount === 0 && searchTerm.length > 0) {
                noResults.style.display = 'block';
            } else {
                noResults.style.display = 'none';
            }
        }
    });
}

// Breadcrumb Navigation
function generateBreadcrumb() {
    const breadcrumbContainer = document.querySelector('.breadcrumb');
    if (!breadcrumbContainer) return;

    const path = window.location.pathname;
    const isModule = path.includes('/modules/');

    breadcrumbContainer.innerHTML = '';

    // Home link
    const homeItem = document.createElement('div');
    homeItem.className = 'breadcrumb-item';
    homeItem.innerHTML = '<a href="' + (isModule ? '../../' : './') + 'index.html"><i class="fas fa-home"></i> Home</a>';
    breadcrumbContainer.appendChild(homeItem);

    if (isModule) {
        // Add separator
        const separator1 = document.createElement('span');
        separator1.className = 'breadcrumb-separator';
        separator1.innerHTML = '<i class="fas fa-chevron-right"></i>';
        breadcrumbContainer.appendChild(separator1);

        // Add module name
        const filename = path.split('/').pop().replace('.html', '').replace('-', ' ');
        const moduleName = filename.charAt(0).toUpperCase() + filename.slice(1);

        const moduleItem = document.createElement('div');
        moduleItem.className = 'breadcrumb-item active';
        moduleItem.textContent = moduleName;
        breadcrumbContainer.appendChild(moduleItem);
    }
}

// Navigation and Sidebar Management
document.addEventListener('DOMContentLoaded', function () {
    initializeDarkMode();
    initializeCollapsibleGroups();
    initializeModuleSearch();
    generateBreadcrumb();
    initializeSidebar();
    initializeSearch();
    updateActiveNavLink();
    setupSmoothScrolling();
});

// Sidebar Toggle for Mobile
function initializeSidebar() {
    const sidebarToggle = document.getElementById('sidebarToggleMobile');
    const sidebar = document.getElementById('sidebar');

    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function (e) {
            e.stopPropagation();
            if (sidebar.classList.contains('hidden')) {
                sidebar.classList.remove('hidden');
                sidebar.classList.add('active');
                document.body.style.overflow = 'hidden';
            } else {
                sidebar.classList.add('hidden');
                sidebar.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });

        // Close sidebar when a link is clicked
        const navLinks = sidebar.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function () {
                if (window.innerWidth < 768) {
                    sidebar.classList.add('hidden');
                    sidebar.classList.remove('active');
                    document.body.style.overflow = 'auto';
                }
            });
        });

        // Close sidebar when clicking outside
        document.addEventListener('click', function (event) {
            if (!sidebar.contains(event.target) && !sidebarToggle.contains(event.target)) {
                if (window.innerWidth < 768 && sidebar.classList.contains('active')) {
                    sidebar.classList.add('hidden');
                    sidebar.classList.remove('active');
                    document.body.style.overflow = 'auto';
                }
            }
        });

        // Close sidebar on window resize
        window.addEventListener('resize', function () {
            if (window.innerWidth >= 768) {
                sidebar.classList.remove('hidden');
                sidebar.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }
}

// Navigation Function
function navigateTo(event, path) {
    event.preventDefault();
    window.location.href = path;
}

// Update Active Navigation Link
function updateActiveNavLink() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');

        // Match the current page
        if (href && (
            (currentPath.includes(href) && href !== '#') ||
            (currentPath.endsWith('/') && href === '#') ||
            (currentPath.endsWith('index.html') && href === '#')
        )) {
            link.classList.add('active');
        }
    });
}

// Simple Search Functionality
function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;

    searchInput.addEventListener('input', function (e) {
        const searchTerm = e.target.value.toLowerCase();

        if (searchTerm.length === 0) {
            // Reset display if search is empty
            clearSearchHighlights();
            return;
        }

        // Add visual feedback
        if (searchTerm.length > 0) {
            highlightSearchTerms(searchTerm);
        }
    });

    // Handle Enter key - could integrate with search provider later
    searchInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            performSearch(this.value);
        }
    });
}

// Highlight search terms in page
function highlightSearchTerms(term) {
    if (term.length === 0) {
        clearSearchHighlights();
        return;
    }

    const body = document.querySelector('main') || document.body;
    const regex = new RegExp(`(${term})`, 'gi');
    const walker = document.createTreeWalker(
        body,
        NodeFilter.SHOW_TEXT,
        null,
        false
    );

    let node;
    const nodesToReplace = [];

    while (node = walker.nextNode()) {
        if (regex.test(node.nodeValue)) {
            nodesToReplace.push(node);
        }
    }

    nodesToReplace.forEach(node => {
        const span = document.createElement('span');
        span.innerHTML = node.nodeValue.replace(
            new RegExp(`(${term})`, 'gi'),
            '<mark style="background-color: rgba(255, 193, 7, 0.5); border-radius: 2px; padding: 2px 4px;">$1</mark>'
        );
        node.parentNode.replaceChild(span, node);
    });
}

function clearSearchHighlights() {
    const marks = document.querySelectorAll('mark');
    marks.forEach(mark => {
        const parent = mark.parentNode;
        while (mark.firstChild) {
            parent.insertBefore(mark.firstChild, mark);
        }
        parent.removeChild(mark);
    });
}

// Search Function (can be enhanced later)
function performSearch(query) {
    if (!query.trim()) return;

    // This is a placeholder for search functionality
    console.log('Performing search for:', query);

    // In a real implementation, this could:
    // 1. Search through page content
    // 2. Highlight matching terms
    // 3. Show search results with navigation
}

// Smooth Scrolling for Anchor Links
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '#!') return;

            e.preventDefault();
            const target = document.querySelector(href);

            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Update URL without full page reload
                window.history.pushState(null, null, href);
            }
        });
    });
}

// Table of Contents Generator (for long pages)
function generateTableOfContents() {
    const headings = document.querySelectorAll('main h2, main h3');
    const toc = document.createElement('nav');
    toc.className = 'bg-slate-50 p-6 rounded-lg border border-slate-200 mb-8';

    const tocList = document.createElement('ul');
    tocList.className = 'space-y-2';

    headings.forEach((heading, index) => {
        if (!heading.id) {
            heading.id = `heading-${index}`;
        }

        const li = document.createElement('li');
        const level = parseInt(heading.tagName[1]);
        const indent = (level - 2) * 1.5;

        const link = document.createElement('a');
        link.href = `#${heading.id}`;
        link.textContent = heading.textContent;
        link.className = 'text-blue-600 hover:text-blue-700 transition';
        link.style.marginLeft = `${indent}rem`;

        li.appendChild(link);
        tocList.appendChild(li);
    });

    toc.appendChild(tocList);
    return toc;
}

// Code Block Copy Functionality
function initializeCodeBlocks() {
    const codeBlocks = document.querySelectorAll('.code-block');

    codeBlocks.forEach((block, index) => {
        const copyButton = document.createElement('button');
        copyButton.textContent = 'Copy';
        copyButton.className = 'absolute top-2 right-2 px-3 py-1 bg-slate-700 text-white text-sm rounded hover:bg-slate-600 transition';
        copyButton.setAttribute('data-code-index', index);

        copyButton.addEventListener('click', function () {
            const code = block.querySelector('code').textContent;
            navigator.clipboard.writeText(code).then(() => {
                copyButton.textContent = 'Copied!';
                setTimeout(() => {
                    copyButton.textContent = 'Copy';
                }, 2000);
            });
        });

        block.style.position = 'relative';
        block.appendChild(copyButton);
    });
}

// Responsive Table of Contents
function initializeResponsiveTableOfContents() {
    const toc = document.querySelector('.table-of-contents');
    if (!toc) return;

    const tocToggle = document.createElement('button');
    tocToggle.className = 'md:hidden w-full mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-blue-600 font-semibold hover:bg-blue-100 transition';
    tocToggle.textContent = '📋 Table of Contents';

    tocToggle.addEventListener('click', function () {
        this.nextElementSibling.classList.toggle('hidden');
        this.textContent = this.nextElementSibling.classList.contains('hidden')
            ? '📋 Show Table of Contents'
            : '📋 Hide Table of Contents';
    });

    if (toc.previousElementSibling) {
        toc.parentNode.insertBefore(tocToggle, toc);
    }
}

// Highlight Active Section Based on Scroll Position
function initializeScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', function () {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');

            if (href && href.includes(current)) {
                link.classList.add('active');
            }
        });
    });
}

// Expand/Collapse Section Helper
function toggleSection(button) {
    const section = button.nextElementSibling;
    const isVisible = section.style.display !== 'none';

    section.style.display = isVisible ? 'none' : 'block';
    button.textContent = isVisible ? '➕ ' : '➖ ' + button.textContent.substring(2);
}

// Dark Mode Toggle (optional)
function initializeDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (!darkModeToggle) return;

    const isDarkMode = localStorage.getItem('darkMode') === 'true';

    if (isDarkMode) {
        document.documentElement.classList.add('dark');
        darkModeToggle.textContent = '☀️';
    }

    darkModeToggle.addEventListener('click', function () {
        const isCurrentlyDark = document.documentElement.classList.contains('dark');

        if (isCurrentlyDark) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('darkMode', 'false');
            this.textContent = '🌙';
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('darkMode', 'true');
            this.textContent = '☀️';
        }
    });
}

// Breadcrumb Generator
function generateBreadcrumbs() {
    const path = window.location.pathname.split('/').filter(p => p);
    const breadcrumbs = ['Home'];
    const breadcrumbLinks = ['/'];

    path.forEach(segment => {
        breadcrumbs.push(decodeURIComponent(segment.replace(/-/g, ' ')).replace('.html', ''));
        breadcrumbLinks.push('/' + path.slice(0, path.indexOf(segment) + 1).join('/'));
    });

    const breadcrumbNav = document.createElement('nav');
    breadcrumbNav.className = 'mb-8 flex items-center gap-2 text-sm text-slate-600';
    breadcrumbNav.setAttribute('aria-label', 'Breadcrumb');

    breadcrumbs.forEach((breadcrumb, index) => {
        if (index < breadcrumbs.length - 1) {
            const link = document.createElement('a');
            link.href = breadcrumbLinks[index];
            link.textContent = breadcrumb;
            link.className = 'hover:text-blue-600 transition';
            breadcrumbNav.appendChild(link);

            const separator = document.createElement('span');
            separator.textContent = '/';
            separator.className = 'text-slate-400';
            breadcrumbNav.appendChild(separator);
        } else {
            const span = document.createElement('span');
            span.textContent = breadcrumb;
            span.className = 'text-slate-900 font-semibold';
            breadcrumbNav.appendChild(span);
        }
    });

    return breadcrumbNav;
}

// Utility: Scroll to Top Button
function initializeScrollToTop() {
    const scrollButton = document.getElementById('scrollToTopButton');
    if (!scrollButton) return;

    window.addEventListener('scroll', function () {
        if (window.scrollY > 300) {
            scrollButton.style.display = 'block';
        } else {
            scrollButton.style.display = 'none';
        }
    });

    scrollButton.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Helper: Debounce function for search
function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
    };
}

// Initialize Code Blocks on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeCodeBlocks);
} else {
    initializeCodeBlocks();
}

// Export functions for use in module pages
window.toggleSection = toggleSection;
window.navigateTo = navigateTo;
window.performSearch = performSearch;
window.generateTableOfContents = generateTableOfContents;
window.generateBreadcrumbs = generateBreadcrumbs;
window.initializeScrollToTop = initializeScrollToTop;
