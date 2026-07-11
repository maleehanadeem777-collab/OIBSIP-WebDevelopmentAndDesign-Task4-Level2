// Native utility function to secure plaintext via SHA-256 hashing
async function hashPassword(password) {
    const msgBuffer = new TextEncoder().encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

document.getElementById("register-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const email = document.getElementById("reg-email").value.trim();
    const password = document.getElementById("reg-password").value;
    const messageEl = document.getElementById("message");

    messageEl.className = "error-text"; // Reset styling state

    // 1. Password Format Policy: Length greater than/equal to 8 and containing a digit
    const hasNumber = /\d/.test(password);
    if (password.length < 8 || !hasNumber) {
        messageEl.innerText = "Password must be at least 8 characters long and contain at least 1 number.";
        return;
    }

    // Fetch existing records database
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // 2. Query Duplicate Accounts
    const userExists = users.some(user => user.email === email);
    if (userExists) {
        messageEl.innerText = "This email is already registered!";
        return;
    }

    // 3. Encrypt password safely and persist record
    const securePassword = await hashPassword(password);
    users.push({ email: email, password: securePassword });
    localStorage.setItem("users", JSON.stringify(users));

    // Show success alert and swap views
    messageEl.className = "error-text success-text";
    messageEl.innerText = "Registration Successful! Redirecting...";
    setTimeout(() => {
        window.location.href = "index.html";
    }, 2000);
});