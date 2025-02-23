
document.addEventListener('DOMContentLoaded', function() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const profileName = document.getElementById('profileName');
    const profileEmail = document.getElementById('profileEmail');
    const logoutBtn = document.getElementById('logoutBtn');
    const profileLink = document.getElementById('profileLink');
    const authLink = document.getElementById('authLink');

    // Redirect to auth page if not logged in
    if (!currentUser) {
        window.location.href = 'auth.html';
        return;
    }

    // Display user information
    profileName.textContent = currentUser.name;
    profileEmail.textContent = currentUser.email;

    // Update navigation
    profileLink.style.display = 'inline-block';
    authLink.style.display = 'none';

    // Handle logout
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('currentUser');
        window.location.href = 'index.html';
    });
});
