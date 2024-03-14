const initialState = []

function todosReducer(state = initialState, action) {
    state = state.filter(todo => !todo.selectedByState).filter(todo => !todo.selected)
    switch (action.type) {
        case 'todos/todoAdded': {
            // Can return just the new todos array - no extra object around it
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
        // eslint-disable-next-line no-undef
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
        // eslint-disable-next-line no-undef
        state = reducer(state, action)
        listeners.forEach(listener => listener())
    }

    let store = { dispatch, subscribe, getState }

    if (enhancers) {
        const withEnhancer = enhancers(createStore.bind(null, reducer))
        store = withEnhancer()

        return {...store}
    }

    return {...store}
}

const sayHiOnDispatch = (createStore) => {
    return (rootReducer, preloadedState, enhancers) => {
        const store = createStore(rootReducer, preloadedState, enhancers)

        function newDispatch(action) {
            if (typeof action === 'function') {
                return action(store.dispatch)
            }
            const result = store.dispatch(action)
            console.log('Hi!')
            return result
        }

        return { ...store, dispatch: newDispatch }
    }
}


// const storeApi = { dispatch, getState }

const storeWithEnhancer =  createStore(todosReducer, undefined, sayHiOnDispatch)

function getStore(dispatch) {
    
    dispatch({ type: 'todos/todoAdded', payload: { id: 0, text: 'proba', color: '' } })
}

storeWithEnhancer.dispatch(getStore)
const { dispatch, getState } = new createStore(todosReducer)

 dispatch({type: 'todos/todoAdded', payload: { id: 1, text: 'proba22', color: '' } })

console.log(storeWithEnhancer.getState(), 1);
console.log(getState(), 2);
console.log(getState() === storeWithEnhancer.getState());
