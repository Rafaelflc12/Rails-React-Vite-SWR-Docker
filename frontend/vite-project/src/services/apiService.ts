import useSWR from 'swr';


const fetcher = async (url: string) => {
    try {
      console.log("Fetching URL:", url);
      const res = await fetch(url);

      if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
      }
      const data = await res.json();      
      console.log("Data fetched:", data);
      return data;
    } catch (error) {
      console.error("Fetch error:", error);
      throw error;
    }
  };

export const useFetchProduto = (id: string) => useSWR(`/api/produto/produtos/${id}`, fetcher);
export const useFetchProdutos = () => useSWR('/api/produto/produtos', fetcher);