import { useState } from 'react';

export function useCatching(callback)  {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('')

    const fetching = async (p) => {
        try {
            setIsLoading(true)
            await callback(p)
        } catch (e) {
            setError(e.message)    
        } finally {
            setIsLoading(false)
        }    
    }

    return [fetching, error, isLoading]
}