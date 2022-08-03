function onionModel(fns) {
    return function (context) {
        handleMiddleware(0);

        function handleMiddleware(i) {
            let fn = fns[i];

            if (i === fns.length) {
                return Promise.resolve();
            }

            try {
                const result = fn(context, handleMiddleware.bind(null, ++i));
                return Promise.resolve(result);
            } catch (err) {
                return Promise.reject(err);
            }
        }
    }
}

module.exports = onionModel;