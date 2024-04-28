import React from 'react';
import { EmailShareButton, FacebookShareButton, RedditShareButton, FacebookIcon, RedditIcon, EmailIcon, TwitterIcon, TwitterShareButton } from 'react-share'


const ShareButton = ({ url, title }) => {
    return (
        <div>
            <FacebookShareButton url={url} quote={title}>
                <FacebookIcon size={32} round />
            </FacebookShareButton>
            <TwitterShareButton url={url} title={title}>
                <TwitterIcon size={32} round />
            </TwitterShareButton>
        </div>
    );
};

export default ShareButton;