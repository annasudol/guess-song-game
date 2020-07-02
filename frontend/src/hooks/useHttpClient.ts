import { useState, useCallback, useRef, useEffect } from 'react';

export const useHttpClient = (): { isLoading: boolean; sendRequest: any } => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const activeHttpRequests = useRef([]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sendRequest = useCallback(async (url: RequestInfo, method = 'GET', body: any = null, headers = {}) => {
    setIsLoading(true);
    const httpAbortCtrl = new AbortController();
    activeHttpRequests.current.push(httpAbortCtrl);

    try {
      const response = await fetch(url, {
        method,
        body,
        headers,
        signal: httpAbortCtrl.signal,
      });

      const responseData = await response.json();

      activeHttpRequests.current = activeHttpRequests.current.filter(
        (reqCtrl: AbortController) => reqCtrl !== httpAbortCtrl,
      );

      if (!response.ok) {
        throw new Error(responseData.message);
      }

      setIsLoading(false);
      return responseData;
    } catch (err) {
      setIsLoading(false);
      console.warn(`Problem with sending request `, err);
    }
  }, []);

  useEffect(() => {
    return (): void => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      activeHttpRequests.current.forEach((abortCtrl: { abort: () => any }) => abortCtrl.abort());
    };
  }, []);

  return { isLoading, sendRequest };
};
