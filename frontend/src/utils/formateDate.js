export const formateDate = (date, config) => {
    // Default options for date formatting in French
    const defaultOptions = { 
        month: "long", // "long" for full month name
        year: "numeric",
    }; 
    
    // Use provided config or default options
    const options = config ? { ...defaultOptions, ...config } : defaultOptions; 

    return new Date(date).toLocaleString("fr-FR", options);
}
