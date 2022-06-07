import { collection, getDocs, addDoc, where, query, orderBy, deleteDoc } from "firebase/firestore"
import { createContext, useState } from "react"
import db, {auth} from "../firebase/firebaseConfig"

export const FirestoreContext = createContext();

const UseFirestore = ({children}) => {

    const [data, setData] = useState([])
    const [created, setCreated] = useState([])
    const [error, setError] = useState()
    const [loading, setLoading] = useState(false)
    const [playersGame, setPlayersGame] = useState([])
    const [allPlayers, setAllPlayers] = useState([])
    const [filtered, setFiltered] = useState(null)
    const [searched, setSearched] = useState("")
    const [comments, setComments] = useState([])

    //metodo ejemplo leer colección ---- crear states para cada colección
        //llevar el useEffect a cada componente y quitarlo de aqui para que no se ejecute frecuentemente
    

    const getDataGame = async() => {
        try {
            setLoading(true)
            const dataRef = collection(db, "games")
            const q = query(dataRef, orderBy("start"))
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

    const getComments = async() => {
        try {
            const dataRef = collection(db, "comments")
            const q = query(dataRef, orderBy("date", "desc"))
            const querySnapshot = await getDocs(q)
            const dataDB = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
            setComments(dataDB)
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
            setCreated(dataDB)
        } catch (error) {
            console.log(error)
            setError(error.message)
            
        } finally {
            setLoading(false)

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

    const addComment = async(userA, date, comment) => {
        try {
            await addDoc(collection(db, "comments"), {
                userA,
                date,
                comment,
                userB: auth.currentUser.displayName
            })
            
        } catch (error) {
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
        console.log( data)
        setFiltered(data.filter(item => item.city === city))
    }

    return (
        <FirestoreContext.Provider value = {{data, error, loading, setData, getDataGame, addGame, getDataMyGame, addPlayGame, playersGame, getPlayersGame, getAllPlayers, allPlayers, searchCity, filtered, searched, setSearched, created, addComment, comments, getComments}}>
         {children}
        </FirestoreContext.Provider>
    )
        
    
}
export default UseFirestore;