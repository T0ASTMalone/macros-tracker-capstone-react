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
            <a href="https://github.com/T0ASTMalone/" className="github">
              GitHub
            </a>
          </li>
          <li className="">
            <a
              href="https://www.linkedin.com/in/miguelangelponce"
              className="linked-in"
            >
              LinkedIn
            </a>
          </li>
          <li className="">
            <a
              href="https://t0astmalone.github.io/Portfolio/"
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
