import React, { createContext, useContext } from 'react';

// Create stores map for global store assignment
const storesMap = {};
// Create context map for global store assignment
const contextMap = {};

interface StoreInit {
   name: string;
   Store: Function;
}

const Container = ({ store, name, children }) => {
   // initialize store hooks
   // this is required because react expects the same number
   // of hooks to be called on each render
   // so if we run init in useStore hook - it'll break on re-render
   // return provider with stores map
   const storesMap = new Map([[name, store()]]);

   // get context for specific store
   const Context = contextMap[name];
   return <Context.Provider value={storesMap}>{children}</Context.Provider>;
};

export const Provider = ({ children }) => {
   const stores = Object.values(storesMap);
   if (!stores.length) return children;

   // create providers for each store
   let providersLayout;

   stores.forEach(({ Store, name }: StoreInit) => {
      let context = contextMap[name];
      if (!context) {
         context = createContext(null);
         contextMap[name] = context;
      }
      providersLayout = (
         <Container name={name} store={Store}>
            {providersLayout || children}
         </Container>
      );
   });
   return providersLayout;
};

export const useStore = (storeName: string) => {
   // use store specific context
   const map: Map<string, Function> = useContext(contextMap[storeName]);

   // complain if no map is given
   if (!map) {
      throw new Error('You must wrap your components with a <Provider>!');
   }

   const instance = map.get(storeName);
   return instance;
}

export const createStore = (storeInit: StoreInit) => {
   storesMap[storeInit.name] = storeInit;
   return () => useStore(storeInit.name);
};
