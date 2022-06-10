import { collection, getDocs, addDoc, where, query, orderBy, deleteDoc, doc } from "firebase/firestore"
import { createContext, useState } from "react"
import db, {auth} from "../firebase/firebaseConfig"

export const FirestoreContext = createContext();

const UseFirestore = ({children}) => {

    const [data, setData] = useState([])
    const [error, setError] = useState()
    const [loading, setLoading] = useState(false)
    const [playersGame, setPlayersGame] = useState([])
    const [allPlayers, setAllPlayers] = useState([])
    const [allPlayersGame, setAllPlayersGame] = useState([])
    const [filtered, setFiltered] = useState(null)
    const [searched, setSearched] = useState("")
    const [comments, setComments] = useState([])
    

    const getDataGame = async() => {
        try {
            setLoading(true)
            const dataRef = collection(db, "games")
            const q = query(dataRef, orderBy("start"))
            const querySnapshot = await getDocs(q)
            const dataDB = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
            setData(dataDB)
        } catch (error) {
            setError(error.message)
            
        } finally {
            setLoading(false)

        }
    }

    const getComments = async() => {
        try {
            setLoading(true)
            const dataRef = collection(db, "comments")
            const q = query(dataRef, orderBy("date", "desc"))
            const querySnapshot = await getDocs(q)
            const dataDB = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
            setComments(dataDB)
        } catch (error) {
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
            setError(error.message)
        }         
    }

    const getAllPlayers = async() => {
        try {
            const querySnapshot = await getDocs(collection(db, "players"))
            const dataDB = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
            setAllPlayers(dataDB)
        } catch (error) {
            setError(error.message)
        } 
    }

    const getAllPlayersGame = async() => {
        try {
            const querySnapshot = await getDocs(collection(db, "playGame"))
            const dataDB = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
            setAllPlayersGame(dataDB)
        } catch (error) {
            setError(error.message)
        } 
    }

    const deletePlayGame = async (id) => {
        try {
            const docRef = doc(db, "playGame", id)
            await deleteDoc(docRef)
            setPlayersGame(playersGame.filter(item => item.id !== id))

        } catch (error) {
            setError(error.message)
        }    }

    const deleteGame = async (id) => {
        try {
            const docRef = doc(db, "games", id)
            await deleteDoc(docRef)
            setData(data.filter(item => item.id !== id))
            const dataRef = collection(db, "playGame")
            const q = query(dataRef, where("gameId", "==", id))
            const snapshot = await getDocs(q)
            const results = snapshot.docs.map((doc) => ({...doc.data(), id: doc.id}))
            results.forEach(async result => {
                const ref = doc(db, "playGame" , result.id)
                await deleteDoc(ref)
            })

        }  catch (error) {
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
            setError(error.message)
        }
    }

    const searchCity = city => {
        setFiltered(data.filter(item => item.city === city))
    }

    return (
        <FirestoreContext.Provider value = {{data, error, loading, setData, getDataGame, addGame, addPlayGame, playersGame, getPlayersGame, getAllPlayers, allPlayers, searchCity, filtered, searched, setSearched, addComment, comments, getComments, deletePlayGame, getAllPlayersGame, allPlayersGame, deleteGame}}>
         {children}
        </FirestoreContext.Provider>
    )
        
    
}
export default UseFirestore;