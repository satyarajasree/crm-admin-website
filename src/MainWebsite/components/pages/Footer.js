import React from "react";

const Footer = () => {
  return (
    <footer id="footer" class="footer dark-background mt-5">
      <div class="container footer-top">
        <div class="row gy-4">
          <div class="col-lg-6 col-md-12 footer-about">
            <a href="index.html" class="logo d-flex align-items-center">
              <span class="sitename">RAJASREE TOWNSHIPS</span>
            </a>
            <p>
              Cras fermentum odio eu feugiat lide par naso tierra. Justo eget
              nada terra videa magna derita valies darta donna mare fermentum
              iaculis eu non diam phasellus.
            </p>
            <div class="social-links d-flex mt-4">
              <a href="https://youtube.com/@rajasreetownships-dm?si=kyQqkNtDm58us4p9">
                <i class="bi bi-youtube"></i>
              </a>
              <a href="https://www.facebook.com/share/p/S5bAGYD3YMBZshE3/?mibextid=xfxF2i">
                <i class="bi bi-facebook"></i>
              </a>
              <a href="https://www.instagram.com/rajasreetownships/profilecard/?igsh=cHh3Ymxnem1lZ3dk">
                <i class="bi bi-instagram"></i>
              </a>
              <a href="">
                <i class="bi bi-linkedin"></i>
              </a>
            </div>
          </div>

          <div class="col-lg-3 col-6 footer-links">
            <h4>Useful Links</h4>
            <ul>
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">Projects</a>
              </li>
              <li>
                <a href="#about">About us</a>
              </li>
              <li>
                <a href="#">Contact us</a>
              </li>
              <li>
                <a href="#">Terms and Conditions</a>
              </li>
              <li>
                <a href="#">Privacy policy</a>
              </li>
            </ul>
          </div>

          

          <div class="col-lg-3 col-md-12 footer-contact text-center text-md-start">
            <h4>Contact Us</h4>
            <p>Hyderabad corporate office, Address Corp Off: Plot number 130, 1st Floor , GSK Arcade, Beside</p>
            <p>Shilparamam, Bhagayath</p>
            <p>Phase2, Uppal, Hyderabad,</p>
            <p>Telangana 500039.</p>
            <p class="mt-4">
              <strong>Phone:</strong> <span>+91 6262666999</span>
            </p>
            <p>
              <strong>Email:</strong> <span>Info@rajasreetownships.in</span>
            </p>
          </div>
        </div>
      </div>

      <div class="container copyright text-center mt-4">
        <p>
          © <span>Copyright</span> <strong class="px-1 sitename">Rajasree Township</strong>{" "}
          <span>All Rights Reserved</span>
        </p>
        <div class="credits">
          Designed by Developed by <span className="text-success fw-bold">RAJASREE FUTURE TECH</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
