# Tutorial

```diff
- ATENÇÃO O CODIGO PODE E VAI SER MELHORADO!
```
- [Introdução](#introdução)
- [Configuração da Câmera](#configuração-da-câmera)
  - [Permissões](#permissões)
  - [Dependências](#dependências)
- [Código da Câmera](#código-da-câmera)
  - [Importações](#importações)
  - [Inicialização](#inicialização)
  - [Upload](#upload)
  - [Progresso do upload](#progresso-do-upload)
- [Tela](#tela)

<h3> A unica biblioteca que foi usada é a camera o link ta ai em baixo, mesmo assim eu vou explicar cada linha e o porque dela existir.</h3>

 [REACT NATIVE VISION CAMERA](https://react-native-vision-camera.com/).

<picture align="center"><img align="end" src="https://github.com/joaoguilherme000/meme/blob/master/Meus/captura%20native%20camera.png" /></picture>

## Introdução

<h2>Os codigos da camera são feitos em varias partes pra ela funcionar</h2>

## Configuração da Câmera

<h3>A primeira coisa é a permissão e as dependencias, todos os codigos abaixo são pra isso</h3>

### Permissões

[app/iprecoapp/ios/ipreco/Info.plist](https://github.com/G41h123/G41h123/blob/feature/camera/app/iprecoapp/ios/iprecoapp/Info.plist)

```
<dict>
	<key>NSCameraUsageDescription</key>
	<string>$(PRODUCT_NAME) needs access to your Camera.</string>
...
```

[app/iprecoapp/android/app/src/main/AndroidManifest.xml](https://github.com/G41h123/G41h123/blob/feature/camera/app/iprecoapp/android/app/src/main/AndroidManifest.xml)

```
<manifest xmlns:android="http://schemas.android.com/apk/res/android">

    <...>
    <uses-permission android:name="android.permission.CAMERA" />
```

### Dependências

<h4>Baixar as dependencias</h4>

`npm i react-native-vision-camera`

[app/iprecoapp/package-lock.json](https://github.com/G41h123/G41h123/blob/feature/camera/app/iprecoapp/package-lock.json)

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

[app/iprecoapp/package.json](https://github.com/G41h123/G41h123/blob/feature/camera/app/iprecoapp/package.json)

```
"react-native-vision-camera": "^3.3.1"
```

## Código da Câmera

[app/iprecoapp/src/views/home/index.tsx](https://github.com/G41h123/G41h123/blob/feature/camera/app/iprecoapp/src/views/home/index.tsx)

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

```
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import { addDoc, collection} from "firebase/firestore"; 

import { db, storage } from "../../../firebaseConfig";
```

Função uploadBytesResumable API do Storage (explicado no ~#upload~). função getDownloadURL permite obter a URL de download de um arquivo que foi previamente enviado para o Firebase Storage.

O collection é usado para acessar ou criar uma coleção no Firestore, e o addDoc é usado para adicionar um novo documento a essa coleção. Ambas as funções são parte da API do Firestore e são usadas para realizar operações de leitura e escrita em seu banco de dados NoSQL em tempo real.

A variavel do meu banco de dados db é o banco propriamente dito e o storage é onde fica as imagens;

### Inicialização

```
export default function Home () {			  // crio uma função que ja está sendo exportada
  const device = useCameraDevice('back')                    // eu crio uma variavel que recebe a camera (principal) de tras.
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

Como a câmera é configurada no aplicativo. Primeiro, verificamos se a câmera está disponível. Se houver uma câmera disponível (a de tras), criamos uma variável que aguarda a foto que o usuário tirou. Em seguida, criamos outra variável para buscar a foto que o usuário capturou (fica no cache do app).

Agora, vamos entrar em mais detalhes sobre como fazemos isso. Utilizamos uma função chamada `fetch`, que é uma poderosa ferramenta para fazer **solicitações de rede**. Ela nos permite buscar recursos, como arquivos ou dados, de várias fontes. No nosso caso, estamos usando `fetch` para obter a foto que o usuário tirou.

Mas o que acontece depois? A resposta obtida com o fetch é tratada com o método `response.blob()`. Esse método faz parte do objeto de resposta e é usado para extrair e transformar o conteúdo da resposta em um objeto do tipo `Blob`. Um Blob é uma imagem.

Então o codigo pega a foto que o usuario tirou e transforma numa variavel blob tudo isso em sequência com a `await` que espera uma função pra começar outra de baixo.

```
const storageRef = ref(storage, 'images/'); 		    // Aqui, estamos criando uma referência ao local onde a imagem será armazenada no Firebase Storage.
const uploadTask = uploadBytesResumable(storageRef, blob);  // Inicia o upload da imagem para o Firebase Storage de maneira resumível, se houver interrupções na conexão de rede, o upload de ser retomado
```

### Progresso do upload

```
 uploadTask.on(						// o processo de upload é Iniciado
        'state_changed',
        (snapshot) => { // Ignore				
        },
        (error) => {				     	// pega o erro e mostra
          console.error('Erro no upload:', error);
        },
        async () => { 					// cria uma variavel pra poder mostrar aonde essa imagem foi
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          console.log('URL da imagem:', downloadURL);

          try {						// Ele pega a referencia do documento que se chamar 'imagens' e coloca a url la junto com a data
            const docRef = await addDoc(collection(db, 'imagens'), {
              url: downloadURL, // Salva a URL da imagem no Firestore
              createdAt: new Date().getTime(), // Adicione um carimbo de data/hora, se necessário
            });
							// Se tentou e conseguiu ele mostra no console junto com o id do documento
            console.log('Documento salvo com sucesso', docRef.id);
          } catch (e) {
            console.error('Erro ao salvar no Firestore:', e);
          }

          setImageData(photo.path);			// Eu mudo a variavel da imagem pra mim mostrar na tela de resultados
        }
      );
```

## Tela

```
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
```

Neste trecho de código, a função **(home)** está retornando elementos do React Native para serem renderizados na tela. Uma View que organiza outros componentes em coluno e com espaçamento de 5, um componente de câmera, um botão "Tirar Foto" e estilos.

## Estilo 

[app/iprecoapp/src/views/home/Style.tsx](https://github.com/G41h123/G41h123/blob/feature/camera/app/iprecoapp/src/views/home/Style.tsx)

```
import { StyleSheet } from 'react-native';

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: 'center'
  },
  camera: {
    width: "auto",
    height: "92%"
  },
  button: {
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#f4a100',
    alignSelf: 'center',
    height: '7%', 
    width: "90%",
    borderRadius: 10,
  },
  image: {
    width: '100%',
  },
});

export default Styles;
```

<h3>
<ol>
  <li>Importação: cria uma paleta de cores, componente do react-native </li>
  <li>Cria uma variavel estilos que tem a função da paleta de cores</li>
  <li>Ela recebe:</li>
    <ol>
      <li>Nome da classe</li>
      <li>Propriedades css</li>
    </ol>
  <li>Exportação</li>
</ol>
</h3>
