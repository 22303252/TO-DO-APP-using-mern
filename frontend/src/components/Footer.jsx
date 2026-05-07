import React from 'react';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <p className="footer-text">
          Made by <strong>Sanzida</strong>
        </p>
        <p className="footer-copyright">
          © {currentYear} Sanzidas To-Do List. All rights reserved.
        </p>
        <div className="footer-links">
          <a href= "https://wa.me/8801402266506" target="_blank" rel="noopener noreferrer">
            WhatsApp
          </a>
          <span className="separator">•</span>
          <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <span className="separator">•</span>
          <a href="mailto:rifa.10khan@gmail.com">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;