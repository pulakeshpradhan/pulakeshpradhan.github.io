document.addEventListener('DOMContentLoaded', () => {
    // Obfuscated configuration
    const _0x4f2a = ['36a92b', '4c638d', '3333c4', '3900be', 'd79dec', '5a6e3f', '4862ef', '4f6f62', 'fc1919', '176399', '04f4'];
    const _0x1a2b = _0x4f2a.join('');

    const body = document.body;
    const mainContent = document.querySelector('main');

    // Check if page is already unlocked in this session
    if (sessionStorage.getItem('auth_state') === 'authorized') {
        return;
    }

    // Ensure viewport is set for mobile
    if (!document.querySelector('meta[name="viewport"]')) {
        const meta = document.createElement('meta');
        meta.name = 'viewport';
        meta.content = 'width=device-width, initial-scale=1.0';
        document.head.appendChild(meta);
    }

    // Add protected class to main content
    if (mainContent) {
        mainContent.classList.add('protected-content');
        document.body.style.overflow = 'hidden'; // Prevent scrolling while locked
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
                <input type="password" class="password-input" placeholder="Enter Password" id="auth-val">
                <button class="password-btn" id="auth-trigger">Unlock Page</button>
                <div class="error-msg" id="auth-err">Incorrect password. Please try again.</div>
            </div>
            <div style="margin-top: 2rem; font-size: 0.8rem; color: #94a3b8;">
                Contact <a href="mailto:pulakesh.mid@gmail.com" style="color: var(--brand-primary); text-decoration: none;">Pulakesh</a> for access.
            </div>
        </div>
    `;

    document.body.appendChild(overlay);

    const input = document.getElementById('auth-val');
    const submit = document.getElementById('auth-trigger');
    const error = document.getElementById('auth-err');

    async function _0x9e24(msg) {
        if (!crypto.subtle) return msg;
        const msgBuffer = new TextEncoder().encode(msg);
        const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        return hashHex;
    }

    async function _0x5f3a() {
        const _0x1122 = input.value.trim();
        const _0x3344 = await _0x9e24(_0x1122);

        if (_0x3344 === _0x1a2b) {
            overlay.classList.add('hidden');
            if (mainContent) {
                mainContent.classList.add('unlocked');
            }
            document.body.style.overflow = ''; // Restore scrolling
            sessionStorage.setItem('auth_state', 'authorized');
            setTimeout(() => overlay.remove(), 500);
        } else {
            error.style.display = 'block';
            input.value = '';
            input.focus();
            const card = document.querySelector('.password-card');
            card.style.animation = 'shake 0.5s';
            setTimeout(() => card.style.animation = '', 500);
        }
    }

    submit.addEventListener('click', _0x5f3a);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') _0x5f3a();
    });

    if (!document.getElementById('core-animations')) {
        const style = document.createElement('style');
        style.id = 'core-animations';
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
