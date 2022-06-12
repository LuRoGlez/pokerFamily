import { useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { FirestoreContext } from "../context/UseFirestore"
import { auth } from "../firebase/firebaseConfig";
import Swal from "sweetalert2";



const EditComment = () => {

    const {getComments, comments, updateComment} = useContext(FirestoreContext)
    const navigate = useNavigate();
    const {register, handleSubmit, formState: { errors }, setValue} = useForm(); 


    useEffect(() => {
        getComments()
    }, [])

    const params = useParams()
    const comment = comments.filter(item => item.id === params.commentId)

    

    const onSubmit = (data) => {
        try {
             updateComment(comment[0].id, data.message)
             Swal.fire(
                'Comentario editado',
                '',
                'info'
              )
            navigate(-1)
            
        } catch (error) {
            Swal.fire(
                error.message,
                '',
                'error'
              )
        }
    }
    if(comment[0].userB !== auth.currentUser.displayName){
        return navigate("/");
     }

    return ( 
        <>
        <h2 className="my-3">Editar Comentario</h2>
        <div className="createComment">
        <form className="formComments"
        onSubmit={handleSubmit(onSubmit)}
        >
            
            <textarea cols="50" rows="5" maxLength="500" defaultValue={comment[0].comment} placeholder="Ej: Muy simpatico y gran jugador de poker"
            {...register("message", {required: "Campo obligatorio"})
            
        }
            />
            <button type="submit"
            className="btn btn-primary m-2">Guardar Edición</button>
        </form>
    </div>
    </>
     );
}
 
export default EditComment;