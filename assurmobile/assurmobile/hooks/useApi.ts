import { useState, useCallback } from 'react';
import fetchData from './fetchData';

export function useApi<T>() {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const request = useCallback(async (path: string, method: string = 'GET', body?: object, useToken: boolean = true) => {
        setLoading(true);
        setError(null);
        try {
            const result = await fetchData(path, method, body, useToken);
            setData(result);
            return result;
        } catch (err: any) {
            const errorMsg = err.message || 'Une erreur est survenue';
            setError(errorMsg);
            console.error('API Error:', errorMsg);
            // On ne throw plus l'erreur pour éviter de faire crasher le router
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    return { data, loading, error, request, setData };
}
