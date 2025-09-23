(function() {
    const token = localStorage.getItem('token');
    
    if (!token) {
        const allowedPaths = ['/login.html'];
        const currentPath = window.location.pathname.split('/').pop();

        if (!allowedPaths.includes(currentPath.toLowerCase())) {
            window.location.href = 'login.html';
        }
    }
})();