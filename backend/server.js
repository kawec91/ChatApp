/************
 * Requires
 ************/
//Express
const express = require('express');
//Curse
const cors = require('cors');
//Sql
const sqlite3 = require('sqlite3');
//FileSystem
const fs = require('fs');
//Path
const path = require('path');
//Multer
const multer = require('multer');

/************
 * App
 ************/
const app = express();

/************
 * App Use
 ************/
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

/************
 * Connection to DB
 ************/
let db = new sqlite3.Database('./dataBase.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        throw err;
    } else {
        console.log("DB: Connected [--- Status: OK ---]");
    }
})

/************
 * Server Config
 ************/
const PortNumber = 8801;

//Server Listen
app.listen(PortNumber, () => {
    console.log(`SVR: Enabled [--- Status: is working ---] at http://localhost:${PortNumber}`);
});

/************
 * Decoding
 ************/
//Decode
function decodePasswordV2(pass) {
    let decodingPassword = "";
    let read = "";
    let output = "";
    let finalOutput = "";
    //Convert char to .
    for (let y = 0; y < pass.length; y++) {
        switch (pass[y]) {
            case "R":
                decodingPassword += ".";
                break;
            default:
                decodingPassword += pass[y];
                break;
        }
    }
    //Convert Numbers To Char
    for (let z = 0; z < decodingPassword.length; z++) {
        switch (decodingPassword[z]) {
            case "Q":
            case "X":
            case "T":
            case "V":
            case "C":
            case "S":
            case "F":
            case "W":
            case "P":
            case "H":
                read = "";
                break;
            case "Z":
            case "O":
            case "K":
            case "G":
            case "J":
            case "B":
            case "Y":
            case "L":
            case "A":
                output += String.fromCharCode(
                    (Number(read) * 2) / decodingPassword[z + 1]
                );
                break;
            case "U":
                output += String.fromCharCode((Number(read) * 2) / 10);
                break;
            default:
                read += decodingPassword[z];
                break;
        }
    }
    //Revers Output
    for (let i = output.length - 1; i > -1; i--) {
        finalOutput += output[i];
    }
    return finalOutput;
}
/************
 * Encode
 ************/
//Generate own Code For Any Char
function generateCharCode(myChar, codec) {
    //Char Code * Codec
    let newCharNo = myChar.charCodeAt(0) * codec;
    //OutputNumber
    let output = "";
    switch (codec) {
        case 1:
            output = `Q${newCharNo / 2}Z${codec}`;
        case 2:
            output = `X${newCharNo / 2}O${codec}`;
            break;
        case 3:
            output = `T${newCharNo / 2}K${codec}`;
            break;
        case 4:
            output = `V${newCharNo / 2}G${codec}`;
            break;
        case 5:
            output = `C${newCharNo / 2}J${codec}`;
            break;
        case 6:
            output = `S${newCharNo / 2}B${codec}`;
            break;
        case 7:
            output = `F${newCharNo / 2}Y${codec}`;
            break;
        case 8:
            output = `W${newCharNo / 2}A${codec}`;
            break;
        case 9:
            output = `P${newCharNo / 2}L${codec}`;
            break;
        case 10:
            output = `H${newCharNo / 2}U${codec}`;
            break;
        default:
            break;
    }
    //Convert . to Char
    let finalOutput = "";
    for (let i = 0; i < output.length; i++) {
        switch (output[i]) {
            case ".":
                finalOutput += "R";
                break;
            default:
                finalOutput += output[i];
                break;
        }
    }

    return finalOutput;
}

//Code Pasword
function codePasswordV2(pass) {
    console.log("INPUT PASS: ", pass);
    let codecNo = [];
    let output = "";
    let isOnList = false;
    //Read Password From Revers
    for (let i = pass.length - 1; i > -1; i--) {
        let cNo = Math.floor(Math.random() * 10 + 1);
        codecNo.push(cNo);

        //Generate Char Code
        let charCode = generateCharCode(pass[i], cNo);
        //Save Codes
        output += charCode;
    }
    console.log("Codec No: ", codecNo);
    console.log("PASS OUTPUT: ", output);

    return output;
}
/************
 * Upload Files
 ************/
