const express = require('express')
const app = express()
const router = express.Router();
const port = 3000;
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const fs = require('fs');
const html_to_pdf = require('html-pdf-node');

app.use('/api', router);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// API to convert html page / url to pdf file
router.route('/html-to-pdf').post((req, res) => {
    console.log('Body : ', req.body);
    
    // Sample object this API expect in req.body
    // { content: "path to the file (assets/detail.html)", name: 'example.pdf' }
    // { url: "https://www.example.com", name: 'example.pdf' }

    html_to_pdf.generatePdf(req.body, { format: 'A4' }).then(pdfBuffer => {
        console.log("PDF Buffer:-", pdfBuffer);
        fs.writeFile('assets/'+ req.body.name, pdfBuffer, function(err) {
            if(err) {
                return console.log(err);
            }
            res.json({status: 200, message: 'The file was saved!'});
        });
    });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})