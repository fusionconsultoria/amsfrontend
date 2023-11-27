import './Note.css'
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

// Redux
import { getNote } from "../../slices/noteSlice"
import Pdf from '../../components/Pdf/Pdf';
import NoteView from '../../components/NoteView/NoteView';


function Note() {

    const { id } = useParams();

    const dispatch = useDispatch();

    const { note } = useSelector(
        (state) => state.note
    );

    // Load note data
    useEffect(() => {
        dispatch(getNote(id));
    }, [dispatch, id]);



    return (
        <>
            <div className="new-post">
                <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>Note {note.idChamado}</h2>
                <Form >
                    <>
                        <NoteView note={note} />
                    </>
                    <div className="container-btn" style={{ marginBottom: '1rem', marginLeft: '0.5rem', marginRight: '0.5rem' }} >
                        <div className="row">
                            <div className="col">
                                <Button id='criar' variant="secondary" size="lg" type="submit" style={{ width: '100%' }} href={`/narrativas/${note._id}`}>
                                    Reuniões e analises
                                </Button>
                            </div>
                            <div className="col">
                                <Pdf note={note} />
                            </div>
                        </div>
                    </div>
                </Form>
            </div>

        </>
    )

}

export default Note



