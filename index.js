const server = require("./api/server");

const port = 7500;

server.listen(port, () => console.log(`Server Listening On Port: ${port}`));
