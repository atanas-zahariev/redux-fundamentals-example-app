const a = 1;
const b = 2


function add(ctx) {
    // console.log(ctx.showView('multiplay'));
    console.log(a + b);
}

function multiplay(ctx) {
    // console.log(ctx.showView('divide'));
    console.log(a * b);

}

function divide(ctx) {
    console.log(a / b);
}

const viewImage = {
    'add': add,
    'multiplay': multiplay,
    'divide': divide
}

const withContex = {
    showView
}

function showView(name) {
    const view = viewImage[name]
    if (typeof view === 'function') {
        return view(withContex)
    }
}


function wrapDispatch1(next) {
    return function handleAction1(action) {
        console.log('1')
        console.log(next);

        return next(action)
    }
}

function wrapDispatch2(next) {
    return function handleAction2(action) {
        console.log('2')
        console.log(next);

        return next(action)
    }
}

function wrapDispatch3(next) {
    return function handleAction3(action) {
        console.log('3')
        console.log(next);

        return next(action)
    }
}

function compose(...funcs) {
    if (funcs.length === 0) {
        return arg => arg
    }

    if (funcs.length === 1) {
        return funcs[0]
    }

    return funcs.reduce(helper)
}

function helper(a, b) {
    return function outsider(...args) {
        return a(b(...args))
    }
}


 compose(wrapDispatch1, wrapDispatch2, wrapDispatch3)(add)()








// function factorial(n) {
//     if (n === 1) {
//         return 1;
//     } else {
//         // Recursive case: call factorial function with n-1 and multiply it by n
//         return n * factorial(n - 1);
//     }
// }

// // Call the factorial function with an argument
// const result = factorial(5);
// console.log(result);
















