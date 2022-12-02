import { useEffect, useState } from 'react'
const useD3 = () => {
    const [d3, setD3] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    useEffect(() => {
        const loadD3 = async () => {
            try {
                const lib = await import('d3')
                setD3(lib)
                setLoading(false)
            } catch (e) {
                setLoading(false)
                setError(e)
                console.error(e)
            }
        }
        loadD3()
        return () => {

        }
    }, []);
    return {d3, loading, error}
};
export default useD3