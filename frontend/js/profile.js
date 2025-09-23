document.addEventListener('DOMContentLoaded', () => {
    const logoutBtn = document.getElementById('logout-btn');
    if (!logoutBtn) return;

    const userEmailEl = document.getElementById('user-email');
    const token = localStorage.getItem('token');
    
    if (token) {
        const payload = JSON.parse(atob(token.split('.')[1]));
        if (payload.email) {
            userEmailEl.textContent = payload.email;
        }
    }

    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('token');
        window.location.href = 'login.html';
    });
});