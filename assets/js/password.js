document.addEventListener('DOMContentLoaded', () => {
    // Configuration
    const PASSWORD_HASH = '36a92b4c638d3333c43900bed79dec5a6e3f4862ef4f6f62fc191917639904f4'; // Correct hash for: spatial2026
    const SALT = 'quarto-site-salt'; // Optional salt

    const body = document.body;
    const mainContent = document.querySelector('main');

    // Check if page is already unlocked in this session
    if (sessionStorage.getItem('page_unlocked') === 'true') {
        return;
    }

    // Add protected class to main content
    if (mainContent) {
        mainContent.classList.add('protected-content');
    }

    // Create Overlay HTML
    const overlay = document.createElement('div');
    overlay.className = 'password-overlay';
    overlay.innerHTML = `
        <div class="password-card">
            <div style="font-size: 3rem; margin-bottom: 1rem;">🔒</div>
            <h2>Protected Content</h2>
            <p>This page is restricted. Please enter the access password to continue.</p>
            <div class="password-input-group">
                <input type="password" class="password-input" placeholder="Enter Password" id="pwd-input">
                <button class="password-btn" id="pwd-submit">Unlock Page</button>
                <div class="error-msg" id="pwd-error">Incorrect password. Please try again.</div>
            </div>
            <div style="margin-top: 2rem; font-size: 0.8rem; color: #94a3b8;">
                Contact <a href="mailto:pulakesh.gis@gmail.com" style="color: var(--brand-primary); text-decoration: none;">Pulakesh</a> for access.
            </div>
        </div>
    `;

    document.body.appendChild(overlay);

    const input = document.getElementById('pwd-input');
    const submit = document.getElementById('pwd-submit');
    const error = document.getElementById('pwd-error');

    async function sha256(message) {
        // Fallback for non-secure contexts (like file:// protocol)
        if (!crypto.subtle) {
            console.warn('Crypto API not available. Using basic verification.');
            // This is NOT secure but allows local testing without HTTPS
            return message;
        }
        const msgBuffer = new TextEncoder().encode(message);
        const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        return hashHex;
    }

    async function verifyPassword() {
        const typedPassword = input.value.trim(); // Added trim()
        const hashedTyped = await sha256(typedPassword);

        // Check against hash OR plain text fallback for local testing
        if (hashedTyped === PASSWORD_HASH || (!crypto.subtle && typedPassword === 'spatial2026')) {
            overlay.classList.add('hidden');
            if (mainContent) {
                mainContent.classList.add('unlocked');
            }
            sessionStorage.setItem('page_unlocked', 'true');

            // Remove overlay from DOM after transition
            setTimeout(() => overlay.remove(), 500);
        } else {
            error.style.display = 'block';
            input.value = '';
            input.focus();

            // Shake effect
            const card = document.querySelector('.password-card');
            card.style.animation = 'shake 0.5s';
            setTimeout(() => card.style.animation = '', 500);
        }
    }

    submit.addEventListener('click', verifyPassword);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') verifyPassword();
    });

    // Add shake animation if not exists
    if (!document.getElementById('password-animations')) {
        const style = document.createElement('style');
        style.id = 'password-animations';
        style.innerHTML = `
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                25% { transform: translateX(-10px); }
                75% { transform: translateX(10px); }
            }
        `;
        document.head.appendChild(style);
    }
});
