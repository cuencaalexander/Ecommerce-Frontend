const express = require('express');
const compression = require('compression');
const path = require('path');
const app = express();
 
app.use(compression());
app.use(express.static(path.join(__dirname, 'build')));
 
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));//serving index.html, located in folder 'build'. When we run 'NPM run build' command this build folder will be created.
});
 
const PORT = process.env.PORT || 3000;//we are building an Express server and serving on port 3000
 
app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
});
