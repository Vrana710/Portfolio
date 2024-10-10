document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    // Get form values
    const formData = {
        user_name: document.getElementById('user_name').value,
        user_email: document.getElementById('user_email').value,
        user_phone: document.getElementById('user_phone').value,
        message: document.getElementById('message').value
    };

    // Get the current date and time
    const currentDateTime = new Date().toISOString();

    // Function to post data to Google Sheets
    const postToGoogleSheets = async () => {
        // Create a FormData object and append form data
        const formDataGS = new FormData();
        formDataGS.append('user_name', formData.user_name);
        formDataGS.append('user_email', formData.user_email);
        formDataGS.append('user_phone', formData.user_phone);
        formDataGS.append('message', formData.message);
        formDataGS.append('timestamp', currentDateTime); // Append current date and time

        try {
            // Post data to Google Sheets
            const response = await fetch(
                "https://script.google.com/macros/s/AKfycbyY1rX59LIMid2PhiKiqtAQP1GRuvrjK_0xFF7CM-U2Bil_K-JeRES1n2mZC1PEGL2T/exec",
                {
                    method: "POST",
                    body: formDataGS
                }
            );

            if (response.ok) {
                console.log('Data successfully sent to Google Sheets');
            } else {
                console.error('Failed to send data to Google Sheets');
            }
        } catch (error) {
            console.error('Error while posting to Google Sheets:', error);
        }
    };

    // Send the user's message using EmailJS
    emailjs.send('service_01ljlky', 'contact_form', formData)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);

            // Show success message
            document.getElementById('submitSuccessMessage').classList.remove('d-none');

            // Clear form fields
            document.getElementById('contactForm').reset();

            // Send an automatic reply
            const autoReplyData = {
                user_name: formData.user_name,
                user_email: formData.user_email,
            };

            emailjs.send('service_01ljlky', 'auto_reply', autoReplyData)
                .then(function(autoReplyResponse) {
                    console.log('Auto-reply sent!', autoReplyResponse.status, autoReplyResponse.text);
                }, function(autoReplyError) {
                    console.log('Auto-reply failed...', autoReplyError);
                });

            // Now post to Google Sheets after successful email submission
            postToGoogleSheets();

        }, function(error) {
            console.log('FAILED...', error);

            // Show error message
            document.getElementById('submitErrorMessage').classList.remove('d-none');
        });
});
