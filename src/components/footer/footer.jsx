import React from 'react';
import FootStyle from './footer.module.css';

function Footer() {
    return (
        <div className="footer-block">
            <footer className={FootStyle.Footer}>
                <span>
                    The application was created by
                    <a href="https://vk.com/alexanderpankratov03" target="_blank" rel="noopener noreferrer"> Alexander Pankratov.
                    </a>
                </span>
            </footer>
        </div>
    );
}

export default Footer;
