
export const junk = (/*store*/) => next => action => {
    return next(action);
};

export const loggerTest = store => next => action => {
    console.log('[Log] Dispatching action type is ', action);
    let result = next(action);
    console.log('[Log] Next state is', store.getState());
    return result;
};

