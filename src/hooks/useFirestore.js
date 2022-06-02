import { collection, getDocs, addDoc, where, query } from "firebase/firestore"
import { useState } from "react"
import db, {auth} from "../firebase/firebaseConfig"

export const useFirestore = () => {

    const [data, setData] = useState([])
    const [error, setError] = useState()
    const [loading, setLoading] = useState(false)
    const [playersGame, setPlayersGame] = useState([])
    const [allPlayers, setAllPlayers] = useState([])

    //metodo ejemplo leer colección ---- crear states para cada colección
        //llevar el useEffect a cada componente y quitarlo de aqui para que no se ejecute frecuentemente
    

    const getDataGame = async() => {
        try {
            setLoading(true)
            const querySnapshot = await getDocs(collection(db, "games"))
            const dataDB = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
            setData(dataDB)
        } catch (error) {
            console.log(error)
            setError(error.message)
            
        } finally {
            setLoading(false)

        }
    }

    const getAllPlayers = async() => {
        try {
            const querySnapshot = await getDocs(collection(db, "players"))
            const dataDB = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
            setAllPlayers(dataDB)
        } catch (error) {
            console.log(error)
            setError(error.message)
        }
    }

    const getPlayersGame = async(gameId) => {
        try {
            const dataRef = collection(db, "playGame")
            const q = query(dataRef, where("gameId", "==", gameId))
            const querySnapshot = await getDocs(q)
            const dataDB = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
        setPlayersGame(dataDB)
        } catch (error) {
            console.log(error)
            setError(error.message)
        }
        
    }

    const getDataMyGame = async() => {
        try {
            setLoading(true)
            const dataRef = collection(db, "games")
            const q = query(dataRef, where("uid", "==", auth.currentUser.uid))
            const querySnapshot = await getDocs(q)
            const dataDB = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
            setData(dataDB)
        } catch (error) {
            console.log(error)
            setError(error.message)
            
        } finally {
            setLoading(false)

        }
    }

    const addPlayGame = async(gameId) => {
        try {
            await addDoc(collection(db, "playGame"), {
                gameId,
                uid: auth.currentUser.uid,
                displayName: auth.currentUser.displayName
            }
            )} catch (error) {
            console.log(error)
            setError(error.message)
        }
    }
    
    const addGame = async(addon, addonChips, addonPrice, addonLevel, address, buyin, city, lateLevels, lateRegister, levels, maxPlayers, name, playersXtable, rebuy, stackInicial, start) => {
        try {
            if(addon && rebuy && lateRegister){
            await addDoc(collection(db, "games"), {
                addon,
                addonChips,
                addonPrice,
                addonLevel,
                address,
                buyin,
                city,
                lateLevels,
                lateRegister,
                levels,
                maxPlayers,
                name,
                playersXtable,
                rebuy,
                stackInicial,
                start,
                uid: auth.currentUser.uid
            });
            } else if(addon && rebuy) {
                await addDoc(collection(db, "games"), {
                addon,
                addonChips,
                addonPrice,
                addonLevel,
                address,
                buyin,
                city,
                levels,
                maxPlayers,
                name,
                playersXtable,
                rebuy,
                stackInicial,
                start,
                uid: auth.currentUser.uid
            });
            } else if (addon){
                await addDoc(collection(db, "games"), {
                    addon,
                    addonChips,
                    addonPrice,
                    addonLevel,
                    address,
                    buyin,
                    city,
                    levels,
                    maxPlayers,
                    name,
                    playersXtable,
                    stackInicial,
                    start,
                    uid: auth.currentUser.uid
                });
            } else if(rebuy && lateRegister){
                await addDoc(collection(db, "games"), {
                    address,
                    buyin,
                    city,
                    lateLevels,
                    lateRegister,
                    levels,
                    maxPlayers,
                    name,
                    playersXtable,
                    rebuy,
                    stackInicial,
                    start,
                    uid: auth.currentUser.uid
                });
            } else if(rebuy){
                await addDoc(collection(db, "games"), {
                    address,
                    buyin,
                    city,
                    levels,
                    maxPlayers,
                    name,
                    playersXtable,
                    rebuy,
                    stackInicial,
                    start,
                    uid: auth.currentUser.uid
                });
            } else if(lateRegister){
                await addDoc(collection(db, "games"), {
                    address,
                    buyin,
                    city,
                    lateLevels,
                    lateRegister,
                    levels,
                    maxPlayers,
                    name,
                    playersXtable,
                    stackInicial,
                    start,
                    uid: auth.currentUser.uid
                });
            }else{
                await addDoc(collection(db, "games"), {
                    address,
                    buyin,
                    city,
                    levels,
                    maxPlayers,
                    name,
                    playersXtable,
                    stackInicial,
                    start,
                    uid: auth.currentUser.uid
                });
            }
            
        } catch (error) {
            console.log(error.message)
        }
    }

    const searchCity = city => {
        getDataGame()
        console.log(data)
        const dataCity = data.filter(item => item.city === city)
        setData(dataCity)
        console.log(data)
    }

    return {
        data, error, loading, setData, getDataGame, addGame, getDataMyGame, addPlayGame, playersGame, getPlayersGame, getAllPlayers, allPlayers, searchCity
    }
}