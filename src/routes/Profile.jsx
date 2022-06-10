import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FirestoreContext } from "../context/UseFirestore";
import {auth} from "../firebase/firebaseConfig"
import { useForm } from "react-hook-form";


const Profile = () => {

    const params = useParams()

    const {data, allPlayers, playersGame, addComment, comments, getComments, getAllPlayersGame, allPlayersGame} = useContext(FirestoreContext)
    const {register, handleSubmit, formState: { errors }, reset} = useForm(); 

    useEffect(() => {
        getAllPlayersGame()
        getComments()
    }, [])

   const player = allPlayers.filter(player => player.uid === params.playerId)
   const gamesPlayed = allPlayersGame.filter(playGame => playGame.uid === params.playerId).length
   const gamesCreated = data.filter(game => game.uid === params.playerId).length
   const myComments = comments.filter(comment => comment.userA === params.playerId)

   let today = Math.floor(new Date().getTime())/1000

    today = new Date(today*1000)


    const toDate = second => {
        let date = new Date(second*1000)
        var day = date.getDate();
        if(day < 10) day = "0"+day
        var month = date.getMonth()+1;
        if(month < 10) month = "0"+month
        var year = date.getFullYear();
        return `${day}/${month}/${year}`
      }

   const onSubmit = (data) => {
       try {
            addComment(currentPlayer.uid, today, data.message)
           reset({message : ""})
           getComments()
       } catch (error) {
           console.log(error.message)
       }
   }

   const currentPlayer = player[0]

    return (
        <>
        <div className="allProfile">
        <div className="profile">
            <div className="contrainerProfile">
                <h1>{currentPlayer.userName}</h1>
                <div className="infoProfile">
                    <div className="gamesCreated">
                        <p><h6>Partidas Creadas:</h6> {gamesCreated} </p>
                    </div>
                    <div className="gamesPlayed">
                        <p><h6>Partidas Jugadas:</h6> {gamesPlayed}</p>
                    </div>

                </div>
            </div>
            { params.playerId === auth.currentUser.uid ? null :
            <div className="createComment">
                <form className="formComments"
                onSubmit={handleSubmit(onSubmit)}
                >
                    <h5>¿Has jugado con {currentPlayer.userName}? </h5>
                    <h6>Deja un comentario para que todos lo conozcan</h6>
                    <textarea cols="50" rows="5" maxlength="500" placeholder="Ej: Muy simpatico y gran jugador de poker"
                    {...register("message", {required: "Campo obligatorio"})}
                    />
                    <button type="submit"
                    className="btn btn-primary m-2">Enviar Comentario</button>
                </form>
            </div>
            }
        </div>
        { myComments.length > 0 ?
        <div className="comments">
            <h3>Comentarios</h3>
            { myComments.map(item => (
            
            <div className="commentContent my-2">
                <div className="dateNameComment">
                    <h6>{item.userB}</h6>
                    <h6>{toDate(item.date.seconds)}</h6>
                </div>
                <div className="comment">
                   "{item.comment}"
                </div>
            </div>))}
            
        </div> : <h5>No hay comentarios sobre este jugador</h5>
     } 
        </div>
        </>
     );
}
 
export default Profile;