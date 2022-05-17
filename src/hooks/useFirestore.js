import { collection, getDocs, addDoc, where, query } from "firebase/firestore"
import { useState } from "react"
import db, {auth} from "../firebase/firebaseConfig"

export const useFirestore = () => {

    const [data, setData] = useState([])
    const [dataCurrent, setDataCurrent] =useState([])
    const [error, setError] = useState()
    const [loading, setLoading] = useState(false)

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

    const getCurrentGame = async(gameId) => {
        try {
            setLoading(true)
            const dataRef = collection(db, "games")
            const q = query(dataRef, where("id", "==", gameId))
            const querySnapshot = await getDocs(q)
            const dataDB = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
            setDataCurrent(dataDB)
        } catch (error) {
            console.log(error)
            setError(error.message)
            
        } finally {
            setLoading(false)

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

    return {
        data, error, loading, getDataGame, addGame, getDataMyGame, getCurrentGame, dataCurrent
    }
}