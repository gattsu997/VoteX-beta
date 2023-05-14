
let bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const express = require("express");
const fs = require("file-system");

const PORT = process.env.PORT || 3002;

const app = express();



app.use(bodyParser.urlencoded({ extended: false }));
// app.use(express.json({ limit: '25mb' }));
// app.use(express.urlencoded({ limit: '25mb' }));




// var upload = multer({
//     storage:storage,
//     fileFilter:fileFilter,
//     onFileUploadStart:function(file){
//             console.log(file.originalname + ' is starting .... ')
//     },

// });


app.post("/uploadImg", (req, res) => {

    // res.send((req.body.env+"").slice(23));
    // let imgcode = req.body.env+""
    let imgcode = (req.body.env + "").slice(23)
    // console.log(typeof imgcode)
    fs.writeFile('images/who.jpg', imgcode, { encoding: 'base64' }, function (err) {
        const exec = require('child_process').exec;

        exec('python  "k:/Hackathon/face_recognition/face_rec.py"', (err, stdout, stderr) => {
            if (err) {
                console.error(err);
                return;
            }
            else if (stdout == "") {
                console.log('authentication failed')
                stdout = 'authentication failed'
                res.sendFile("K:/Hackathon/testing-face-website/frontend-face/src/failure.html");

            }
            else {console.log(stdout);
            // console.log(typeof stdout)
            res.sendFile("K:/Hackathon/testing-face-website/frontend-face/src/success.html");}
        });
    });


});











// app.get("/api", (req, res) => {
//     // console.log("mkskhrvgk.")
//     const exec = require('child_process').exec;
//     exec('python  "k:/Hackathon/face_recognition/face_rec.py"', (err, stdout, stderr) => {
//         if (err) {
//             console.error(err);
//             return;
//         }
//         // if (stdout=="")
//         // {
//         //     console.log('authentication failed')
//         //     stdout = 'authentication failed'
//         // }
//         // console.log(stdout);
//         //console.log(typeof stdout)
//         res.json({ message: stdout });

//     });
//     //res.json({ message: std });
// });

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});


app.get("/", (req, res) => {
    res.send("helloworld");
});


app.get("/data", (req, res) => {
    console.log("react says hiiiiiiiiiiii");
    // res.redirect("/");
});
