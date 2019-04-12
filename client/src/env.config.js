const env = process.env.NODE_ENV;

export const getURI = () => {

    console.log("Environment: " + env);

    if (env == "production") {
        return "";
    } else if (env == "stable") {
        return "";
    } else if (env == "development") {
        return "";
    } else {
        return "http://localhost:8081";
    }
}