// Global
let getUploadedFileName = "";
let outputGlobal = "";
// Background Save Routine
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Localization on sever
        cb(null, './user/pictures');
    },
    filename: function (req, file, cb) {
        // File Type f.e .jpg ...
        let dtype = "";
        for (let p = 0; p < file.originalname.length; p++) {
            if (file.originalname[p] === '.')
                dtype = "";
            // *** //
            dtype += file.originalname[p];
        }
        // New filename with date and type
        let output = file.fieldname + '-' + Date.now() + dtype;
        // Datei global merken
        getUploadedFileName = "http://localhost:8801/user/pictures/" + output;
        getUploadedFileName = codePasswordV2(getUploadedFileName);
        outputGlobal = output;
        // Callback-Function
        cb(null, output);
        //
    }
});
//File Upload
const upload = multer({ storage: storage });
/************
 * Routes
 ************/
/************
 * Users
 ************/
//Register
app.get('/users/new/:obj', (req, res) => {
    let inpO = JSON.parse(req.params.obj);
    let myO = JSON.parse(req.params.obj);
    myO.password = decodePasswordV2(inpO.password);
    myO.profilePic = 'W412A8V224G4V212G4P207L9P247R5L9W192A8X49O2P220R5L9P252L9C127R5J5S147B6F182Y7C125J5X51O2P216L9V110G4T73R5K3S135B6X101O2H515U10V194G4H545U10H525U10V94G4C287R5J5C252R5J5V228G4P526R5L9V232G4W396A8H525U10F392Y7T70R5K3W456A8S303B6F402R5Y7V234G4C117R5J5X24R5O1H240U10T84K3C140J5P261L9S348B6F402R5Y7X55R5O1C260J5F378Y7F339R5Y7X99O2V222G4X54O1W188A8C117R5J5X29O1S336B6S348B6X116O2F364Y7'

    const sql = `INSERT INTO Users(login, nickname, email, password, role, profilePic, gloryPoints) VALUES('${myO.login}','${myO.nickname}','${myO.email}','${myO.password}', '${myO.role}', '${myO.profilePic}', '${myO.gloryPoints}')`;
    db.run(sql, function (err) {
        if (err) throw err;
        if (!err) res.send({ message: 'Succesfully registered.' });
    });
});
//Login
app.get('/users/login/:obj', (req, res) => {

    let inpO = JSON.parse(req.params.obj);
    const sql = `SELECT * FROM Users WHERE email='${inpO.email}' AND password='${decodePasswordV2(inpO.password)}'`;

    db.all(sql, function (err, rows) {
        if (err) throw err;
        if (rows.length > 0) {
            res.send(rows)
        }
    });


});
//Read No of Users
app.get('/users/all/length', (req, res) => {
    const sql = `SELECT * FROM Users`;
    db.all(sql, function (err, rows) {
        if (err) throw err;
        if (rows.length > 0) res.send({ usersLength: rows.length });
    })
});
//Read Specific User
app.get('/users/read/:id', (req, res) => {
    const sql = `SELECT * FROM Users WHERE id='${req.params.id}'`;
    db.all(sql, function (err, rows) {
        if (err) throw err;
        if (rows.length > 0) res.send(rows);
    })
});

//Update lastOnlieByEmail
app.get('/users/update/lastOnline/:obj', (req, res) => {
    let inpO = JSON.parse(req.params.obj);
    const sql = `UPDATE Users SET lastOnline='${inpO.time}' WHERE email='${inpO.email}'`;
    db.run(sql, function (err) {
        if (err) throw err;
        if (!err) res.send({ message: 'Success.' });
    })
})
//Update lastOnlieByUid
app.get('/users/update/lastOnlineUid/:obj', (req, res) => {
    let inpO = JSON.parse(req.params.obj);
    const sql = `UPDATE Users SET lastOnline='${inpO.time}' WHERE id='${inpO.uid}'`;
    db.run(sql, function (err) {
        if (err) throw err;
        if (!err) res.send({ message: 'Success.' });
    })
})
//Read LastOnline
app.get('/onlinePlayers', (req, res) => {
    const sql = `SELECT * FROM Users`;
    db.all(sql, function (err, rows) {
        if (err) throw err;
        if (rows.length > 0) res.send(rows);
    })
});
//Update Profile Pic link in DB
app.post('/upload/:uid', upload.single("image"), (req, res) => {
    console.log(`File '${getUploadedFileName}' loaded.`);
    const sql = `UPDATE Users SET profilePic='${getUploadedFileName}' WHERE id='${req.params.uid}'`;
    db.run(sql, function (err) {
        if (err) throw err;
        if (!err) res.send({ message: "Upload Success." });
    });
});
//Upload file
app.get("/user/pictures/:bild", (req, res) => {
    let fileName = req.params.bild;
    let options = {
        root: path.join(__dirname, '/user/pictures'),
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    }
    res.sendFile(fileName, options, function (err) {
        if (err) { res.send(err) } else {
            console.log('Send:', fileName);
        }
    });
});
//Edit Nickname
app.get('/update/nickname/:nname/:id', (req, res) => {
    const sql = `UPDATE Users SET nickname='${req.params.nname}' WHERE id='${req.params.id}'`;
    db.run(sql, function (err) {
        if (err) throw err;
        if (!err) res.send({ message: 'Success.' });
    })
});
/************
 * Carrer | JOBS
 ************/
