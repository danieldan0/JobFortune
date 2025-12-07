// Navigation handler
function loadNavigation() {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const navMenu = document.getElementById('navMenu');

    if (!navMenu) {
        // Retry after a short delay if navMenu is not loaded yet
        setTimeout(loadNavigation, 100);
        return;
    }

    if (token && user.role) {
        const roleId = user.role.id;

        // Common items for logged-in users
        let menuItems = `
            <li class="nav-item">
                <a class="nav-link" href="/">Головна</a>
            </li>
        `;

        // Role-specific items
        if (roleId === 3) {
            // Employer menu
            menuItems += `
                <li class="nav-item">
                    <a class="nav-link" href="create-job.html">Створити вакансію</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="profile.html">Мій профіль</a>
                </li>
            `;
        } else if (roleId === 4) {
            // Job Seeker menu
            menuItems += `
                <li class="nav-item">
                    <a class="nav-link" href="jobs.html">Вакансії</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="profile.html">Мій профіль</a>
                </li>
            `;
        } else {
            // Admin or other roles
            menuItems += `
                <li class="nav-item">
                    <a class="nav-link" href="profile.html">Профіль</a>
                </li>
            `;
        }

        // Logout button
        menuItems += `
            <li class="nav-item">
                <a class="nav-link" href="#" id="logoutBtn">
                    <i class="bi bi-box-arrow-right"></i> Вийти
                </a>
            </li>
        `;

        navMenu.innerHTML = menuItems;

        // Add logout handler
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                localStorage.clear();
                window.location.href = '/';
            });
        }
    } else {
        // Guest menu
        navMenu.innerHTML = `
            <li class="nav-item">
                <a class="nav-link" href="/">Головна</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="login.html">Вхід</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="register.html">Реєстрація</a>
            </li>
        `;
    }
}

// Load navigation when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        // Wait for header.html to load
        setTimeout(loadNavigation, 200);
    });
} else {
    setTimeout(loadNavigation, 200);
}
