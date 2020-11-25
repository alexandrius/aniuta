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
   // get context for specific store
   const Context = contextMap.get(name);
   if (Context) return <Context.Provider value={store()}>{children}</Context.Provider>;
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
   return useContext(context);
}

export function createStore(storeInit: IStore) {
   storesMap.set(storeInit.name, storeInit);
   return () => useStore(storeInit.name);
}
