// Function to update the current date and time
function updateDateTime() {
    const now = new Date();

    // Get the current date in the format: Day, Month DD, YYYY
    const date = now.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    // Get the current time in the format: HH:MM:SS
    const time = now.toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });

    // Combine date and time
    const currentDateTime = `${date}, ${time}`;

    // Display the current date and time in the footer
    document.getElementById('current-date-time').innerText = currentDateTime;
}

// Call the function when the page loads
window.onload = function() {
    updateDateTime();
    // Update the time every second
    setInterval(updateDateTime, 1000);
};
