import React, { useEffect } from 'react';

const VoterInfoW = () => {
        useEffect(() => {
          // Append the CSS to the head
          const link = document.createElement('link');
          link.rel = 'stylesheet';
          link.type = 'text/css';
          link.href = 'https://votinginfotool.org/css/compiled/vit.css';
          document.head.appendChild(link);
      
          // Function to load the VIT script
          const loadScript = () => {
            const script = document.createElement('script');
            script.src = 'https://votinginfotool.org/js/compiled/app.js';
            script.onload = () => initializeVIT(); // Initialize VIT after script loads
            document.body.appendChild(script);
          };
      
          // Function to initialize the VIT
          const initializeVIT = () => {
            const config = {
              "logo": {"type":"default"},
              "official-only": true
            };
            const loadVIT = function () {
              if (typeof vit !== 'undefined'){
                vit.core.init("_vit", config);
              } else {
                setTimeout(loadVIT, 500);
              }
            };
            loadVIT();
          };
      
          loadScript();
      
          // Cleanup function to remove script and styles on component unmount
          return () => {
            document.head.removeChild(link);
            document.body.removeChild(document.querySelector('script[src="https://votinginfotool.org/js/compiled/app.js"]'));
          };
        }, []);
      
        return (
          <div className="vit-size-container" style={{width: '100%', height: '100%'}}>
            <div id="_vit"></div>
          </div>
        );
      };


export default VoterInfoW;