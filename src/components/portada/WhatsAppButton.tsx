'use client';
import React from 'react';

export const WhatsAppButton=()=> {
  return (
    <a
      href="https://wa.me/51999999999"
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
    >
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
        alt="WhatsApp"
        width="55"
      />
      <style jsx>{`
        .whatsapp-float {
          position: fixed;
          bottom: 20px;
          right: 20px;
          z-index: 9999;
        }
        .whatsapp-float img {
          border-radius: 50%;
          box-shadow: 0 0 8px rgba(0,0,0,0.3);
          animation: pulse 1.5s infinite;
          cursor: pointer;
          transition: transform 0.2s;
        }
        .whatsapp-float img:hover {
          transform: scale(1.2);
        }
        @keyframes pulse {
          0% { transform: scale(1); }
          25% { transform: scale(1.1); }
          50% { transform: scale(1); }
          75% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
      `}</style>
    </a>
  );
}
