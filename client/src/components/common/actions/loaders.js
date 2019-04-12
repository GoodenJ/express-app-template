export const loadStart = name => ({
    type: 'LOAD_START',
    name
});

export const loadEnd = (name, response) => ({
    type: 'LOAD_END',
    name,
    response
});

export const loadFailure = (name, response = {}) => ({
    type: 'LOAD_FAILURE',
    name,
    response
});