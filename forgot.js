async function hashPassword(password) {
    const msgBuffer = new TextEncoder().encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

document.getElementById("forgot-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("reset-email").value.trim();
    const newPassword = document.getElementById("reset-password").value;
    const messageEl = document.getElementById("message");

    messageEl.className = "error-text"; 

    // 1. Password Validation Check
    const hasNumber = /\d/.test(newPassword);
    if (newPassword.length < 8 || !hasNumber) {
        messageEl.innerText = "Password must be at least 8 characters long and contain at least 1 number.";
        return;
    }

    // 2. Fetch Users from localStorage
    let users = JSON.parse(localStorage.getItem("users")) || [];
    
    // Check if user exists
    const userIndex = users.findIndex(user => user.email === email);

    if (userIndex === -1) {
        messageEl.innerText = "This email is not registered!";
        return;
    }

    // 3. Hash New Password and Update LocalStorage
    const securePassword = await hashPassword(newPassword);
    users[userIndex].password = securePassword;
    localStorage.setItem("users", JSON.stringify(users));

    // Success Message & Redirect
    messageEl.className = "error-text success-text";
    messageEl.innerText = "Password reset successful! Redirecting to login...";
    
    setTimeout(() => {
        window.location.href = "index.html";
    }, 2500);
});