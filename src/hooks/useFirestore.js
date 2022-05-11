import { collection, getDocs, addDoc } from "firebase/firestore"
import { useEffect, useState } from "react"
import db, {auth} from "../firebase/firebaseConfig"

export const useFirestore = () => {

    const [data, setData] = useState([])
    const [error, setError] = useState()
    const [loading, setLoading] = useState(false)

    //metodo ejemplo leer colección ---- crear states para cada colección
        //llevar el useEffect a cada componente y quitarlo de aqui para que no se ejecute frecuentemente
    useEffect(() => {
        getData()
    }, [])

    const getData = async() => {
        try {
            setLoading(true)
            const querySnapshot = await getDocs(collection(db, "CollectionName"))
            const dataDB = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
            setData(dataDB)
        } catch (error) {
            console.log(error)
            setError(error.message)
            
        } finally {
            setLoading(false)

        }
    }
    
    const addGame = async(addon, addonChips, addonPrice, addonLevel, address, buyin, city, lateLevels, lateRegister, levels, maxPlayers, name, playersXtable, rebuy, stackInicial, start) => {
        try {
            await addDoc(collection(db, "partida"), {
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
            
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        data, error, loading, getData, addGame
    )
}