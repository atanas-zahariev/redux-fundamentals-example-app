const a = 1;
const b = 2

let newContex = null;


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

// console.log(showView('add'));

function composer(n, ...args) {
    if (n === undefined) {
        n = args.length - 1
    }
    if (n > -1) {
        args[n]()
        return composer(n - 1, ...args)
    }

}

composer(undefined, add, multiplay, divide)
// console.log('----------------------');
// add(multiplay(divide()))



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
















