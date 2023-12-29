import readJsonFromServer from "../readJsonFromServer/readJsonFromServer";

export default function lastOnlineUpdateByEmail(email) {
    let timeNow = Date.now()
    let myObj = { time: timeNow, email: email }
    readJsonFromServer(`http://localhost:8801/users/update/lastOnline/${JSON.stringify(myObj)}`, (r) => {
        console.log(r);
    })
}