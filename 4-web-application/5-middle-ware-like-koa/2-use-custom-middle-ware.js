const onionModel = require('./1-middle-ware-instance');

const middlewares = [];
const context = {};

middlewares.push(async (ctx, next) => {
    console.log('-1- next 方法前 -1-')

    const result1 = await next();

    console.log("result1: ", result1);
    console.log("-1- next 方法后 -1-");
});

middlewares.push(async (ctx, next) => {
    console.log('-2- next 方法前 -2-')

    await next();

    console.log('-2- next 方法后 -2-')

    return 'fn2';
});

middlewares.push(async (ctx, next) => {
    console.log('-3- next 方法前 -3-')

    await next();

    console.log('-3- next 方法后 -3-')
});

onionModel(middlewares)(context);