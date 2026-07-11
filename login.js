// Native utility function to process raw text comparisons into SHA-256 matching hashes
async function hashPassword(password) {
    const msgBuffer = new TextEncoder().encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

document.getElementById("login-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value;
    const errorEl = document.getElementById("error-msg");

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const secureInputPassword = await hashPassword(password);

    // Verify presence against system array
    const matchedUser = users.find(user => user.email === email && user.password === secureInputPassword);

    if (matchedUser) {
        // Drop a random validation session token string securely inside visitor storage
        localStorage.setItem("sessionToken", btoa(email + Date.now()));
        window.location.href = "dashboard.html";
    } else {
        // Generic failure text prevents targeted user scraping or parameter brute-forcing
        errorEl.innerText = "Invalid email or password.";
    }
});
// === SOCIAL LOGINS SIMULATION ===

// Common function jo check karegi ya dummy user create karke direct login karwayegi
function handleSocialLogin(providerName, defaultEmail) {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    
    // Check karein kya yeh social user pehle se hamare database mein register hai?
    const userExists = users.some(user => user.email === defaultEmail);
    
    if (!userExists) {
        // Agar user pehle se nahi hai, toh dummy random password ke sath database mein save kar dein
        users.push({ 
            email: defaultEmail, 
            password: "social_oauth_secure_token_" + Math.random().toString(36).substring(7) 
        });
        localStorage.setItem("users", JSON.stringify(users));
    }
    
    // Alert message aur direct dashboard par transfer
    alert(`${providerName} Authentication Successful!\nLogging in as: ${defaultEmail}`);
    
    // Create Session Token and Redirect
    localStorage.setItem("sessionToken", btoa(defaultEmail + Date.now()));
    window.location.href = "dashboard.html";
}

// Click Events listening
document.getElementById("google-login").addEventListener("click", () => {
    handleSocialLogin("Google", "user.google@gmail.com");
});

document.getElementById("fb-login").addEventListener("click", () => {
    handleSocialLogin("Facebook", "user.facebook@fb.com");
});

document.getElementById("tw-login").addEventListener("click", () => {
    handleSocialLogin("Twitter", "user.twitter@x.com");
});