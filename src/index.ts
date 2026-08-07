import Express = require("express");

const app = Express();
const port = 3000;

app.get('/', (req, res) => {
    res.json({message: 'Hello World! OpusFrota API is running!'})
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})