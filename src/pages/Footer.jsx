import React from 'react';

const Footer = () => {
  const footerStyle = {
    backgroundColor: '#f0f0f0',
    padding: '20px',
    textAlign: 'center',
    outline: '2px solid #333',
  };

  const sectionStyle = {
    margin: '20px',
  };

  const socialMediaLinksStyle = {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
  };

  const linkStyle = {
    textDecoration: 'none',
    color: '#333',
  };

  return (
    <footer style={footerStyle}>
      <div style={{display:'flex', justifyContent:'center'}}>
        <div>
          <div style={sectionStyle}>
            <h4>Address</h4>
            <p>Jobra, Hathazari, Chittagong</p>
          </div>
          <div style={sectionStyle}>
            <h4>Contact</h4>
            <p>Phone: +8801631790814</p>
          </div>
          <div style={sectionStyle}>
            <h4>Email</h4>
            <p>jahangirjehad1044@gmail.com</p>
          </div>

          <div style={sectionStyle}>
            <h4>Social Media</h4>
            <div style={socialMediaLinksStyle}>
              <a href="https://www.facebook.com" style={linkStyle}>Facebook</a>
              <a href="https://www.instagram.com" style={linkStyle}>Instagram</a>
            </div>
            <div className="bottom-footer">
        <p>&copy; {new Date().getFullYear()} Your Website. All rights reserved.</p>
        <p><a href="#">Privacy Policy</a> | <a href="#">Terms of Service</a></p>
      </div>
          </div>
        </div>
        <div style={{}}>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15282225.79979123!2d73.7250245393691!3d20.750301298393563!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30635ff06b92b791%3A0xd78c4fa1854213a6!2sIndia!5e0!3m2!1sen!2sin!4v1587818542745!5m2!1sen!2sin" 
          width="400" height="300" frameborder="2" style={{}} allowfullscreen="" aria-hidden="false" tabindex="0" ></iframe>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
