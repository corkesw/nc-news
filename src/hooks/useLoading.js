import { useState } from "react";

export function useLoading(initialState = false) {

    const [loading, setLoading] = useState(initialState)

    const handleReset = () => {setLoading(initialState)}

    const handleToggle = () => setLoading(curr => !curr)

    return {
        on: loading,
        loading: setLoading,
        reset: handleReset,
        toggle: handleToggle
    }
} 