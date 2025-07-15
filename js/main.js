// Main Application File
const SquadSpot = {
    init() {
        this.initializeModules();
        this.bindGlobalEvents();
        this.loadInitialData();
    },
    
    initializeModules() {
        // Initialize all managers
        this.initializeSquadManager();
        this.initializeHangoutManager();
        this.initializeVenueManager();
        this.initializeActivityManager();
        
        // Bind button events
        this.bindButtonEvents();
    },
    
    initializeSquadManager() {
        window.SquadManager = {
            loadSquads() {
                const squads = DataManager.getSquads();
                const squadsGrid = document.getElementById('squadsGrid');
                
                if (squadsGrid) {
                    if (squads.length === 0) {
                        squadsGrid.innerHTML = `
                            <div class="empty-state">
                                <svg width="64" height="64" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0 0 18.54 8H17c-.8 0-1.54.37-2.01 1l-1.7 2.26A6.49 6.49 0 0 0 10.88 8H8.5c-.8 0-1.54.37-2.01 1L4.96 14.37A1.5 1.5 0 0 0 6.5 16H9v6h2v-6h1v6h2v-6h4z"/>
                                </svg>
                                <h3>No squads yet</h3>
                                <p>Create your first squad to start planning hangouts with friends!</p>
                            </div>
                        `;
                    } else {
                        const squadsHTML = squads.map(squad => `
                            <div class="squad-card card" data-squad-id="${squad.id}">
                                <div class="squad-header-row" style="display:flex;align-items:center;justify-content:space-between;gap:12px;">
                                    <div style="display:flex;align-items:center;gap:12px;">
                                        <h3 style="margin:0;">${squad.name}</h3>
                                    </div>
                                    <button class="btn btn-outline squad-actions-btn" data-squad-id="${squad.id}" aria-label="Squad actions">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="12" cy="5.5" r="1.5" fill="currentColor"/>
                                            <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
                                            <circle cx="12" cy="18.5" r="1.5" fill="currentColor"/>
                                        </svg>
                                    </button>
                                </div>
                                <div class="squad-members" style="margin-top:18px;display:flex;align-items:center;gap:8px;">
                                    ${squad.members.slice(0, 3).map(member => 
                                        `<span class="member-avatar">${member.name.charAt(0)}</span>`
                                    ).join('')}
                                    ${squad.members.length > 3 ? `<span class="member-more">+${squad.members.length - 3}</span>` : ''}
                                    <span class="member-count-badge">${squad.members.length} members</span>
                                </div>
                            </div>
                        `).join('');
                        
                        squadsGrid.innerHTML = squadsHTML;
                        // Attach actions menu event listeners
                        document.querySelectorAll('.squad-actions-btn').forEach(btn => {
                            btn.addEventListener('click', (e) => {
                                e.stopPropagation();
                                const squadId = btn.getAttribute('data-squad-id');
                                SquadSpot.showSquadActionsMenu(squadId, btn);
                            });
                        });
                        // Attach click event to squad cards to open details
                        const squadCards = document.querySelectorAll('.squad-card');
                        squadCards.forEach(card => {
                            card.addEventListener('click', (e) => {
                                // Prevent if clicking the actions button or its children
                                if (e.target.closest('.squad-actions-btn')) return;
                                const squadId = card.getAttribute('data-squad-id');
                                SquadSpot.viewSquad(squadId);
                            });
                        });
                    }
                }
            }
        };
    },
    
    initializeHangoutManager() {
        window.HangoutManager = {
            loadHangouts() {
                const hangouts = DataManager.getHangouts();
                const hangoutsList = document.getElementById('hangoutsList');
                
                if (hangoutsList) {
                    if (hangouts.length === 0) {
                        hangoutsList.innerHTML = `
                            <div class="empty-state">
                                <svg width="64" height="64" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                                </svg>
                                <h3>No active hangouts</h3>
                                <p>Start planning your next hangout with friends!</p>
                                <button class="btn btn-primary" onclick="SquadSpot.showCreateHangoutModal()">
                                    Plan Hangout
                                </button>
                            </div>
                        `;
                    } else {
                        const hangoutsHTML = hangouts.map(hangout => {
                            const squad = DataManager.getSquads().find(s => s.id === hangout.squadId);
                            const totalVotes = Object.keys(hangout.votes).length;
                            const squadMemberCount = squad ? squad.members.length : 0;
                            
                            // Send notification to those who have not voted
                            const hasUserVoted = !!hangout.votes['user1']; // will replace ['user1'] with userId
                            const voteThreshold = Math.ceil(squadMemberCount / 2);
                            
                            if (!hasUserVoted && totalVotes >= voteThreshold) {
                                showNotification(
                                    "Reminder to vote!",
                                    `More than half of your squad voted for "${hangout.title}". Click to vote!`,
                                    "hangouts"
                                );
                                localStorage.setItem(notifKey, 'true');
                            }

                            return `
                                <div class="hangout-card card" data-hangout-id="${hangout.id}">
                                    <div class="hangout-header">
                                        <h3>${hangout.title}</h3>
                                        <span class="hangout-status ${hangout.status}">${hangout.status}</span>
                                    </div>
                                    <div class="hangout-details">
                                        <p><strong>Squad:</strong> ${squad ? squad.name : 'Unknown'}</p>
                                        <p><strong>Date:</strong> ${new Date(hangout.date).toLocaleDateString()}</p>
                                        <p><strong>Type:</strong> ${hangout.type}</p>
                                        <p><strong>Votes:</strong> ${totalVotes}/${squadMemberCount}</p>
                                    </div>
                                    <div class="hangout-venues">
                                        <h4>Venues:</h4>
                                        ${hangout.venues.map(venue => `
                                            <div class="venue-item">
                                                <span>${venue.name}</span>
                                                <span class="venue-votes">${venue.votes} votes</span>
                                            </div>
                                        `).join('')}
                                    </div>
                                    <div class="hangout-actions">
                                        <button class="btn btn-secondary" onclick="SquadSpot.viewHangout('${hangout.id}')">View Details</button>
                                        <button class="btn btn-primary" onclick="SquadSpot.voteHangout('${hangout.id}')">Vote</button>
                                    </div>
                                </div>
                            `;
                        }).join('');
                        
                        hangoutsList.innerHTML = hangoutsHTML;
                    }
                }
            }
        };
    },
    
    initializeVenueManager() {
        window.VenueManager = {
            currentFilter: 'all',
            
            loadVenues() {
                const venues = DataManager.getVenues(this.currentFilter);
                const venuesGrid = document.getElementById('venuesGrid');
                
                if (venuesGrid) {
                    const venuesHTML = venues.map(venue => `
                        <div class="venue-card card" data-venue-id="${venue.id}">
                            <div class="venue-image">
                                <img src="${venue.image}" alt="${venue.name}" onerror="this.src='https://via.placeholder.com/300x200?text=No+Image'">
                            </div>
                            <div class="venue-content">
                                <h3>${venue.name}</h3>
                                <div class="venue-meta">
                                    <span class="venue-rating">⭐ ${venue.rating}</span>
                                    <span class="venue-price">${venue.price}</span>
                                    <span class="venue-type">${venue.type}</span>
                                </div>
                                <p class="venue-description">${venue.description}</p>
                                <p class="venue-location">📍 ${venue.location}</p>
                                <div class="venue-actions">
                                    <button class="btn btn-secondary" onclick="SquadSpot.viewVenue('${venue.id}')">Details</button>
                                    <button class="btn btn-primary" onclick="SquadSpot.addToHangout('${venue.id}')">Add to Hangout</button>
                                </div>
                            </div>
                        </div>
                    `).join('');
                    
                    venuesGrid.innerHTML = venuesHTML;
                }
                
                // Bind filter events
                this.bindFilterEvents();
            },
            
            bindFilterEvents() {
                const filterButtons = document.querySelectorAll('.filter-btn');
                filterButtons.forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        // Remove active class from all buttons
                        filterButtons.forEach(b => b.classList.remove('active'));
                        
                        // Add active class to clicked button
                        e.target.classList.add('active');
                        
                        // Update filter and reload venues
                        this.currentFilter = e.target.dataset.type;
                        this.loadVenues();
                    });
                });
            }
        };
    },
    
    initializeActivityManager() {
        window.ActivityManager = {
            loadActivity() {
                const activities = DataManager.getActivity();
                const activityFeed = document.getElementById('activityFeed');
                
                if (activityFeed) {
                    if (activities.length === 0) {
                        activityFeed.innerHTML = `
                            <div class="empty-state">
                                <svg width="64" height="64" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M13.49 5.48c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-3.6 13.9l1-4.4 2.1 2v6h2v-7.5l-2.1-2 .6-3c1.3 1.5 3.3 2.5 5.5 2.5v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1l-5.2 2.2v4.7h2v-3.4l1.8-.7-1.6 8.1-4.9-1-.4 2 7 1.4z"/>
                                </svg>
                                <h3>No activity yet</h3>
                                <p>Start creating squads and planning hangouts to see activity here!</p>
                            </div>
                        `;
                    } else {
                        const activitiesHTML = activities.map(activity => `
                            <div class="activity-item">
                                <div class="activity-icon">
                                    ${this.getActivityIcon(activity.type)}
                                </div>
                                <div class="activity-content">
                                    <p class="activity-message">${activity.message}</p>
                                    <span class="activity-time">${DataManager.formatDate(activity.timestamp)}</span>
                                </div>
                            </div>
                        `).join('');
                        
                        activityFeed.innerHTML = activitiesHTML;
                    }
                }
            },
            
            getActivityIcon(type) {
                const icons = {
                    'squad_created': '<svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0 0 18.54 8H17c-.8 0-1.54.37-2.01 1l-1.7 2.26A6.49 6.49 0 0 0 10.88 8H8.5c-.8 0-1.54.37-2.01 1L4.96 14.37A1.5 1.5 0 0 0 6.5 16H9v6h2v-6h1v6h2v-6h4z"/></svg>',
                    'hangout_created': '<svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>',
                    'vote_cast': '<svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>',
                    'squad_joined': '<svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0 0 18.54 8H17c-.8 0-1.54.37-2.01 1l-1.7 2.26A6.49 6.49 0 0 0 10.88 8H8.5c-.8 0-1.54.37-2.01 1L4.96 14.37A1.5 1.5 0 0 0 6.5 16H9v6h2v-6h1v6h2v-6h4z"/></svg>'
                };
                return icons[type] || '<svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>';
            }
        };
    },
    
    bindButtonEvents() {
        // Create Squad button
        const createSquadBtn = document.getElementById('createSquadBtn');
        if (createSquadBtn) {
            createSquadBtn.addEventListener('click', () => {
                this.showCreateSquadModal();
            });
        }
        
        // Create Hangout button
        const createHangoutBtn = document.getElementById('createHangoutBtn');
        if (createHangoutBtn) {
            createHangoutBtn.addEventListener('click', () => {
                this.showCreateHangoutModal();
            });
        }
        
        // Search functionality
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.handleSearch(e.target.value);
            });
        }
    },
    
    bindGlobalEvents() {
        // Listen for page changes
        document.addEventListener('pageChanged', (e) => {
            console.log('Page changed to:', e.detail.page);
        });
    },
    
    loadInitialData() {
        // Load data for current page
        const currentPage = Navigation.currentPage;
        switch (currentPage) {
            case 'squads':
                SquadManager.loadSquads();
                break;
            case 'hangouts':
                HangoutManager.loadHangouts();
                break;
            case 'discover':
                VenueManager.loadVenues();
                break;
            case 'activity':
                ActivityManager.loadActivity();
                break;
        }
    },

    // Modal handlers
    showCreateSquadModal() {
        const fields = [
            { type: 'text', name: 'name', label: 'Squad Name', required: true }
        ];
        
        const form = UI.createForm(fields, 'create-squad');
        UI.showModal('Create New Squad', form.outerHTML);
    },
    
    showCreateHangoutModal() {
        const squads = DataManager.getSquads();
        const fields = [
            { type: 'text', name: 'title', label: 'Hangout Title', required: true },
            { 
                type: 'select', 
                name: 'squadId', 
                label: 'Select Squad', 
                required: true,
                options: squads.map(squad => ({ value: squad.id, label: squad.name }))
            },
            { 
                type: 'select', 
                name: 'type', 
                label: 'Event Type', 
                required: true,
                options: [
                    { value: 'food', label: 'Food & Dining' },
                    { value: 'entertainment', label: 'Entertainment' },
                    { value: 'outdoors', label: 'Outdoor Activities' }
                ]
            },
            { type: 'date', name: 'date', label: 'Date', required: true }
        ];
        
        const form = UI.createForm(fields, 'create-hangout');
        UI.showModal('Plan New Hangout', form.outerHTML);
    },
    
    // Action handlers
    viewSquad(squadId) {
        const squad = DataManager.getSquads().find(s => s.id === squadId);
        if (squad) {
            const content = `
                <div class="squad-details">
                    <h3>${squad.name}</h3>
                    <p><strong>Members:</strong></p>
                    <div class="members-list">
                        ${squad.members.map(member => `
                            <div class="member-item">
                                <span class="member-avatar">${member.name.charAt(0)}</span>
                                <span>${member.name}</span>
                            </div>
                        `).join('')}
                    </div>
                    <div class="squad-actions">
                        <button class="btn btn-primary" onclick="SquadSpot.createHangout('${squadId}')">Plan Hangout</button>
                        <button class="btn btn-secondary" onclick="UI.hideModal()">Close</button>
                    </div>
                </div>
            `;
            UI.showModal('Squad Details', content);
        }
    },
    
    createHangout(squadId) {
        UI.hideModal(); // Close squad modal if open
        const squad = DataManager.getSquads().find(s => s.id === squadId);
        
        const fields = [
            { type: 'text', name: 'title', label: 'Hangout Title', required: true },
            { type: 'hidden', name: 'squadId', value: squadId },
            { 
                type: 'select', 
                name: 'type', 
                label: 'Event Type', 
                required: true,
                options: [
                    { value: 'food', label: 'Food & Dining' },
                    { value: 'entertainment', label: 'Entertainment' },
                    { value: 'outdoors', label: 'Outdoor Activities' }
                ]
            },
            { type: 'date', name: 'date', label: 'Date', required: true }
        ];
        
        const form = UI.createForm(fields, 'create-hangout');
        UI.showModal('Plan New Hangout', form.outerHTML);
    },
    
    viewHangout(hangoutId) {
        const hangout = DataManager.getHangouts().find(h => h.id === hangoutId);
        const squad = DataManager.getSquads().find(s => s.id === hangout.squadId);
        
        if (hangout && squad) {
            const content = `
                <div class="hangout-details">
                    <h3>${hangout.title}</h3>
                    <p><strong>Squad:</strong> ${squad.name}</p>
                    <p><strong>Date:</strong> ${new Date(hangout.date).toLocaleDateString()}</p>
                    <p><strong>Type:</strong> ${hangout.type}</p>
                    <p><strong>Status:</strong> ${hangout.status}</p>
                    
                    <h4>Venues:</h4>
                    ${hangout.venues.map(venue => `
                        <div class="venue-item">
                            <span>${venue.name}</span>
                            <span class="venue-votes">${venue.votes} votes</span>
                        </div>
                    `).join('')}
                    
                    <div class="hangout-actions">
                        <button class="btn btn-primary" onclick="SquadSpot.voteHangout('${hangoutId}')">Vote</button>
                        <button class="btn btn-secondary" onclick="UI.hideModal()">Close</button>
                    </div>
                </div>
            `;
            UI.showModal('Hangout Details', content);
        }
    },
    
    voteHangout(hangoutId) {
        const hangout = DataManager.getHangouts().find(h => h.id === hangoutId);
        if (hangout) {
            const content = `
                <div class="vote-section">
                    <h3>Vote for a venue</h3>
                    <p>Select your preferred venue for "${hangout.title}":</p>
                    
                    <div class="venue-options">
                        ${hangout.venues.map(venue => `
                            <div class="venue-option" onclick="SquadSpot.castVote('${hangoutId}', '${venue.id}')">
                                <h4>${venue.name}</h4>
                                <p>${venue.description || 'No description available'}</p>
                                <div class="venue-meta">
                                    <span>⭐ ${venue.rating}</span>
                                    <span>${venue.price}</span>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                    
                    <div class="vote-actions">
                        <button class="btn btn-secondary" onclick="UI.hideModal()">Cancel</button>
                    </div>
                </div>
            `;
            UI.showModal('Cast Your Vote', content);
        }
    },
    
    castVote(hangoutId, venueId) {
        const success = DataManager.updateHangoutVote(hangoutId, 'user1', venueId);
        if (success) {
            UI.hideModal();
            UI.showNotification('Vote cast successfully!', 'success');
            
            // Refresh hangouts page
            if (Navigation.currentPage === 'hangouts') {
                HangoutManager.loadHangouts();
            }
            
            // Add activity
            const hangout = DataManager.getHangouts().find(h => h.id === hangoutId);
            const venue = hangout.venues.find(v => v.id === venueId);
            DataManager.addActivity({
                type: 'vote_cast',
                message: `Alex voted for ${venue.name}`,
                squadId: hangout.squadId
            });
        }

        // Poll notifications are in
        showNotification(
            "Poll results are in!",
            "View chosen venue.",
            "hangouts",
        )
    },
    
    viewVenue(venueId) {
        const venue = DataManager.getVenues().find(v => v.id === venueId);
        if (venue) {
            const content = `
                <div class="venue-details">
                    <img src="${venue.image}" alt="${venue.name}" style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px; margin-bottom: 16px;">
                    <h3>${venue.name}</h3>
                    <div class="venue-meta">
                        <span class="venue-rating">⭐ ${venue.rating}</span>
                        <span class="venue-price">${venue.price}</span>
                        <span class="venue-type">${venue.type}</span>
                    </div>
                    <p>${venue.description}</p>
                    <p><strong>Location:</strong> ${venue.location}</p>
                    
                    <div class="venue-actions">
                        <button class="btn btn-primary" onclick="SquadSpot.addToHangout('${venueId}')">Add to Hangout</button>
                        <button class="btn btn-secondary" onclick="UI.hideModal()">Close</button>
                    </div>
                </div>
            `;
            UI.showModal('Venue Details', content);
        }
    },
    
    addToHangout(venueId) {
        const hangouts = DataManager.getHangouts();
        if (hangouts.length === 0) {
            UI.showNotification('No hangouts available. Create one first!', 'warning');
            return;
        }
        
        const content = `
            <div class="add-to-hangout">
                <h3>Add to Hangout</h3>
                <p>Select a hangout to add this venue to:</p>
                
                <div class="hangout-options">
                    ${hangouts.map(hangout => `
                        <div class="hangout-option" onclick="SquadSpot.confirmAddToHangout('${venueId}', '${hangout.id}')">
                            <h4>${hangout.title}</h4>
                            <p>${new Date(hangout.date).toLocaleDateString()}</p>
                        </div>
                    `).join('')}
                </div>
                
                <div class="hangout-actions">
                    <button class="btn btn-secondary" onclick="UI.hideModal()">Cancel</button>
                </div>
            </div>
        `;
        UI.showModal('Add to Hangout', content);
    },
    
    confirmAddToHangout(venueId, hangoutId) {
        // This would add the venue to the hangout's venue list
        UI.hideModal();
        UI.showNotification('Venue added to hangout!', 'success');
    },
    
    handleSearch(query) {
        if (query.trim() === '') {
            VenueManager.currentFilter = 'all';
            VenueManager.loadVenues();
            return;
        }
        
        const venues = DataManager.searchVenues(query);
        const venuesGrid = document.getElementById('venuesGrid');
        
        if (venuesGrid) {
            if (venues.length === 0) {
                venuesGrid.innerHTML = `
                    <div class="empty-state">
                        <h3>No venues found</h3>
                        <p>Try adjusting your search terms.</p>
                    </div>
                `;
            } else {
                const venuesHTML = venues.map(venue => `
                    <div class="venue-card card" data-venue-id="${venue.id}">
                        <div class="venue-image">
                            <img src="${venue.image}" alt="${venue.name}" onerror="this.src='https://via.placeholder.com/300x200?text=No+Image'">
                        </div>
                        <div class="venue-content">
                            <h3>${venue.name}</h3>
                            <div class="venue-meta">
                                <span class="venue-rating">⭐ ${venue.rating}</span>
                                <span class="venue-price">${venue.price}</span>
                                <span class="venue-type">${venue.type}</span>
                            </div>
                            <p class="venue-description">${venue.description}</p>
                            <p class="venue-location">📍 ${venue.location}</p>
                            <div class="venue-actions">
                                <button class="btn btn-secondary" onclick="SquadSpot.viewVenue('${venue.id}')">Details</button>
                                <button class="btn btn-primary" onclick="SquadSpot.addToHangout('${venue.id}')">Add to Hangout</button>
                            </div>
                        </div>
                    </div>
                `).join('');
                
                venuesGrid.innerHTML = venuesHTML;
            }
        }
    }
};

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    SquadSpot.init();

    requestNotifPermission(); // Asks user for notification permission

    const newSquadBtn = document.getElementById('floatingNewSquadBtn');
    if (newSquadBtn) {
        newSquadBtn.addEventListener('click', () => {
            SquadSpot.showCreateSquadModal();
        });
    }
});

// User Notification Permission
function requestNotifPermission() {
    if (Notification.permission !== 'granted' && Notification.permission !== 'denied') {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                console.log('Notification permission granted');
            }
        });
    }
}

SquadSpot.showSquadActionsMenu = function(squadId, anchorBtn) {
    // Simple actions menu (can be expanded)
    const menu = document.createElement('div');
    menu.className = 'actions-menu';
    menu.style.position = 'absolute';
    menu.style.left = `${anchorBtn.getBoundingClientRect().left}px`;
    menu.style.top = `${anchorBtn.getBoundingClientRect().bottom + window.scrollY}px`;
    menu.style.background = '#222';
    menu.style.color = '#fff';
    menu.style.padding = '12px 0';
    menu.style.borderRadius = '10px';
    menu.style.boxShadow = '0 4px 16px rgba(0,0,0,0.2)';
    menu.style.zIndex = 2000;
    menu.innerHTML = `
        <button class="btn btn-secondary" style="width:100%;text-align:left;padding:12px 24px;border:none;background:none;" onclick="UI.hideModal();SquadSpot.viewSquad('${squadId}')">View Squad</button>
        <button class="btn btn-secondary" style="width:100%;text-align:left;padding:12px 24px;border:none;background:none;" onclick="UI.hideModal();SquadSpot.createHangout('${squadId}')">Plan Hangout</button>
        <button class="btn btn-danger" style="width:100%;text-align:left;padding:12px 24px;border:none;background:none;color:#f44336;" onclick="SquadSpot.deleteSquadConfirm('${squadId}')">Delete Squad</button>
    `;
    document.body.appendChild(menu);
    // Remove menu on click or touch outside
    setTimeout(() => {
        const removeMenu = (e) => {
            if (!menu.contains(e.target)) {
                menu.remove();
                document.removeEventListener('click', removeMenu, true);
                document.removeEventListener('touchstart', removeMenu, true);
            }
        };
        document.addEventListener('click', removeMenu, true);
        document.addEventListener('touchstart', removeMenu, true);
    }, 0);
}; 

SquadSpot.deleteSquadConfirm = function(squadId) {
    if (confirm('Are you sure you want to delete this squad? This action cannot be undone.')) {
        DataManager.removeSquad(squadId);
        // Refresh squads list
        if (typeof SquadManager !== 'undefined') {
            SquadManager.loadSquads();
        }
        UI.hideModal();
    }
}; 

// Notification handler
function showNotification(title, body, targetPage) {
    if (Notification.permission === 'granted') {
        const notification = new Notification(title, { 
            body, 
            //icon: ".png", // adding image is optional
            vibrate: true 
    });
        notification.onclick = () => {
            window.focus();
        
        setTimeout(() => {
            notification.close();
        }, 10 * 1000);

            if (targetPage) {
                const targetBtn = document.querySelector(`.nav-btn[data-page="${targetPage}"]`);
                if (targetBtn) targetBtn.click();
            }
        };
    }
}
/*window.NotificationManager = {
    checkNotifications() {
        const userID = 'user1'; // To be replaced with actual users later on
        const hangouts = DataManager.getHangouts();
        const squads = DataManager.getSquads();
        const unseenSquads = squads.filter(squad => !localStorage.getItem(`seenSquad_${squad.id}`));



        // Notfies user they have been added to a new squd
        unseenSquads.forEach(squad => {
            UI.showNotification(`You have been added to a new squad: "${squad.name}`, `info`);
            localStorage.setItem(`seenSquad_${squad.id}`, `true`);
        });

        // Votes
        hangouts.forEach(hangout => {
            if (!hangout.votes[userID]) {
                UI.showNotification(`You have not voted for "${hangout.title}"`, `warning`);
            }
        });

        // Poll result notification
        hangouts.forEach(hangout => {
            if (hangout.status === 'complete' && !localStorage.getItem(`seenResults_${hangout.id}`)) {
                UI.showNotification(`Poll results are in for "${hangout.id}`, 'success');
                localStorage.setItem(`seenResults_${hangout.id}`, 'true');
            }
        });
    }
};*/

