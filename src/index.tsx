import React, { createContext, useContext, useImperativeHandle, useState } from 'react';

interface IStore {
   name: string;
   Store: Function;
}
interface IContainer {
   name: string;
   children: JSX.Element;
   ref: React.RefObject<any>;
}
interface IProvider {
   children: JSX.Element;
}

// Create stores map for global store assignment
const storesMap = new Map<string, IStore>();
// Create context map for global store assignment
const contextMap = new Map<string, React.Context<any>>();
// Create container map to force refresh after state change
const containerMap = new Map<string, React.RefObject<any>>();

const Container = React.forwardRef(({ name, children }: IContainer, ref: any) => {
   //Workaround to update the store function
   const [_, redraw] = useState(false);
   useImperativeHandle(ref, () => ({
      redraw: () => redraw(!_),
   }));

   // get context for specific store
   const Context = contextMap.get(name);

   //get specific store
   const storeInit = storesMap.get(name);
   if (Context && storeInit)
      return <Context.Provider value={storeInit.Store()}>{children}</Context.Provider>;
   return null;
});

export const Provider = ({ children }: IProvider) => {
   if (!storesMap.size) return children;

   // create providers for each store
   let providersLayout: JSX.Element | undefined;

   storesMap.forEach(({ name }: IStore) => {
      let context = contextMap.get(name);
      let ref = containerMap.get(name);

      if (!ref) {
         ref = React.createRef();
      }
      containerMap.set(name, ref);

      if (!context) {
         context = createContext(null);
         contextMap.set(name, context);
      }

      providersLayout = (
         <Container ref={ref} name={name}>
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

   //Force redraw after state change
   containerMap.get(storeInit.name)?.current?.redraw();
   return () => useStore(storeInit.name);
}
