import React, { useEffect, useState } from 'react';
import { bgColor } from '../../../colors';
import ButtonText from '../../ButtonText/ButtonText';
import ButtonB from '../../ButtonB/ButtonB';
import readJsonFromServer from '../../../Functions/readJsonFromServer/readJsonFromServer';
import lastOnlineUpdateByUID from '../../../Functions/lastOnlineUpdateByUID/lastOnlineUpdateByUID';
import decodePasswordV2 from '../../../Functions/decodeText/decodeText';

export default function AppSettings() {
    const [nickname, setNickname] = useState("");
    const [email, setEmail] = useState("");
    const [login, setLogin] = useState("");
    const [uid, setUID] = useState("");
    const [imagePath, setImagePath] = useState("");
    const [datei, dateiNeu] = useState(null);
    const [isEditNickname, setEditNickname] = useState(false);
    const [newNickname, setNewNickname] = useState({ nname: '' })

    function changeNickname() {
        readJsonFromServer(`http://localhost:8801/update/nickname/${newNickname.nname}/${uid}`, (r) => {
            setEditNickname(!isEditNickname);
            //Sessionstorage Changes
            let sstorage = JSON.parse(sessionStorage.getItem('user'));
            sstorage.nickname = newNickname.nname;
            sessionStorage.setItem('user', JSON.stringify(sstorage));
        });
    }

    function getNewUserData() {
        lastOnlineUpdateByUID(uid);
        readJsonFromServer(`http://localhost:8801/users/read/${uid}`, (r) => {
            let inputUser = r[0];
            let user = {
                id: inputUser.id,
                login: inputUser.login,
                nickname: inputUser.nickname,
                email: inputUser.email,
                role: inputUser.role,
                profilePic: inputUser.profilePic
            }
            setImagePath(decodePasswordV2(inputUser.profilePic));
            sessionStorage.setItem('user', JSON.stringify(user));
        })
    }
    function dateiTyp(dateiName) {
        let typ = "";
        // *** //
        for (let x = 0; x < dateiName.length; x++) {
            if (dateiName[x] === ".")
                typ = "";
            // *** //
            typ += dateiName[x];
        }
        // *** //
        return typ.toLowerCase();
    }
    function fileLoad() {
        // Statusvariable zum Sicherstellen, ob die Datei überhaupt
        // geschickt werden darf oder nicht!
        let schicken = false;
        // *** //
        // Überprüfe die Datei an Hand des Dateityps, ob es
        // geschickt werden soll...
        switch (dateiTyp(datei.name)) {
            // Geschickt wird eine Grafikdatei
            case '.jpg': case '.jpeg': case '.png':
                schicken = true;
                alert("Hochgeladen wird eine Grafikdatei *" + dateiTyp(datei.name));
                break;
            default:
                alert("Es dürfen nur Grafik- und Archidateien sowie PDFs hochgeladen werden!");
                break;
        }
        // *** //
        // Falls die Datei geschickt werden darf...
        if (schicken === true) {
            // Wird ein Formularobjekt erzeugt ...
            const formularObjekt = new FormData();
            // und die Datei wird an das Formularobjekt übergeben
            formularObjekt.append("image", datei);
            // und anschließen an die Backend-Route geschickt
            window
                // Route
                .fetch(`http://localhost:8801/upload/${uid}`, {
                    // Es wird zum HOCHLADEN geschickt
                    method: 'POST',
                    // Die Datei selbst...
                    body: formularObjekt
                })
                // Es kommt eine Antwort vom Server als Rohdaten
                // und wird als Text weitergeleitet...
                .then((rohDaten) => rohDaten.text())
                // Diese Textantwort kann man dann
                // weiter auswerten oder ignorieren!
                .then((antwort) => {
                    alert(antwort);
                    getNewUserData();
                    window.location.reload();
                })
                // Für den Fall, wenn es einen Fehler
                // gibt, wird es auf der Konsole
                // ausgegeben
                .catch((fehler) => console.error(fehler));

        }
    }

    function handleNewNickname(e) {
        setNewNickname({
            ...newNickname,
            [e.target.name]: e.target.value
        });
    }
    useEffect(() => {
        let user = JSON.parse(sessionStorage.getItem('user'));
        let img = user.profilePic === null ? "" : decodePasswordV2(user.profilePic)
        setImagePath(img);
        setNickname(user.nickname);
        setEmail(user.email);
        setLogin(user.login);
        setUID(user.id)
    }, [sessionStorage.getItem('user')]);
    return (
        <div className={`${bgColor} flex flex-col items-center justify-center w-full h-screen p-4 text-white`}>
            <div className='flex  items-center justify-center gap-2 mb-2'>

                <input type='file' onChange={(e) => dateiNeu(e.target.files[0])}
                    required />

                <ButtonB text={'Save'} click={fileLoad} />
            </div>
            <img src={imagePath} alt='User Pic' className='rounded-full bg-gray-600 w-72 h-72 object-cover' />
            <div className='flex justify-center gap-4 mt-2'>
                <p>Login: {login}</p>
            </div>
            <div className='flex justify-center gap-4'>
                <p>E-mail: {email}</p>
            </div>
            <div className='flex justify-center gap-4'>
                <p>Nickname: {isEditNickname === false ? nickname : <input type='text' className='text-black' placeholder='Nickname' name='nname' onChange={(e) => { handleNewNickname(e) }} />}</p> <ButtonText text={isEditNickname === false ? 'edit' : 'save'} click={isEditNickname === false ? () => (setEditNickname(!isEditNickname)) : () => { changeNickname() }} />
            </div>
            <div className='flex justify-center gap-4'>
                <p>Password: ********</p>
            </div>
        </div>
    )
}
