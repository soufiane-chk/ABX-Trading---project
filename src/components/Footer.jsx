import React, { useEffect } from "react";
import "../styles/footer.css";

const Footer = () => {
  useEffect(() => {
    const handleScroll = () => {
      const footer = document.querySelector(".footer");
      if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 50) {
        footer.classList.add("visible");
      } else {
        footer.classList.remove("visible");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <footer className="footer">
      <p>&copy; 2025 ABX FISH. Tous droits réservés.</p>
    </footer>
  );
};

export default Footer;