// app.get('', (req, res) => {
//     const sql = ``;
//     db.run(sql, function(err){
//         if (err) throw err;
//     })
// });

//Read
app.get('/carrer/all', (req, res) => {
    const sql = `SELECT * FROM Jobs`;
    db.all(sql, function (err, rows) {
        if (err) throw err;
        if (rows.length > 0) res.send(rows);
    });
});
//Add
app.get('/carrer/add/:obj', (req, res) => {
    let myO = JSON.parse(req.params.obj);
    const sql = `INSERT INTO Jobs (position,date,shortDetails) VALUES ('${myO.position}','${myO.date}','${myO.shortDetails}')`;
    db.run(sql, function (err) {
        if (err) throw err;
        res.send({ message: 'Success.' });
    })
});
//Delete
// app.get('/carrer/delete/:obj', (req, res) => {
//     const sql = ``;
//     db.run(sql, function (err) {
//         if (err) throw err;
//     })
// });

/************
 * Contact
 ************/
//Send
app.get('/contact/send/:obj', (req, res) => {
    let myO = JSON.parse(req.params.obj);
    const sql = `INSERT INTO Contact ('email','thema','message') VALUES ('${myO.email}','${myO.thema}','${myO.message}')`;
    db.run(sql, function (err) {
        if (err) throw err;
        res.send({ message: 'Succesfully sended.' });
    })
})
//Read
app.get('/contact/all', (req, res) => {
    const sql = `SELECT * FROM Contact`;
    db.all(sql, function (err, rows) {
        if (err) throw err;
        if (rows.length > 0) res.send(rows);
    });
})

/************
 * Main Chat
 ************/
//Read
app.get('/chat/all', (req, res) => {
    const sql = `SELECT * FROM MainChat`;
    db.all(sql, function (err, rows) {
        if (err) throw err;
        if (rows.length > 0) {
            //
            res.send(rows);
        }
    })
});
//Send
app.get('/chat/message/:obj', (req, res) => {
    let myO = JSON.parse(req.params.obj);
    const sql = `INSERT INTO MainChat ('uid','message','date') VALUES ('${myO.uid}','${myO.message}','${myO.date}')`;
    db.run(sql, function (err) {
        if (err) throw err;
    })
});
/************
 * ChangeLog
 ************/
//Read
app.get('/changelog/all', (req, res) => {
    const sql = `SELECT * FROM ChangeLog`;
    db.all(sql, function (err, rows) {
        if (err) throw err;
        if (rows.length > 0) res.send(rows);
    })
});

//Add
app.get('/changelog/add/:obj', (req, res) => {
    let myO = JSON.parse(req.params.obj);
    const sql = `INSERT INTO ChangeLog (name, path, message, addby,status) VALUES ('${myO.name}','${myO.path}','${myO.message}','${myO.addby}','${myO.status}')`;
    db.run(sql, function (err) {
        if (err) throw err;
        if (!err) res.send({ message: 'Success.' });
    })
});

//Delete
app.get('/changelog/delete/:id', (req, res) => {
    const sql = `DELETE FROM ChangeLog WHERE id='${req.params.id}'`;
    db.run(sql, function (err) {
        if (err) throw err;
        if (!err) res.send({ message: 'Success.' });
    })
});
//Change Status to In progress...
app.get('/changelog/status/1/:id', (req, res) => {
    const sql = `UPDATE ChangeLog SET status='1' WHERE id='${req.params.id}'`;
    db.run(sql, function (err) {
        if (err) throw err;
        if (!err) res.send({ message: 'Success.' });
    })
});
//Change Status to Finish...
app.get('/changelog/status/2/:id', (req, res) => {
    const sql = `UPDATE ChangeLog SET status='2' WHERE id='${req.params.id}'`;
    db.run(sql, function (err) {
        if (err) throw err;
        if (!err) res.send({ message: 'Success.' });
    })
});

//Stats
app.get('/changelog/stats/byuserid', (req, res) => {
    const sql = `SELECT addby, COUNT(*) FROM ChangeLog GROUP BY addby ORDER BY COUNT(*) DESC`;
    db.all(sql, function (err, rows) {
        if (err) throw err;
        if (!err) res.send(rows);
    })
});

