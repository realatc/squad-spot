document.addEventListener('DOMContentLoaded', () => {
    const pickContactBtn = document.getElementById('pickContactBtn');
    const selectedContactsDisplay = document.getElementById('selectedContactsDisplay');

    // --- References to the simulated picker UI elements ---
    const simulatedPickerModal = document.getElementById('simulatedContactPickerModal');
    const simulatedContactListDiv = document.getElementById('simulatedContactList');
    const simulatedSelectBtn = document.getElementById('simulatedContactSelectBtn');
    const simulatedCancelBtn = document.getElementById('simulatedContactCancelBtn');
    const closeButton = simulatedPickerModal ? simulatedPickerModal.querySelector('.close-button') : null;


    // Define dummy contacts for fallback and simulation
    const dummyContacts = [
        { name: ["Alice", "Smith"], email: ["alice.smith@example.com"], tel: ["+15551234567"] },
        { name: ["Bob", "Johnson"], email: ["bob.j@example.com"], tel: ["+15559876543"] },
        { name: ["Charlie", "Brown"], email: ["charlie.b@example.com"], tel: ["+15551112233"] },
        { name: ["Diana", "Miller"], email: ["diana.m@example.com"], tel: ["+15554445566"] },
        { name: ["Eve", "Davis"], email: ["eve.d@example.com"], tel: ["+15557778899"] }
    ];

    // Function to process and display contacts (reusable for both real and dummy data)
    function processAndDisplayContacts(contacts) {
        if (contacts.length > 0) {
            let displayHtml = '<h3>Selected Contacts:</h3><ul>';
            let selectedEmails = [];

            contacts.forEach(contact => {
                const name = contact.name && contact.name.length > 0 ? contact.name.join(' ') : 'Unknown Name';
                const email = contact.email && contact.email.length > 0 ? contact.email[0] : 'No Email';
                const tel = contact.tel && contact.tel.length > 0 ? contact.tel[0] : 'No Phone';

                displayHtml += `<li><strong>${name}</strong><br>Email: ${email}<br>Phone: ${tel}</li>`;
                if (email !== 'No Email') {
                    selectedEmails.push(email);
                }
                console.log('Processed Contact:', contact);
            });
            displayHtml += '</ul>';
            selectedContactsDisplay.innerHTML = displayHtml;
            console.log("Emails to invite:", selectedEmails);

        } else {
            selectedContactsDisplay.innerHTML = 'No contacts were selected.';
            console.log('No contacts were selected.');
        }
    }

    // --- Simulated Contact Picker ---
    function showSimulatedContactPicker(properties, options) {
        return new Promise((resolve, reject) => {
            // Dummy Data
            simulatedContactListDiv.innerHTML = ''; 
            dummyContacts.forEach((contact, index) => {
                const name = contact.name ? contact.name.join(' ') : 'Unknown';
                const email = contact.email ? contact.email[0] : 'No Email';
                const tel = contact.tel ? contact.tel[0] : 'No Phone';

                const label = document.createElement('label');
                const input = document.createElement('input');
                input.type = 'checkbox';
                input.value = index; // Store index to easily retrieve dummy contact
                input.dataset.name = name;
                input.dataset.email = email;
                input.dataset.tel = tel;

                label.appendChild(input);
                label.append(`${name} (${email}, ${tel})`);
                simulatedContactListDiv.appendChild(label);
            });

            // Show the modal
            simulatedPickerModal.style.display = 'flex';

            // Handle Select button click
            const handleSelect = () => {
                const selectedCheckboxes = simulatedContactListDiv.querySelectorAll('input[type="checkbox"]:checked');
                const selectedSimulatedContacts = Array.from(selectedCheckboxes).map(checkbox => {
                    const index = parseInt(checkbox.value);
                    // Reconstruct contact object in the format expected by processAndDisplayContacts
                    return {
                        name: [checkbox.dataset.name],
                        email: [checkbox.dataset.email],
                        tel: [checkbox.dataset.tel]
                    };
                });
                simulatedPickerModal.style.display = 'none';
                simulatedSelectBtn.removeEventListener('click', handleSelect);
                simulatedCancelBtn.removeEventListener('click', handleCancel);
                if (closeButton) closeButton.removeEventListener('click', handleCancel);
                window.removeEventListener('click', handleOutsideClick);
                resolve(selectedSimulatedContacts);
            };

            // Handle Cancel button or close button click or outside click
            const handleCancel = () => {
                simulatedPickerModal.style.display = 'none';
                simulatedSelectBtn.removeEventListener('click', handleSelect);
                simulatedCancelBtn.removeEventListener('click', handleCancel);
                if (closeButton) closeButton.removeEventListener('click', handleCancel);
                window.removeEventListener('click', handleOutsideClick);
                reject(new DOMException('User cancelled the contact picker.', 'AbortError'));
            };

            // Handle click outside modal
            const handleOutsideClick = (event) => {
                if (event.target === simulatedPickerModal) {
                    handleCancel();
                }
            };

            simulatedSelectBtn.addEventListener('click', handleSelect);
            simulatedCancelBtn.addEventListener('click', handleCancel);
            if (closeButton) closeButton.addEventListener('click', handleCancel);
            window.addEventListener('click', handleOutsideClick); // Listen for clicks outside
        });
    }

    if (pickContactBtn) {
        pickContactBtn.addEventListener('click', async () => {
            const isContactPickerSupported = 'contacts' in navigator && 'select' in navigator.contacts;
            const useSimulatedPicker = !isContactPickerSupported; // Condition to use simulated picker

            let contacts = [];
            let pickerError = null;

            if (useSimulatedPicker) {
                console.warn('Contact Picker API not supported or simulated. Using simulated picker.');
                try {
                    contacts = await showSimulatedContactPicker(['name', 'email', 'tel'], { multiple: true });
                } catch (error) {
                    pickerError = error;
                }
            } else {
                try {
                    const properties = ['name', 'email', 'tel'];
                    const options = { multiple: true };
                    contacts = await navigator.contacts.select(properties, options);
                } catch (error) {
                    pickerError = error;
                }
            }

            // Process results or handle errors after picker attempt (real or simulated)
            if (pickerError) {
                console.error('Error picking contacts:', pickerError);
                if (pickerError.name === 'SecurityError' || pickerError.name === 'NotAllowedError') {
                    selectedContactsDisplay.innerHTML = 'Permission to access contacts was denied or a secure context (HTTPS) is required. Displaying dummy contacts for reference.';
                    alert('Permission to access contacts was denied or a secure context (HTTPS) is required). Displaying dummy contacts.');
                    processAndDisplayContacts(dummyContacts); // Fallback to dummy data
                } else if (pickerError.name === 'AbortError') {
                    selectedContactsDisplay.innerHTML = 'Contact selection was cancelled by the user.';
                    console.log('User cancelled the contact picker.');
                } else {
                    selectedContactsDisplay.innerHTML = 'An unexpected error occurred: ' + pickerError.message + '. Displaying dummy contacts for reference.';
                    alert('An unexpected error occurred. Displaying dummy contacts.');
                    processAndDisplayContacts(dummyContacts); // Fallback to dummy data
                }
            } else {
                // Process contacts real or simulated
                processAndDisplayContacts(contacts);
            }
        });
    }
});

