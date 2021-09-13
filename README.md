# Aniuta

> The simplest state manager for Expo and React Native

![Aniuta logo](https://raw.githubusercontent.com/qwertydevelopment/aniuta/master/aniuta.png)

## Installation

Use `yarn`
```sh
yarn add aniuta
```

or `npm`
```sh
npm i -S aniuta
```


## Usage

```jsx
import React, { useState } from 'react';
import { Provider, createStore } from 'aniuta';
import { View, Text, Button } from 'react-native';

//useCounter.js. Name should be unique
const useCounter = createStore({
   key: 'CounterStore',
   Store: () => {
      const [count, setCount] = useState(0);

      const increment = () => setCount(count + 1);
      const decrement = () => setCount(count - 1);
      const reset = () => setCount(0);

      return { count, increment, decrement, reset };
   },
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

### Don't

-  ❌ Do not create single store for all data. Create store as many stores as needed. Multiple stores will prevent unnessesary re-renders
-  ❌ Do not use store hook inside another store. If you need to have a hook with 2 store data create additional hook:

For sake of this example lets say we have 2 separate count stores. First for Odd numbers and second for Even numbers.

```javascript
const useOdds = createStore({
   key: 'OddsStore',
   Store: () => {
      const [count, setCount] = useState(1);

      const increment = () => setCount(count + 2);
      const decrement = () => setCount(count - 2);

      return { count, increment, decrement };
   },
});

const useEvens = createStore({
   key: 'EvensStore',
   Store: () => {
      const [count, setCount] = useState(0);

      const increment = () => setCount(count + 2);
      const decrement = () => setCount(count - 2);

      return { count, increment, decrement };
   },
});
```

Create third wrapper hook which can be used inside component:

```javascript
function useOddsAndEvens() {
   const odds = useOdds();
   const evens = useEvens();

   return {
      odds,
      evens,
   };
}
```

## Based On

-  [Outstated](https://github.com/yamalight/outstated)

## Related

-  [Unstated](https://github.com/jamiebuilds/unstated)
-  [React hooks](https://reactjs.org/docs/hooks-intro.html)
