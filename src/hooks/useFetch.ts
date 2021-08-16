import { useEffect, useState } from 'react';

const useFetch = (method: Function, dataSent: any) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoadingLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchMyAPI = async () => {
      setIsLoadingLoading(true);
      try {
        const response = await method(dataSent);
        setData(response.data);
        setIsLoadingLoading(false);
      } catch (e) {
        setError(e);
      }
    };

    fetchMyAPI();

    return () => setData(null);
  }, []);

  return {
    data,
    error,
    isLoading,
  };
};

export default useFetch;
