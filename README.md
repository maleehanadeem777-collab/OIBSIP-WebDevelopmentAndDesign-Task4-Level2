# 🔐 Secure Client-Side Authentication System

A clean, modern, and highly secure client-side User Authentication System built using HTML5, CSS3, and Vanilla JavaScript. This project demonstrates secure password management using native browser cryptographic hashing alongside session handling.

---

## ✨ Features

*   **User Registration:** Secure signup form with real-time field validation.
*   **Password Policy:** Enforces strong passwords (minimum 8 characters with at least 1 numeric digit).
*   **Duplicate Prevention:** Checks the database in real-time to prevent multiple accounts with the same email.
*   **Secure Authentication:** User login validation against storage records.
*   **Cryptographic Hashing:** Passwords are never stored in plain text; they are encrypted using **SHA-256** via the native Web Crypto API.
*   **Generic Error Messages:** Protects against user-scraping or brute-force attacks by showing ambiguous error states.
*   **Protected Dashboard Route:** Restricts access to the internal dashboard unless a valid local session token is active.
*   **Account Recovery:** Localized "Forgot Password" workflow allowing secure identity updates.
*   **Social Auth Simulation:** Interactive mock-up flows for Google, Facebook, and Twitter logins.

---

## 📂 Project Structure

```text
LOGIN UI PAGE/
├── node_modules/
├── public/
│   ├── background.png      # Beautiful mountain backdrop UI wallpaper
│   ├── index.html          # Main Secure Login Portal
│   ├── register.html       # Account Registration Page
│   ├── forget.html         # Self-service Password Reset View
│   ├── dashboard.html      # Protected Member Area
│   ├── style.css           # Global Styled Stylesheet UI Layout
│   ├── login.js            # Login validations and session handling
│   ├── register.js         # Signup restrictions and SHA-256 pipeline
│   └── forget.js           # Password recovery encryption handler
└── README.md               # Documentation (This file)