/************
 * Search
 ************/
//Search Result
app.get('/search/:obj', (req, res) => {
    const sql = `SELECT id, login, nickname, email FROM Users WHERE nickname LIKE '%${JSON.parse(req.params.obj).search}%'`;
    db.all(sql, function (err, rows) {
        if (err) throw err;
        if (rows.length > 0) res.send(rows);
    })
});

/************
 * Guilds
 ************/
//Read No of Guilds
app.get('/guilds/all/length', (req, res) => {
    const sql = `SELECT * FROM Guilds`;
    db.all(sql, function (err, rows) {
        if (err) throw err;
        if (rows.length > 0) res.send({ guildsLength: rows.length });
    })
});

/************
 * Achivments
 ************/
//Read No of Achivments
app.get('/achivments/all/length', (req, res) => {
    const sql = `SELECT * FROM Achivments`;
    db.all(sql, function (err, rows) {
        if (err) throw err;
        if (rows.length > 0) res.send({ achivmentsLength: rows.length });
    })
});
/************
 * PrivChats
 ************/
//List of all chats where one of id is user id
app.get('/mychats/:uid', (req, res) => {
    const sql = `SELECT * FROM PrivChats WHERE uid1='${req.params.uid}' OR uid2='${req.params.uid}'`;
    db.all(sql, function (err, rows) {
        if (err) throw err;
        if (rows.length > 0) res.send(rows);
        if (rows.length === 0) res.send({ message: '0 Active Chats...' });
    })
});

//Read Specific Chat
app.get('/privChats/:uid1/:uid2', (req, res) => {
    const sql = `SELECT * FROM PrivChats WHERE uid1='${req.params.uid1}' AND uid2='${req.params.uid2}' OR uid1='${req.params.uid2}' AND uid2='${req.params.uid1}'`;
    db.all(sql, function (err, rows) {
        if (err) throw err;
        if (rows.length > 0) res.send(rows);
        if (rows.length === 0) res.send({ message: '0 Active Chats' });
    })
});

//Create Chat
app.get('/chats/add/:obj', (req, res) => {
    console.log('Backend: ', req.params.obj)
    let myO = JSON.parse(decodePasswordV2(req.params.obj));
    const sql = `INSERT INTO PrivChats (uid1, uid2, messages) VALUES ('${Number(myO.uid1)}','${Number(myO.uid2)}','${JSON.stringify(myO.messages)}')`;
    db.run(sql, function (err) {
        if (err) throw err;
        if (!err) res.send({ message: 'Success.' });
    })
});

//Update Chat Messages
app.get('/chats/update/:obj', (req, res) => {
    let myO = JSON.parse(decodePasswordV2(req.params.obj))
    const sql = `UPDATE PrivChats SET messages='${JSON.stringify(myO.messages)}' WHERE uid1='${myO.uid1}' AND uid2='${myO.uid2}' OR uid1='${myO.uid2}' AND uid2='${myO.uid1}'`;
    db.run(sql, function (err) {
        if (err) throw err;
        if (!err) res.send({ message: 'Success.' });
    })
});

/************
 * OnlineUsers
 ************/
//Read
app.get('/online/all', (req, res) => {
    const sql = `SELECT * FROM OnlineUsers`;
    db.all(sql, function (err, rows) {
        if (err) throw err;
        if (rows.length > 0) res.send(rows);
        if (rows.length === 0) res.send({ message: '0 Users in db.' });
    })
});
//Remove
app.get('/online/del/:uid', (req, res) => {
    console.log(req.params.uid);
    const sql = `DELETE FROM OnlineUsers WHERE uid='${req.params.uid}'`;
    db.run(sql, function (err) {
        if (err) throw err;
        if (!err) res.send({ message: 'Success.' });
    });
});
//Update
app.get('/onlineusers/update/:time/:user', (req, res) => {
    const sql = `UPDATE OnlineUsers SET time='${req.params.time}' WHERE uid='${req.params.user}'`;
    db.run(sql, function (err) {
        if (err) throw err;
        if (!err) res.send({ message: 'Success.' });
    })
});
//Create
app.get('/onlineusers/add/:user/:time', (req, res) => {

    const sql = `INSERT INTO OnlineUsers (uid, time) VALUES ('${req.params.user}','${req.params.time}')`;
    db.run(sql, function (err) {
        if (err) throw err;
        if (!err) res.send({ message: 'Success.' });
    })
});
