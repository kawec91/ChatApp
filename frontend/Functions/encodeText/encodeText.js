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
export default function codePasswordV2(pass) {
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

//Decode
// function decodePasswordV2(pass) {
//     let decodingPassword = "";
//     let read = "";
//     let output = "";
//     let finalOutput = "";
//     //Convert char to .
//     for (let y = 0; y < pass.length; y++) {
//         switch (pass[y]) {
//             case "R":
//                 decodingPassword += ".";
//                 break;
//             default:
//                 decodingPassword += pass[y];
//                 break;
//         }
//     }
//     //Convert Numbers To Char
//     for (let z = 0; z < decodingPassword.length; z++) {
//         switch (decodingPassword[z]) {
//             case "Q":
//             case "X":
//             case "T":
//             case "V":
//             case "C":
//             case "S":
//             case "F":
//             case "W":
//             case "P":
//             case "H":
//                 read = "";
//                 break;
//             case "Z":
//             case "O":
//             case "K":
//             case "G":
//             case "J":
//             case "B":
//             case "Y":
//             case "L":
//             case "A":
//                 output += String.fromCharCode(
//                     (Number(read) * 2) / decodingPassword[z + 1]
//                 );
//                 break;
//             case "U":
//                 output += String.fromCharCode((Number(read) * 2) / 10);
//                 break;
//             default:
//                 read += decodingPassword[z];
//                 break;
//         }
//     }
//     //Revers Output
//     for (let i = output.length - 1; i > -1; i--) {
//         finalOutput += output[i];
//     }
//     return finalOutput;
// }