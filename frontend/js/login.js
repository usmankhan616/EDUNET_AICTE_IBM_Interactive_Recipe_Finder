document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('auth-form');
    if (!form) return;

    const formTitle = document.getElementById('form-title');
    const submitBtn = document.getElementById('submit-btn');
    const switchText = document.getElementById('switch-text');
    const messageDiv = document.getElementById('message');
    
    let isLoginMode = true;

    function switchMode(e) {
        if (e) e.preventDefault();
        isLoginMode = !isLoginMode;

        if (isLoginMode) {
            formTitle.textContent = 'Login';
            submitBtn.textContent = 'Login';
            switchText.innerHTML = 'Don\'t have an account? <a href="#" id="switch-link">Register here</a>';
        } else {
            formTitle.textContent = 'Register';
            submitBtn.textContent = 'Register';
            switchText.innerHTML = 'Already have an account? <a href="#" id="switch-link">Login here</a>';
        }
        document.getElementById('switch-link').addEventListener('click', switchMode);
    }
    
    document.getElementById('switch-link').addEventListener('click', switchMode);

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const endpoint = isLoginMode ? '/api/login' : '/api/register';
        
        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.msg || 'Something went wrong');
            }
            
            if (isLoginMode) {
                localStorage.setItem('token', data.token);
                window.location.href = 'index.html';
            } else {
                messageDiv.textContent = 'Registration successful! Please log in.';
                messageDiv.className = 'alert alert-success';
            }
            
        } catch (error) {
            messageDiv.textContent = error.message;
            messageDiv.className = 'alert alert-danger';
        }
    });
});