const express = require('express')
const app = express();
const PORT = process.env.PORT || 3000;

app.set('views', process.cwd());
app.engine('html', require('ejs').renderFile);

app.use(express.static(__dirname ));

app.get('/', (req, res) => {
  res.render('index.html');
});

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
