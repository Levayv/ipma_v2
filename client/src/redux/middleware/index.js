
export const loggerTest = store => next => action => {
    console.log('[Log] Action\'s type is ', action);
    let result = next(action);
    console.log('[Log] Changed state is ', store.getState());
    return result;
};

