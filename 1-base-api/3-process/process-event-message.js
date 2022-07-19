process.on('message', msg => {
    console.log('message event occurred, callback arg: ', msg)
});