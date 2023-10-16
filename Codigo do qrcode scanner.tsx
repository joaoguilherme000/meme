import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Camera } from 'expo-camera';

interface MeuProp {
  type: string;
  data: string;
}

export default function QRCodeScanner() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState<boolean>(false);
  const [imageURL, setImageURL] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }: MeuProp) => {
    if (!scanned) {
      setScanned(true);

      if (type === 'QR_CODE' && data.startsWith('http')) {
        // Se o código for um URL, mostre a imagem
        setImageURL(data);
      } else {
        alert(`Tipo de código: ${type}\n\nDados: ${data}`);
      }

      setTimeout(() => {
        setImageURL(null);
        setScanned(false);
      }, 2000); // 2 seconds (adjust as needed)
    }
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>Sem acesso à câmera</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={styles.camera}
      />
      {imageURL && <Image source={{ uri: imageURL }} style={styles.image} />}
      {scanned && !imageURL && (
        <Text style={styles.text}>Escaneie um QR code novamente</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  camera: {
    flex: 1,
  },
  text: {
    backgroundColor: 'white',
    padding: 10,
    textAlign: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
});
