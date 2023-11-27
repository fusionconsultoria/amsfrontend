import "./Dashboard.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';

import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";


// Redux
import { getUserNotes, deleteNote, resetMessage } from "../../slices/noteSlice"


const Dashboard = () => {
    const { id } = useParams();

    const dispatch = useDispatch();

    const { user: userAuth } = useSelector((state) => state.auth);

    const {
        notes
    } = useSelector((state) => state.note);


    // Load user data
    useEffect(() => {
        dispatch(getUserNotes(id));
    }, [dispatch, id]);

    // Reset component message
    function resetComponentMessage() {
        setTimeout(() => {
            dispatch(resetMessage());
        }, 2000);
    }

    // Exclude a note
    const handleDelete = (id) => {
        dispatch(deleteNote(id));

        resetComponentMessage();
    };

    return (
        <div className="dashboard">
            <h2>Dashboard</h2>
            <p>Gerencie os seus notes</p>
            {notes && notes.length === 0 ? (
                <div className="noposts">
                    <p>Não foram encontrados notes</p>
                    <Link to="/new" className="btn">
                        Criar primeiro note
                    </Link>
                </div>
            ) : (
                <div className="post_header" >
                    <span>Título</span>
                    <span>Ações</span>
                </div>
            )}
            {notes &&
                notes.map((note) => (
                    <div className="post_row" key={note._id}>
                        <p className="titulo_dash">{note.idChamado} - {note.titulo}</p>
                        {id === userAuth._id && (
                            <div className="actions">
                                <Button href={`/note/${note._id}`} className="btn btn-outline" variant="warning">
                                    Ver
                                </Button>
                                <Button href={`/editar/${note._id}`} className="btn btn-outline" variant="warning">
                                    Editar
                                </Button>
                                <Button
                                    className="btn btn-outline btn-danger"
                                    variant="danger"
                                    onClick={() => handleDelete(note._id)}
                                >
                                    Excluir
                                </Button>
                            </div>
                        )}
                    </div>
                ))}
        </div>
    )
}

export default Dashboard