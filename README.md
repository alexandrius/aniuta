# Aniuta

> The simplest state manager for Expo and React Native

![Aniuta logo](https://raw.githubusercontent.com/qwertydevelopment/aniuta/master/aniuta.png)

## Installation

```sh
yarn add aniuta
```

## Usage

```jsx
import React, { useState } from 'react';
import { Provider, createStore } from 'aniuta';
import { View, Text, Button } from 'react-native';

//useCounter.js. Store function needs to have unique store name
const useCounter = createStore(function CounterStore() {
   const [count, setCount] = useState(0);

   const increment = () => setCount(count + 1);
   const decrement = () => setCount(count - 1);
   const reset = () => setCount(0);

   return { count, increment, decrement, reset };
});

//counter.js - Counter Component
function Counter() {
   const { count, increment, decrement, reset } = useCounter();

   return (
      <View>
         <Button title='-' onPress={decrement} />
         <Text>{count.toString()}</Text>
         <Button title='+' onPress={increment} />
         <Button title='reset' onPress={reset} />
      </View>
   );
}

//Just wrap App with Provider component and you are good to go
export default function App() {
   return (
      <View>
         <Provider>
            <Counter />
         </Provider>
      </View>
   );
}
```

> See more examples in ./example folder

## Based On

-  [Outstated](https://github.com/yamalight/outstated)

## Related

-  [Unstated](https://github.com/jamiebuilds/unstated)
-  [React hooks](https://reactjs.org/docs/hooks-intro.html)
