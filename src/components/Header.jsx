import React from 'react';

function Header() {
  return (
    <header className="header">
      <div className="logo">CP</div>
      <nav className="nav">
        <a href="#projects">Projects</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
      </nav>
    </header>
  );
}

export default Header;
