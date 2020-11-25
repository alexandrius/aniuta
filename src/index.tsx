// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { Context, createContext, useContext } from 'react';

interface IStore {
   name: string;
   Store: Function;
}
interface IContainer {
   name: string;
   children: JSX.Element;
   store: Function;
}
interface IProvider {
   children: JSX.Element;
}

// Create stores map for global store assignment
const storesMap = new Map<string, IStore>();
// Create context map for global store assignment
const contextMap = new Map<string, Context<any>>();

const Container = ({ store, name, children }: IContainer) => {
   // initialize store hooks
   // this is required because react expects the same number
   // of hooks to be called on each render
   // so if we run init in useStore hook - it'll break on re-render
   // return provider with stores map
   const storeMap = new Map([[name, store()]]);

   // get context for specific store
   const Context = contextMap.get(name);
   if (Context) return <Context.Provider value={storeMap}>{children}</Context.Provider>;
   return null;
};

export const Provider = ({ children }: IProvider) => {
   if (!storesMap.size) return children;

   // create providers for each store
   let providersLayout: JSX.Element | undefined;

   storesMap.forEach(({ Store, name }: IStore) => {
      let context = contextMap.get(name);
      if (!context) {
         context = createContext(null);
         contextMap.set(name, context);
      }
      providersLayout = (
         <Container name={name} store={Store}>
            {providersLayout || children}
         </Container>
      );
   });
   if (!providersLayout) return null;

   return providersLayout;
};

function useStore(storeName: string) {
   const context = contextMap.get(storeName);

   //complain if context is not initialized
   if (!context) {
      throw new Error('Context was not initialized');
   }
   // use store specific context
   const map: Map<string, Function> = useContext(context);

   // complain if no map is given
   if (!map) {
      throw new Error('You must wrap your components with a <Provider>!');
   }

   const instance = map.get(storeName);
   return instance;
}

export function createStore(storeInit: IStore) {
   storesMap.set(storeInit.name, storeInit);
   return () => useStore(storeInit.name);
}
