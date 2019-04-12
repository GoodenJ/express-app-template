export const containsUndefined = (props) => {
    const exists = Object.keys(props).some(
        function(key){
            if (key != 'staticContext')
                return typeof props[key] == 'undefined'; 
        });
    return exists;
}

export const safeLoad = (fn, defaultValue = undefined) => {
    try{
        return fn();
    }
    catch(err){
        return defaultValue;
    }
}