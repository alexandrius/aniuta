import { createStore } from 'aniuta';
import { useState } from 'react';

export default createStore({
   key: 'CounterStore',
   store: () => {
      const [count, setCount] = useState(0);

      const increment = () => setCount(count + 1);
      const decrement = () => setCount(count - 1);
      const reset = () => setCount(0);

      return { count, increment, decrement, reset };
   },
});