// Create .ics
const formatDateUTC = (date) => {
    return date.toISOString().replace(/[-:]/g, '').slice(0, 15) + 'Z';
};
const hangouts = DataManager.getHangouts();

function generateICS({ title, location, start}) {
    const pad = (n) => String(n).padStart(2, '0');

    const formatDate = (date) => {
        return date.getUTCFullYear().toString() +
            pad(date.getUTCMonth() + 1) +
            pad(date.getUTCDate()) + 'T' +
            pad(date.getUTCHours()) +
            pad(date.getUTCMinutes()) + '00Z';
    };

    const content = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//Squad Spot//EN',
        'CALSCALE:GREGORIAN',
        'BEGIN:VEVENT',
        `SUMMARY:${title}`,
        `LOCATION:${location}`,
        `DTSTART:${formatDate(start)}`,
        'DESCRIPTION:Planned using Squad Spot',
        'END:VEVENT',
        'END:VCALENDAR'
    ].join('\r\n');

    return new Blob([content], { type: 'text/calendar' });
}

// Download Calender Invite
function downloadCalInvite({title, location, startTime}) {
    const blob = generateICS({
        title,
        location,
        start: new Date(startTime)
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');

    a.href = url;
    a.download = `${title.replace(/\s+/g, '_')}.ics`;

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Render the hangouts page
const hangoutsList = document.getElementById('hangoutsList')

hangouts.forEach(h => {
    const div = document.createElement('div');
    div.innerHTML = `
        <h3>${h.title}</h3>
        <p>${h.location} - ${h.startTime}</p>
        <button class="download-invite-btn" data-id="${h.id}">Download Invite</button> 
    `;
     hangoutsList.appendChild(div);
});

// Event listener to download invite
document.getElementById('hangoutsList').addEventListener('click', (e) => {
  if (e.target.classList.contains('download-invite-btn')) {
    const hangoutId = e.target.getAttribute('data-id');
    const hangout = hangouts.find(h => h.id.toString() === hangoutId);

    if (hangout) {
      downloadCalInvite(hangout);
    }
  }
});