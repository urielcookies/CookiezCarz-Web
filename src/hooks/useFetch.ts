import { useEffect, useState } from 'react';

const useFetch = (method: Function, dataSent: any) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoadingLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMyAPI = async () => {
      try {
        const response = await method(dataSent);
        setData(response.data);
        setIsLoadingLoading(false);
      } catch (e) {
        setError(e);
        setIsLoadingLoading(false);
      }
    };

    fetchMyAPI();

    return () => {
      setData(null);
      setError(null);
      setIsLoadingLoading(false);
    };
  }, []);

  return {
    data,
    error,
    isLoading,
  };
};

export default useFetch;
