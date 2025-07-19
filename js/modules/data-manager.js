// Data Management Module
const DataManager = {
    getSquads() {
        return JSON.parse(localStorage.getItem('squads') || '[]');
    },
    
    getHangouts() {
        return JSON.parse(localStorage.getItem('hangouts') || '[]');
    },
    
    getVenues(filter = 'all') {
        const venues = JSON.parse(localStorage.getItem('venues') || '[]');
        if (filter === 'all') return venues;
        return venues.filter(venue => venue.type === filter);
    },
    
    getActivity() {
        return JSON.parse(localStorage.getItem('activities') || '[]');
    },
    
    addSquad(squad) {
        const squads = this.getSquads();
        squad.id = Date.now().toString();
        squads.push(squad);
        localStorage.setItem('squads', JSON.stringify(squads));
        
        // Send notification for new squad
        this.sendNotification('New Squad Created!', `"${squad.name}" has been created successfully.`);
        
        return squad;
    },
    
    addHangout(hangout) {
        const hangouts = this.getHangouts();
        hangout.id = Date.now().toString();
        hangouts.push(hangout);
        localStorage.setItem('hangouts', JSON.stringify(hangouts));
        
        // Send notification for new hangout
        this.sendNotification('New Hangout Planned!', `"${hangout.title}" has been scheduled.`);
        
        return hangout;
    },
    
    updateHangoutVote(hangoutId, userId, venueId) {
        const hangouts = this.getHangouts();
        const hangout = hangouts.find(h => h.id === hangoutId);
        if (hangout) {
            if (!hangout.votes) hangout.votes = {};
            hangout.votes[userId] = venueId;
            localStorage.setItem('hangouts', JSON.stringify(hangouts));
            return true;
        }
        return false;
    },
    
    updateHangout(updatedHangout) {
        const hangouts = this.getHangouts();
        const index = hangouts.findIndex(h => h.id === updatedHangout.id);
        if (index !== -1) {
            hangouts[index] = updatedHangout;
            localStorage.setItem('hangouts', JSON.stringify(hangouts));
            return true;
        }
        return false;
    },
    
    addActivity(activity) {
        const activities = this.getActivity();
        activity.id = Date.now().toString();
        activity.timestamp = new Date().toISOString();
        activities.unshift(activity);
        localStorage.setItem('activities', JSON.stringify(activities));
        return activity;
    },
    
    searchVenues(query) {
        const venues = this.getVenues();
        return venues.filter(venue => 
            venue.name.toLowerCase().includes(query.toLowerCase()) ||
            venue.description.toLowerCase().includes(query.toLowerCase())
        );
    },
    
    removeSquad(squadId) {
        const squads = this.getSquads();
        const filteredSquads = squads.filter(s => s.id !== squadId);
        localStorage.setItem('squads', JSON.stringify(filteredSquads));
    },
    
    formatDate(timestamp) {
        return new Date(timestamp).toLocaleDateString();
    },
    
    sendNotification(title, body) {
        if ('Notification' in window && Notification.permission === 'granted') {
            new Notification(title, {
                body: body,
                icon: '/favicon.ico',
                badge: '/favicon.ico'
            });
        }
    }
};

 