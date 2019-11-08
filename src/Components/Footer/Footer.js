import React from 'react';
import './Footer.css';

export default function Footer() {
  return (
    <div className="footer">
      <div className="about">
        <h3>About</h3>
        <ul className="">
          <li className="">
            <a
              href="https://github.com/T0ASTMalone/macros-tracker-capstone-react"
              target="_blank"
              rel="noopener noreferrer"
              className="github"
            >
              GitHub Repo
            </a>
          </li>
        </ul>
      </div>
      <div className="contact">
        <h3>The Developer</h3>
        <ul className="">
          <li className="">
            <a
              href="https://github.com/T0ASTMalone/"
              rel="noopener noreferrer"
              target="_blank"
              className="github"
            >
              GitHub
            </a>
          </li>
          <li className="">
            <a
              href="https://www.linkedin.com/in/miguelangelponce"
              target="_blank"
              rel="noopener noreferrer"
              className="linked-in"
            >
              LinkedIn
            </a>
          </li>
          <li className="">
            <a
              href="https://t0astmalone.github.io/Portfolio/"
              target="_blank"
              rel="noopener noreferrer"
              className="portfolio"
            >
              Portfolio
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
