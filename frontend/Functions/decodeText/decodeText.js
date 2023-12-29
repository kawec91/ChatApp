//Decode
export default function decodePasswordV2(pass) {
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