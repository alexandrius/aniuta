import React, { createContext, useContext } from 'react';

// Create stores map for global store assignment
const storesMap = {};
// Create context map for global store assignment
const contextMap = {};

const Container = ({ store, children }) => {
   // initialize store hooks
   // this is required because react expects the same number
   // of hooks to be called on each render
   // so if we run init in useStore hook - it'll break on re-render
   // return provider with stores map
   const storesMap = new Map([[store.name, store()]]);

   // get context for specific store
   const Context = contextMap[store.name];
   return <Context.Provider value={storesMap}>{children}</Context.Provider>;
};

export const Provider = ({ children }) => {
   const stores = Object.values(storesMap);
   if (!stores.length) return children;

   // create providers for each store
   let providersLayout;

   stores.forEach((store: Function) => {
      let context = contextMap[store.name];
      if (!context) {
         context = createContext(null);
         contextMap[store.name] = context;
      }
      providersLayout = <Container store={store}>{providersLayout || children}</Container>;
   });
   return providersLayout;
};

export function useStore(storeInit) {
   // use store specific context
   const map: Map<string, Function> = useContext(contextMap[storeInit.name]);
   console.log(map);

   // complain if no map is given
   if (!map) {
      throw new Error('You must wrap your components with a <Provider>!');
   }

   const instance = map.get(storeInit.name);
   return instance;
}

export const createStore = (storeInit) => {
   storesMap[storeInit.name] = storeInit;
   return () => useStore(storeInit);
};
