const app = require("./server/app");

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening at ${PORT}`));
