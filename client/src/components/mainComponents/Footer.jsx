import React from "react";
import image from "../../assets/img/KaizenEsqueLogo.png";
import { Link } from "react-router-dom";
import "../../assets/css/footer.css";

export default function Footer() {
  return (
    <div className="footer-Style flex-container-row keepBottom center-content">
      <Link className="footer-logo" to="/">
        <img src={image} alt="Kaisen-Esque-Logo-Return-to-home" />
      </Link>

      <div className="flex-container-columns center-content">
        <p className="header-Text dpl">Copyright Kaizen-Esque 2024©</p>

        {/* <Link to="/LearnMore">
          <h4 className="learnMore_Link dpl">Learn More</h4>
        </Link> */}
      </div>
    </div>
  );
}