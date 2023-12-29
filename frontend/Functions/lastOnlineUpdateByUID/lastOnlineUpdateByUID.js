import readJsonFromServer from "../readJsonFromServer/readJsonFromServer";

export default function lastOnlineUpdateByUID(id) {
    let timeNow = Date.now()
    let myObj = { time: timeNow, uid: id }
    readJsonFromServer(`http://localhost:8801/users/update/lastOnlineUid/${JSON.stringify(myObj)}`, (r) => {
        console.log(r);
    })
}