import { isNull } from 'lodash';
import { useEffect, useState } from 'react';

const useFetch = (method: Function | null, dataSent: any) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoadingLoading] = useState<boolean>(true);

  const fetchMyAPI = async () => {
    if (isNull(method)) return;
    try {
      const response = await method(dataSent);
      setData(response.data);
      setIsLoadingLoading(false);
    } catch (e) {
      setError(e);
      setIsLoadingLoading(false);
    }
  };

  useEffect(() => {
    fetchMyAPI();
    return () => {
      setData(null);
      setError(null);
      setIsLoadingLoading(false);
    };
  }, []);

  const refetch = () => {
    fetchMyAPI();
  };

  return {
    data,
    error,
    isLoading,
    refetch,
  };
};

export default useFetch;
