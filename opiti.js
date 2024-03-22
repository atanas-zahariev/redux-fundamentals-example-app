const initialState = []

function todosReducer(state = initialState, action) {
    switch (action.type) {
        case 'todos/todoAdded': {
            return [...state, action.payload]
        }
        default:
            return state
    }
}

function createStore(reducer, preloadState, enhancers) {
    let listeners = []
    let state = preloadState

    function getState() {
        return state;
    }

    function subscribe(listener) {
        listeners.push(listener)
        return function unsubscribe() {
            let index = listeners.indexOf(listener)
            listeners.splice(index, 1)
        }
    }

    function dispatch(action) {
        state = reducer(state, action)
        listeners.forEach(listener => listener())
    }

    let store = { dispatch, subscribe, getState }

    if (enhancers) {
        return enhancers(createStore.bind(null, reducer))()
    }

    return { ...store }
}

function compose(...funcs) {
    if (funcs.length === 0) {
        return arg => arg
    }

    if (funcs.length === 1) {
        return funcs[0]
    }

    return funcs.reduce((a, b) => (...args) => a(b(...args)))
    // (...args) => a(b(...args)) === (...args) => wrapDispatch1(wrapDispatch2(wrapDispatch3())),

    // compose(...chain)(store.dispatch)
    // след изпълнение на горния ред:
    // wrapDispatch1() връща:

    // handleAction1(handleAction2){
    //   do somenthing..

    //   return next(action) === return handleAction2(handleAction3),тъй като
    //   wrapDispatch2(next),ще върне handleAction2,което се превръща в аргумент за wrapDispatch1 или неговият next аргумент
    // }

    // handleAction2(handleAction3){
    //   do somenthing..

    //   return next(action) === return handleAction3(dispatch),тъй като
    //   wrapDispatch3(next),ще върне handleAction3,което се превръща в аргумент за wrapDispatch2 или неговият next аргумент
    // }

    // handleAction3(dispatch){
    //   do somenthing..

    //   return next(action) === return dispatch(action )
    // }

}

function applyMiddleware(...middlewares) {
    return createStore => (...args) => {
        const store = createStore(...args)
        let dispatch = () => {
            throw new Error(
                'Dispatching while constructing your middleware is not allowed. ' +
                'Other middleware would not be applied to this dispatch.'
            )
        }

        const middlewareAPI = {
            getState: store.getState,
            dispatch: (...args) => dispatch(...args)
        }

        const chain = middlewares.map(middleware => middleware(middlewareAPI))
        
        dispatch = compose(...chain)(store.dispatch)
        
        return {
            ...store,
            dispatch
        }
    }
}


function exampleMiddleware1(storeAPI) {
    return function wrapDispatch1(next) {
        return function handleAction1(action) {
            console.log('1')
            console.log(next);

            return next(action)
        }
    }
}

function exampleMiddleware2(storeAPI) {
    return function wrapDispatch2(next) {
        return function handleAction2(action) {
            console.log('2')
            console.log(next);

            return next(action)
        }
    }
}

function exampleMiddleware3(storeAPI) {
    return function wrapDispatch3(next) {
        return function handleAction3(action) {
            console.log('3')
            console.log(next);

            return next(action)
        }
    }
}


const storeWithMiddlewares = createStore(todosReducer, undefined, applyMiddleware(exampleMiddleware1,exampleMiddleware2,exampleMiddleware3))

storeWithMiddlewares.dispatch({ type: 'todos/todoAdded', payload: { id: 1, text: 'abrakadabra' } });





