'use client';
import React from 'react';

export const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/51999999999"
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
    >
      <div className="tooltip">¿Necesitas ayuda? ¡Contáctanos!</div>

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
          display: flex;
          align-items: center;
          justify-content: center;
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

        /* Tooltip */
        .tooltip {
          position: absolute;
          right: 70px;
          background: #25D366;
          color: white;
          padding: 8px 12px;
          border-radius: 8px;
          font-size: 14px;
          white-space: nowrap;
          opacity: 0;
          transform: translateY(5px);
          pointer-events: none;
          transition: opacity 0.3s ease, transform 0.3s ease;
          box-shadow: 0 4px 10px rgba(0,0,0,0.2);
        }

        /* Mostrar tooltip al pasar el mouse */
        .whatsapp-float:hover .tooltip {
          opacity: 1;
          transform: translateY(0);
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
};
