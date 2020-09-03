import React, { createContext, useContext } from 'react';

const savedStores = [];
// Create context map for global store assignment
const ContextMap = new Map();

const Container = ({ store, children }) => {
   // initialize store hooks
   // this is required because react expects the same number
   // of hooks to be called on each render
   // so if we run init in useStore hook - it'll break on re-render
   // return provider with stores map
   const storesMap = new Map([[store, store()]]);

   // get context for specific store
   const Context = ContextMap.get(store);
   return <Context.Provider value={storesMap}>{children}</Context.Provider>;
};

export const Provider = ({ children }) => {
   // complain if no instances provided for initialization
   if (!savedStores.length) {
      throw new Error('You must init at least one store');
   }

   // create providers for each store
   let providersLayout;

   savedStores.forEach((store) => {
      let context = ContextMap.get(store);
      if (!context) {
         context = createContext();
         ContextMap.set(store, context);
      }
      providersLayout = <Container store={store}>{providersLayout || children}</Container>;
   });
   return providersLayout;
};

export function useStore(storeInit) {
   // use store specific context
   const map = useContext(ContextMap.get(storeInit));

   // complain if no map is given
   if (!map) {
      throw new Error('You must wrap your components with a <Provider>!');
   }

   const instance = map.get(storeInit);

   // complain if instance wasn't initialized
   if (!instance) {
      throw new Error('Provided store instance did not initialize correctly!');
   }

   return instance;
}

export const initStore = (storeInit) => {
   savedStores.add(storeInit);
   return () => useStore(storeInit);
};
