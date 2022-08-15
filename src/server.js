const app = require('./app');


var PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server listen on port ${PORT}`)
})