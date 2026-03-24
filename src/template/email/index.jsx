import React from 'react';

const EmailConfirmation = (
    { name, email, message }
) => {
  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>Hello {name},</h2>
      <p style={subheadingStyle}>I hope this message reaches you well.</p>

      <div style={messageStyle}>
        <p style={textStyle}>{message}</p>
        <div style={buttonContainerStyle}>
            <a 
            style={Button} 
            onMouseOver={e => e.target.style.backgroundColor = ButtonHover.backgroundColor} 
            onMouseOut={e => e.target.style. backgroundColor = Button.backgroundColor} 
            href={`mailto:${email}?&body=${message}`}
            >
              Reply
            </a>
        </div>
      </div>


      <footer style={footerStyle}>
        <p style={footerText}>Thanks,</p>
        <p style={footerText}>The {name}</p>
      </footer>
    </div>
  );
};

const Button = {
    backgroundColor: '#6b46c1', /* Purple */
    color: 'white',
    textAlign: 'center',
    padding: '6px 24px',
    borderRadius: '9999px', /* Round */
    fontSize: '1.125rem', /* 18px */
    cursor: 'pointer',
    border: 'none',
    transition: 'background-color 0.3s ease',
    textDecoration: 'none'
  };
  
  const ButtonHover = {
    backgroundColor: '#5a35b0', /* Darker purple on hover */
  };

const containerStyle = {
  maxWidth: '600px',
  margin: '0 auto',
  padding: '24px',
  backgroundColor: '#e0aeea15',
  borderRadius: '12px',
};

const headingStyle = {
  fontSize: '1.875rem', /* 30px */
  fontWeight: 'bold',
  marginBottom: '16px',
};

const subheadingStyle = {
  fontSize: '1.125rem', /* 18px */
  marginBottom: '24px',
};

const messageStyle = {
  marginBottom: '24px',
};

const textStyle = {
  fontSize: '14px', /* 16px */
};

const buttonContainerStyle = {
  marginTop: '24px',
};



const footerStyle = {
  marginTop: '32px',
  textAlign: 'left',
  fontSize: '0.875rem', 
  color: '#718096',
  textStyle:'none'
};
const footerText = {
    margin:'5px'
  };

export default EmailConfirmation;
