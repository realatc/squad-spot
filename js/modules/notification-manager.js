// Notification Management Module
const NotificationManager = {
    sendReminder(hangoutId) {
        const hangout = DataManager.getHangouts().find(h => h.id === hangoutId);
        const squad = DataManager.getSquads().find(s => s.id === hangout.squadId);
        
        if (hangout && squad) {
            // Request notification permission if not already granted
            if ('Notification' in window && Notification.permission === 'default') {
                Notification.requestPermission().then(permission => {
                    if (permission === 'granted') {
                        this.sendReminderNotification(hangout, squad);
                    } else {
                        UI.showNotification('Notification permission denied. Reminder sent via in-app notification.', 'warning');
                    }
                });
            } else if (Notification.permission === 'granted') {
                this.sendReminderNotification(hangout, squad);
            } else {
                UI.showNotification('Reminder notifications sent to members who haven\'t voted yet!', 'success');
            }
            
            // Add activity
            DataManager.addActivity({
                type: 'reminder_sent',
                message: `Reminder sent for "${hangout.title}"`,
                squadId: hangout.squadId
            });
            
            // Close the modal
            UI.hideModal();
        }
    },
    
    sendReminderNotification(hangout, squad) {
        // Get members who haven't voted
        const membersWithoutVotes = squad.members.filter(member => {
            return !hangout.votes || !hangout.votes[member.id];
        });
        
        // Send notification
        new Notification('Squad Spot - Reminder', {
            body: `Reminder sent to ${membersWithoutVotes.length} members for "${hangout.title}"`,
            icon: '/favicon.ico',
            badge: '/favicon.ico'
        });
        
        UI.showNotification('Reminder notifications sent to members who haven\'t voted yet!', 'success');
    },
    
    checkVoteCompletion(hangoutId) {
        const hangout = DataManager.getHangouts().find(h => h.id === hangoutId);
        const squad = DataManager.getSquads().find(s => s.id === hangout.squadId);
        
        if (hangout && squad) {
            // Check if all members have voted
            const allMembersVoted = squad.members.every(member => {
                return hangout.votes && hangout.votes[member.id];
            });
            
            if (allMembersVoted) {
                // Find the winning venue (most votes)
                const venueVoteCounts = {};
                Object.values(hangout.votes).forEach(venueId => {
                    venueVoteCounts[venueId] = (venueVoteCounts[venueId] || 0) + 1;
                });
                
                const winningVenueId = Object.keys(venueVoteCounts).reduce((a, b) => 
                    venueVoteCounts[a] > venueVoteCounts[b] ? a : b
                );
                
                const winningVenue = hangout.venues.find(v => v.id === winningVenueId);
                
                if (winningVenue) {
                    // Send completion notification
                    this.sendVoteCompletionNotification(hangout, squad, winningVenue);
                    
                    // Update hangout status
                    hangout.status = 'confirmed';
                    hangout.selectedVenue = winningVenueId;
                    DataManager.updateHangout(hangout);
                    
                    // Add activity
                    DataManager.addActivity({
                        type: 'vote_complete',
                        message: `Voting complete! ${winningVenue.name} selected for "${hangout.title}"`,
                        squadId: hangout.squadId
                    });
                }
            }
        }
    },
    
    sendVoteCompletionNotification(hangout, squad, winningVenue) {
        // Request notification permission if not already granted
        if ('Notification' in window && Notification.permission === 'default') {
            Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                    this.showVoteCompletionNotification(hangout, winningVenue);
                }
            });
        } else if (Notification.permission === 'granted') {
            this.showVoteCompletionNotification(hangout, winningVenue);
        }
        
        // Always show in-app notification
        UI.showNotification(`All votes are in! ${winningVenue.name} has been selected for "${hangout.title}"`, 'success');
    },
    
    showVoteCompletionNotification(hangout, winningVenue) {
        new Notification('Squad Spot - Location Selected!', {
            body: `All votes are in! ${winningVenue.name} has been selected for "${hangout.title}"`,
            icon: '/favicon.ico',
            badge: '/favicon.ico'
        });
    }
};

 