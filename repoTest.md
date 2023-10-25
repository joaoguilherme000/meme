<h1> Tutorial</h1>

<h2>Uma biblioteca que foi usada no app é a react native navigation, documentação abaixo (se quiser ler)🌝</h2>

[REACT NATIVE NAVIGATION](https://reactnavigation.org/).

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

a primeira coisa de um componente é suas importações, nela outros componentes são importados para dentro do arquivo para serem usados do jeito que você quiser.

`* as React from 'react'` Isso importa todas as funcionalidades do módulo 'React' e as torna acessíveis, perceba que exite um padrão depois do from as bibliotecas e componentes também precisam conter `"` ou `'` entre elas (voce escolhe😁).

```
import Home from './src/views/home';
import Result from './src/views/result';
```

#### Essas duas belezinhas chama funções que eu tenho em outro arquivo com tudo que tem dentro do arquivo _`estilo, outras funções, importações, outros arquivos`_ (não precisa ser necessariamente o nome do arquivo somente o nome da função principal).

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

+ importo uma função `import SplashScreen from 'react-native-splash-screen';` uso ela depois `SplashScreen.hide();` a splash some só depois que o aplicativo é carregado

+ Quando você envolve seu aplicativo com `<NavigationContainer>`, você configura a estrutura básica para gerenciar a navegação. Você pode usar outros componentes do React Navigation, como `<StackNavigator>, <TabNavigator>, ou <DrawerNavigator>`, dentro desse contêiner para definir a estrutura e o comportamento da navegação em seu aplicativo.

+ importo um componente`import { createNativeStackNavigator } from '@react-navigation/native-stack';` uso ele e passo uma propriedade que é a primeira tela que ele vai ler `<Stack.Navigator initialRouteName="Home">`

+ depois eu coloco as minhas telas passando o nome e o componente sendo ele de mesmo nome que foi importado `<Stack.Screen name="Home" component={Home} options={{ headerShown: false }}/>` uma outra propriedade passada nessa tela foi a options que também recebe propriedades, nesse caso eu tirei o cabeçalho.
