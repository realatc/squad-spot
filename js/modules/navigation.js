// Navigation Module
const Navigation = {
    currentPage: 'squads',
    
    init() {
        this.bindEvents();
        this.setupProfileMenu();
    },
    
    bindEvents() {
        // Bottom navigation
        const navButtons = document.querySelectorAll('.nav-btn');
        navButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const page = e.currentTarget.dataset.page;
                this.switchPage(page);
            });
        });
        
        // Profile menu
        const profileButton = document.getElementById('profileButton');
        const profileDropdown = document.getElementById('profileDropdown');
        
        if (profileButton && profileDropdown) {
            profileButton.addEventListener('click', () => {
                profileDropdown.classList.toggle('show');
            });
            
            // Close dropdown when clicking outside
            document.addEventListener('click', (e) => {
                if (!profileButton.contains(e.target) && !profileDropdown.contains(e.target)) {
                    profileDropdown.classList.remove('show');
                }
            });
        }
    },
    
    switchPage(pageName) {
        // Hide all pages
        const pages = document.querySelectorAll('.page');
        pages.forEach(page => page.classList.remove('active'));
        
        // Show target page
        const targetPage = document.getElementById(`${pageName}-page`);
        if (targetPage) {
            targetPage.classList.add('active');
        }
        
        // Update navigation buttons
        const navButtons = document.querySelectorAll('.nav-btn');
        navButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.page === pageName) {
                btn.classList.add('active');
            }
        });
        
        this.currentPage = pageName;
        
        // Trigger page-specific events
        this.onPageChange(pageName);
    },
    
    onPageChange(pageName) {
        // Dispatch custom event for other modules to listen to
        const event = new CustomEvent('pageChanged', { detail: { page: pageName } });
        document.dispatchEvent(event);
        
        // Page-specific initialization
        switch (pageName) {
            case 'squads':
                if (typeof SquadManager !== 'undefined') {
                    SquadManager.loadSquads();
                }
                break;
            case 'hangouts':
                if (typeof HangoutManager !== 'undefined') {
                    HangoutManager.loadHangouts();
                }
                break;
            case 'discover':
                if (typeof VenueManager !== 'undefined') {
                    VenueManager.loadVenues();
                }
                break;
            case 'activity':
                if (typeof ActivityManager !== 'undefined') {
                    ActivityManager.loadActivity();
                }
                break;
        }
    },
    
    setupProfileMenu() {
        const profileItems = document.querySelectorAll('.profile-item');
        profileItems.forEach(item => {
            item.addEventListener('click', (e) => {
                const text = e.currentTarget.textContent.trim();
                this.handleProfileAction(text);
            });
        });
        // Attach handler to Reset Demo Data item
        const resetItem = document.getElementById('resetDemoDataItem');
        if (resetItem) {
            resetItem.addEventListener('click', (e) => {
                e.stopPropagation();
                if (confirm('Are you sure you want to reset demo data? This will reload the page.')) {
                    localStorage.clear();
                    location.reload();
                }
            });
        }
    },
    
    handleProfileAction(action) {
        switch (action) {
            case 'Profile':
                this.showProfileModal();
                break;
            case 'Settings':
                this.showSettingsModal();
                break;
            case 'Logout':
                this.handleLogout();
                break;
        }
        
        // Close dropdown
        const profileDropdown = document.getElementById('profileDropdown');
        if (profileDropdown) {
            profileDropdown.classList.remove('show');
        }
    },
    
    showProfileModal() {
        const modal = document.getElementById('modal');
        const modalTitle = document.getElementById('modalTitle');
        const modalContent = document.getElementById('modalContent');
        
        modalTitle.textContent = 'Profile';
        modalContent.innerHTML = `
            <div class="profile-form">
                <div class="form-group">
                    <label>Name</label>
                    <input type="text" value="Demo User" class="form-input">
                </div>
                <div class="form-group">
                    <label>Email</label>
                    <input type="email" value="demo@example.com" class="form-input">
                </div>
                <div class="form-group">
                    <label>Location</label>
                    <input type="text" value="San Francisco, CA" class="form-input">
                </div>
                <div class="form-actions">
                    <button class="btn btn-primary">Save Changes</button>
                </div>
            </div>
        `;
        
        UI.showModal();
    },
    
    showSettingsModal() {
        const modal = document.getElementById('modal');
        const modalTitle = document.getElementById('modalTitle');
        const modalContent = document.getElementById('modalContent');
        
        modalTitle.textContent = 'Settings';
        modalContent.innerHTML = `
            <div class="settings-form">
                <div class="setting-item">
                    <label>Dark Mode</label>
                    <input type="checkbox" id="darkModeToggle">
                </div>
                <div class="setting-item">
                    <label>Location Services</label>
                    <input type="checkbox" checked>
                </div>
                <div class="setting-item">
                    <label>Notifications</label>
                    <input type="checkbox" checked>
                </div>
            </div>
        `;
        
        UI.showModal();
        
        // Handle dark mode toggle
        const darkModeToggle = document.getElementById('darkModeToggle');
        if (darkModeToggle) {
            darkModeToggle.addEventListener('change', (e) => {
                document.documentElement.setAttribute('data-theme', e.target.checked ? 'dark' : 'light');
            });
        }
    },
    
    handleLogout() {
        if (confirm('Are you sure you want to logout?')) {
            // Clear any stored data
            localStorage.clear();
            sessionStorage.clear();
            
            // For demo purposes, just show a message
            alert('Logged out successfully!');
        }
    }
};

// Initialize navigation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    Navigation.init();
    // Attach Reset Demo Data handler globally
    document.body.addEventListener('click', function(e) {
        const resetItem = e.target.closest('#resetDemoDataItem');
        if (resetItem) {
            e.stopPropagation();
            if (confirm('Are you sure you want to reset demo data? This will reload the page.')) {
                localStorage.clear();
                location.reload();
            }
        }
    });
}); 