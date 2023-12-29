export default function readJsonFromServer(url, cb) {
    window.fetch(url)
        .then(
            //Response Data convert to Json
            resData => resData.json()
        )
        .then(
            myData => cb(myData))
        .catch((error) => console.error(error));
}