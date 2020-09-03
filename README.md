# Aniuta

> The simplest state manager for Expo and React Native

## Installation

```sh
yarn add aniuta
```

## Example

```jsx
import React, { useState } from 'react';
import { Provider, useStore } from 'aniuta';

const useCounter = initStore(() => {
   const [count, setCount] = useState(0);

   const increment = () => setCount(count + 1);
   const decrement = () => setCount(count - 1);
   const reset = () => setCount(0);

   return { count, increment, decrement, reset };
});

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
```

### Introducing Aniuta

Aniuta is THE simplest state manager for Expo and React Native.

##### `<Provider>`

```jsx
render(
   <Provider stores={[counterStore]}>
      <Counter />
   </Provider>
);
```

## Based On

-  [Outstated](https://github.com/yamalight/outstated)

## Related

-  [Unstated](https://github.com/jamiebuilds/unstated)
-  [React hooks](https://reactjs.org/docs/hooks-intro.html)
