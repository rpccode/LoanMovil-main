import React from 'react';
import { View, Button, Platform } from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import { generateHTMLContent } from './generateHTMLContent';
import { loanWhitDues } from '../Configs';

// Función para generar el PDF
export const generatePDF = async (loanDetails:loanWhitDues) => {
  const htmlContent = generateHTMLContent(loanDetails);

  // Configuración para el PDF
  const options = {
    html: htmlContent,
    fileName: 'Detalles del prestamo',
    directory: Platform.OS === 'android' ? 'Downloads' : 'Documents',
  };

  try {
    
    const pdf = await RNHTMLtoPDF.convert(options);
    return pdf.filePath
    console.log(pdf.filePath); // Ruta del archivo PDF generado
  } catch (error) {
    console.error('Error generating PDF:', error);
  }
};


