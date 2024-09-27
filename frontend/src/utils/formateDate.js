export const formateDate = (date, config) => {
    // Default options for date formatting in French
    const defaultOptions = { 
        day: "numeric", 
        month: "long", // "long" for full month name
        year: "numeric",
        weekday: "long", // "long" for full weekday name
        hour: "numeric", 
        minute: "numeric",
        hour12: false // Use 24-hour format
    }; 
    
    // Use provided config or default options
    const options = config ? { ...defaultOptions, ...config } : defaultOptions; 

    return new Date(date).toLocaleString("fr-FR", options);
}
