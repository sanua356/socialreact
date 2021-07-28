import React from 'react';
import FootStyle from './footer.module.css';

const Footer = React.memo( () => {
    return (
        <div className="footer-block">
            <footer className={FootStyle.Footer}>
                    <a href="https://vk.com/alexanderpankratov03"
                     target="_blank" 
                     rel="noopener noreferrer">
                         The application was created by Alexander Pankratov.
                    </a>
            </footer>
        </div>
    );
});

export default Footer;
