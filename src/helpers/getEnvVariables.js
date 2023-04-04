export const getEnvVariables = () => {

    // import.meta.env;

    return {
        // ...import.meta.env,
        // VITE_API_URL: import.meta.env.VITE_API_URL || 'http://localhost:4000/api',
        VITE_API_URL: import.meta.env.VITE_API_URL,
    };
};
