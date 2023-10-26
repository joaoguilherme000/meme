<h1> Tutorial</h1>


<h3> A unica biblioteca que foi usada é a camera o link ta ai em baixo, mesmo assim eu vou explicar cada linha e o porque dela existir.</h3>

 [REACT NATIVE VISION CAMERA](https://react-native-vision-camera.com/).


<h4>app.tsx</h4>

```
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from 'react-native-splash-screen';

import Home from './src/views/home';
import Result from './src/views/result';

```

<h4>importações e o que são elas?</h4>

a primeira coisa de um componente é suas importações, nela outros componentes são importados para dentro do arquivo para ser usado do jeito que você quiser.

`* as React from 'react'` Isso importa todas as funcionalidades do módulo 'React' e as torna acessíveis, perceba que exite um padrão depois do from as bibliotecas e componentes também precisam conter " ou ' entre elas (voce escolhe😁).
<hr>

```
import Home from './src/views/home';
import Result from './src/views/result';
```

<h4>Essas duas belezinhas chama funções que eu tenho no arquivo (não precisa ser necessariamente o nome do arquivo).</h4>

```
function App() {
  SplashScreen.hide();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}/>
        <Stack.Screen name="Result" component={Result} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

```

eu crio uma função que se chama app ele retorna para o usuario um estrutura de telas, e no final eu exporto para outro componente fazer uso dele👌.

as outras importações não foram criadas por mim
