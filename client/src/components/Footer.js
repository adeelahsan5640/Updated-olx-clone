import React from 'react';
import lowerimg from '../images/LowerAdd.png'

function Footer() {
    return (
        <React.Fragment>
            <div style={{ marginTop: '40px' }}>
                <img width="100%" src={lowerimg} alt="img" />
            </div>
            <div style={{
                padding: '15px 18%',
                background: '#012f34',
                color: 'white',
                display: 'flex',
                fontSize: '20px',
                justifyContent: 'space-between',
            }}>
                <p>Other Countries India-South Africa-Indonesia</p>
                <p>Free Classified in Pakistan. © 2006-2021 OLX</p>
            </div>
        </React.Fragment>
    )
}
export default Footer;