/*
THIS IS THE CODE I HAD FOR CONTACT PICKER CODE ABOVE DISPLAY DUMMY DATA IF IT DOESNT WORK

document.addEventListener('DOMContentLoaded', () => {
    const pickContactBtn = document.getElementById('floatingNewSquadBtn');
    const selectedContactsDisplay = document.getElementById('selectedContactsDisplay');

    if (pickContactBtn) { 
        pickContactBtn.addEventListener('click', async () => {
            // Check if the API is supported in the browser
            if (!navigator.contacts || !navigator.contacts.select) {
                alert('Your browser does not support the Contact Picker API. Please try Chrome on Android or a compatible browser.');
                console.warn('Contact Picker API not supported in this browser.');
                return;
            }

            try {
                // 2. Properties to request
                const properties = ['name', 'email', 'tel'];

                const options = {
                    multiple: true 
                };

                const contacts = await navigator.contacts.select(properties, options);

                // Handle the selected contacts
                if (contacts.length > 0) {
                    let displayHtml = '<h3>Selected Contacts:</h3><ul>';
                    let selectedEmails = []; 

                    contacts.forEach(contact => {
                        // Uses the first name/email/tel if multiple exist
                        const name = contact.name && contact.name.length > 0 ? contact.name[0] : 'Unknown Name';
                        const email = contact.email && contact.email.length > 0 ? contact.email[0] : 'No Email';
                        const tel = contact.tel && contact.tel.length > 0 ? contact.tel[0] : 'No Phone';

                        displayHtml += `<li><strong>${name}</strong><br>Email: ${email}<br>Phone: ${tel}</li>`;
                        if (email !== 'No Email') {
                            selectedEmails.push(email);
                        }
                        console.log('Selected Contact:', contact);
                    });
                    displayHtml += '</ul>';
                    selectedContactsDisplay.innerHTML = displayHtml;

                    // This 'selectedEmails' can be used to send invites
                    console.log("Emails to invite:", selectedEmails);

                } else {
                    selectedContactsDisplay.innerHTML = 'No contacts were selected.';
                    console.log('No contacts were selected.');
                }

            } catch (error) {
                // Handle any errors (e.g., user denied permission, API error)
                console.error('Error picking contacts:', error);
                if (error.name === 'SecurityError') {
                    selectedContactsDisplay.innerHTML = 'Permission to access contacts was denied or a secure context (HTTPS) is required.';
                    alert('Permission to access contacts was denied or a secure context (HTTPS) is required).');
                } else {
                    selectedContactsDisplay.innerHTML = 'An error occurred while picking contacts: ' + error.message;
                    alert('An error occurred while picking contacts: ' + error.message);
                }
            }
        });
    }
});

*/
