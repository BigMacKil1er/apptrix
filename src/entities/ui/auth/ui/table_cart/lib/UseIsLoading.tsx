import { useState } from "react";

export const useIsLoading = () => {
    const [isLoading, setIsloading] = useState(false)
    return {
        isLoading,
        setIsloading
    }
};