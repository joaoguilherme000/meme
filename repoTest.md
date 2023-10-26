# Tutorial

- [Introdução](#introdução)
- [Configuração da Câmera](#configuração-da-câmera)
  - [Permissões](#permissões)
  - [Dependências](#dependências)
- [Código da Câmera](#código-da-câmera)
  - [Importações](#importações)
  - [Inicialização](#inicialização)
  - [Upload](#upload)

<h3> A unica biblioteca que foi usada é a camera o link ta ai em baixo, mesmo assim eu vou explicar cada linha e o porque dela existir.</h3>

 [REACT NATIVE VISION CAMERA](https://react-native-vision-camera.com/).

<picture align="center"><img align="end" src="https://github.com/joaoguilherme000/meme/blob/master/Meus/captura%20native%20camera.png" /></picture>

## Introdução

<h2>Os codigos da camera são feitos em varias partes pra ela funcionar</h2>

## Configuração da Câmera

<h3>A primeira coisa é a permissão e as dependencias, todos os codigos abaixo são pra isso</h3>

### Permissões

<h4>app/iprecoapp/ios/iprecoapp/Info.plist</h4>

```
<dict>
	<key>NSCameraUsageDescription</key>
	<string>$(PRODUCT_NAME) needs access to your Camera.</string>
...
```

<h4>app/iprecoapp/android/app/src/main/AndroidManifest.xml</h4>

```
<manifest xmlns:android="http://schemas.android.com/apk/res/android">

    <...>
    <uses-permission android:name="android.permission.CAMERA" />
```

### Dependências

<h4>Baixar as dependencias</h4>

`npm i react-native-vision-camera`

<h4>app/iprecoapp/package-lock.json</h4>

```
"node_modules/react-native-vision-camera": {
      "version": "3.3.1",
      "resolved": "https://registry.npmjs.org/react-native-vision-camera/-/react-native-vision-camera-3.3.1.tgz",
      "integrity": "sha512-OeoHvDTR4wlfij17azxmr7fwDtZc3nzEUe8ZJ3EYJx4HSGaDtvt578VRXUdxLpPs3jqS3J8g/8bivH2IHUkxtg==",
      "peerDependencies": {
        "react": "*",
        "react-native": "*",
        "react-native-worklets-core": "*"
      },
      "peerDependenciesMeta": {
        "react-native-worklets-core": {
          "optional": true
        }
      }
    },
```

<h4>app/iprecoapp/package.json</h4>

```
"react-native-vision-camera": "^3.3.1"
```

## Código da Câmera

<h4>app/iprecoapp/src/views/home/index.tsx</h4>

```
import React, { useEffect, useRef, useState } from 'react';
import { View, ActivityIndicator, TouchableOpacity, Text,} from 'react-native';
import { Camera, useCameraDevice, } from 'react-native-vision-camera';

import Styles from './Style';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { addDoc, collection} from "firebase/firestore";
import { db, storage } from "../../../firebaseConfig";

export default function Home () {
  const device = useCameraDevice('back')
  const camera = useRef<Camera | null>(null);
  const [imageData, setImageData] = useState<string>(''); // uri para mostrar a imagem

  useEffect(() => {
    checkPermission();
  }, []);

  const checkPermission = async () => {
    const newCameraPermission = await Camera.requestCameraPermission();
    console.log(newCameraPermission); // mostra qual permissao foi concedida
  };

  if (device == null) return(
    <View style={Styles.container}>
      <Text style={{fontSize: 20, color:'black'}}>Carregando Camera...</Text>
      <ActivityIndicator size={'large'}/>
    </View>

  );

  const tiraFoto = async () => {
    if (camera.current != null) {
      const photo = await camera.current.takePhoto(); // espera a camera tirar foto para colocar uma data nela
      const response = await fetch(`file://${photo.path}`);
      const blob = await response.blob();

      const storageRef = ref(storage, `images/`);
      const uploadTask = uploadBytesResumable(storageRef, blob);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Acompanhe o progresso do upload aqui, se necessário
        },
        (error) => {
          console.error('Erro no upload:', error);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          console.log('URL da imagem:', downloadURL);

          try {
            const docRef = await addDoc(collection(db, 'imagens'), {
              url: downloadURL, // Salva a URL da imagem no Firestore
              createdAt: new Date().getTime(), // Adicione um carimbo de data/hora, se necessário
            });

            console.log('Documento salvo com sucesso', docRef.id);
          } catch (e) {
            console.error('Erro ao salvar no Firestore:', e);
          }

          setImageData(photo.path);
        }
      );
    }
  };

  return (
    <View style={{flex: 1, flexDirection: 'column',gap: 5}}>
      <Camera
        ref={camera}
        style={Styles.camera}
        device={device}
        isActive={true}
        photo
      />
      <TouchableOpacity style={Styles.button} onPress={tiraFoto}>
        <Text style={{fontSize: 20, color:'black'}}>Tirar Foto</Text>
      </TouchableOpacity>
    </View>
  )
};
```
### Importações

<h2>Essas 3 primeiras linhas de codigo é a importanção das funções, componentes de outras bibliotecas</h2>

`import React, { useEffect, useRef, useState } from 'react';` Aqui são funções, o useEffect é uma função que executa outras funções, ele é executado toda a vez que a pagina é lida, useRef é um hook em React que permite criar uma referência que pode ser associada a um elemento, useState é o hook mais usado no react native, ele permite a mudança de estado da variavel, permitindo que seja dinamico e capaz de reagir a mudança de dados.

exemplo de useRef, em vez usar um queryselector eu uso o .current, elemento atual referenciado:

```
function MyComponent() {
  const myElementRef = useRef(null);

  useEffect(() => {
    // Acessando o elemento do DOM com a referência
    myElementRef.current.focus();
  }, []);
```

`import { View, ActivityIndicator, TouchableOpacity, Text,} from 'react-native';` Eu importo esses componentes para serem usados, > a View cria um div + ou - isso, > ActivityIndicator mostra uma barrinha de carregamento que gira, > o TouchableOpacity cria uma div clicavel, > e Text é só um texto mesmo.

`import { Camera, useCameraDevice, } from 'react-native-vision-camera';` A camera cria o framework e o useCameraDevice pega todas as cameras do celular da pessoa.

<h2>Aqui é a importação das funções/API do banco de dados</h2>

`import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";` função uploadBytesResumable API do Storage. faz o upload de dados para o armazenamento do Firebase de maneira resumível, o que significa que, se a conexão com a internet for perdida durante o upload, ele pode retornar a partir do ponto em que foi interrompido, em vez de começar do zero. função getDownloadURL permite obter a URL de download de um arquivo que foi previamente enviado para o Firebase Storage.

`import { addDoc, collection} from "firebase/firestore";` O collection é usado para acessar ou criar uma coleção no Firestore, e o addDoc é usado para adicionar um novo documento a essa coleção. Ambas as funções são parte da API do Firestore e são usadas para realizar operações de leitura e escrita em seu banco de dados NoSQL em tempo real.

`import { db, storage } from "../../../firebaseConfig";` Aqui é a variavel do meu banco de dados db é o banco propriamente dito e o storage é onde fica as imagens;

### Inicialização

<h2>Começando o codigo</h2>

`export default function Home () {` eu crio uma função que ja está sendo exportada

```
const device = useCameraDevice('back')                    // eu crio uma variavel que recebe a camera(principal) de tras.
  const camera = useRef<Camera | null>(null);             // aqui eu referencio a camera para user ela atualmente
  const [imageData, setImageData] = useState<string>(''); // aqui a imagem que foi tirada pelo usuario ficar armazenada na imageData como uma string
```

<h4>useEffect sendo usado</h4>

```
useEffect(() => {
    checkPermission();                   // ele checa a permissão toda vez que a pagina é carregada
  }, []);

  const checkPermission = async () => {  // basicamente uma função assíncrona. recebe async porque ele espera a camera pedir permissão para que ela possa funcionar
    const newCameraPermission = await Camera.requestCameraPermission(); // armazena numa constante qual permissão foi concendida
    console.log(newCameraPermission); 	 // aqui ela mostra no console
  };

  if (device == null) return(            // se der errado ou a camera não funcionar ele mostra uma telinha
    <View style={Styles.container}>
      <Text style={{fontSize: 20, color:'black'}}>Carregando Camera...</Text>
      <ActivityIndicator size={'large'}/>
    </View>

  );
```
### Upload

```
const tiraFoto = async () => {
    if (camera.current != null) {
      const photo = await camera.current.takePhoto(); // espera a camera tirar foto para colocar uma data nela
      const response = await fetch(`file://${photo.path}`);
      const blob = await response.blob();

      const storageRef = ref(storage, `images/`);
      const uploadTask = uploadBytesResumable(storageRef, blob);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Acompanhe o progresso do upload aqui, se necessário
        },
        (error) => {
          console.error('Erro no upload:', error);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          console.log('URL da imagem:', downloadURL);

          try {
            const docRef = await addDoc(collection(db, 'imagens'), {
              url: downloadURL, // Salva a URL da imagem no Firestore
              createdAt: new Date().getTime(), // Adicione um carimbo de data/hora, se necessário
            });

            console.log('Documento salvo com sucesso', docRef.id);
          } catch (e) {
            console.error('Erro ao salvar no Firestore:', e);
          }

          setImageData(photo.path);
        }
      );
    }
  };
```

