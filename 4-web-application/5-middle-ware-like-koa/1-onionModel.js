function onionModel(fns) {
    return function (context) {
      handleMiddleware(0);

      /**
       * 调用指定 index 的中间件，为其传入 next 参数为下一个中间件的 dispatch
       * @param {Number} i 中间件 index
       * @return {Promise} resolve 后意味着上一个中间件 next() 后的代码可以继续执行
       */
      function handleMiddleware(i) {
        let fn = fns[i];

        // 中间件都被调用后
        if (i === fns.length) {
          return Promise.resolve();
        }

        try {
          // 调用当前中间件，next 参数设置为下一个中间件的 dispatch
          // 程序执行到 await next() 时进入下一个中间件调用
          const result = fn(context, handleMiddleware.bind(null, ++i));

          // 将本次调用结果返回给上一个中间件，也就是 await next()
          return Promise.resolve(result);
        } catch (err) {
          return Promise.reject(err);
        }
      }
    }
}

module.exports = onionModel;