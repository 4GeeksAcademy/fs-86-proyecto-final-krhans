import React, { useEffect, useRef, useState, useContext } from 'react';
import { Context } from '../store/appContext';

const UploadWidget = ({ onUploadSuccess }) => {
  const cloudinaryRef = useRef(null);
  const widgetRef = useRef(null);
  const { actions } = useContext(Context);
  const [isCloudinaryLoaded, setIsCloudinaryLoaded] = useState(false);

  useEffect(() => {
    if (window.cloudinary) {
      cloudinaryRef.current = window.cloudinary;
      setIsCloudinaryLoaded(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://upload-widget.cloudinary.com/latest/global/all.js';
    script.async = true;
    script.onload = () => {
      cloudinaryRef.current = window.cloudinary;
      setIsCloudinaryLoaded(true);
    };
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    if (!isCloudinaryLoaded || widgetRef.current) return;

    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: 'dywefiobg',
        uploadPreset: 'ml_default',
      },
      (error, result) => {
        if (error) {
          console.error('Error en el widget:', error);
        } else if (result.event === 'success') {
          const newImageUrl = result.info.secure_url;
          actions.updateUserImage(newImageUrl);
          onUploadSuccess?.(newImageUrl);
        }
      }
    );
  }, [isCloudinaryLoaded]); 

  return (
    <button onClick={() => widgetRef.current?.open()} disabled={!isCloudinaryLoaded}>
      {isCloudinaryLoaded ? 'UPLOAD' : 'Cargando...'}
    </button>
  );
};

export default UploadWidget;
