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
    // връща функция за която е в сила правилото, че когато бъде извикана, изпълнението на вътрешната функция е аргумент на външната.
    // Или ,ако са три функции,какъвто е случая, извикването на последната подадена на reduce функция,
    // е аргумент на втората,чието извикване е аргумент на първата и най-външна функция.
    // Друг начин за описване е - wrapDispatch3 е аргумент на wrapDispatch2 която е аргумент на wrapDispatch1.
    // Следователно след изпълнението ще завършим с handleAction1 в чиито closure аргумент e handleAction2,което означава
    // че при изпълнението на handleAction1 ще извикаме изпълнението на handleAction2, която от своя страна ще извика handleAction3,
    // която пък от своя страна като завършващ етап ще изпъни dispatch.
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





