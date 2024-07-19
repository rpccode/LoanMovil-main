import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import PDFView from 'react-native-pdf';
import { COLORS } from '../../../Configs';

type ComponentProps = {
  pdfURI: string;
  onClose: () => void;
}


const PreviewPDFScreen = ({ pdfURI, onClose }:ComponentProps) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // No es necesario cargar el PDF aquí, ya que el URI del PDF se pasa como prop
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={COLORS.blue} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <PDFView
        style={{ flex: 1 }}
        source={{
            uri:pdfURI,
            cache:true
        }}
      />
    </View>
  );
};

export default PreviewPDFScreen;
