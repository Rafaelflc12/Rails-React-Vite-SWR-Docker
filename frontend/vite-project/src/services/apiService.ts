

export const fetcher = async (url: string) => {
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
