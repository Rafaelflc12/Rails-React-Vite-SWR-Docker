import { createContext, ReactNode, useContext } from 'react';
import { useFetchProdutos} from '../services/apiService';
import { Produto } from '../types/types';

interface ApiContextType {
  produtos: Produto[] | undefined;
  loading: boolean;
}

const ApiContext = createContext<ApiContextType | undefined>(undefined);

export const ApiProvider = ({ children }: { children: ReactNode }) => {
  const { data: produtos, error } = useFetchProdutos();
  const loading = !produtos && !error;

  return (
    <ApiContext.Provider value={{ produtos, loading }}>
      {children}
    </ApiContext.Provider>
  );
};

export const useApi = () => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error('useApi must be used within an ApiProvider');
  }
  console.log("USEAPI", context)
  return context;
};