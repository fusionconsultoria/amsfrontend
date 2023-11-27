import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// hooks
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getNotes } from "../../slices/noteSlice";
import NoteDetail from '../../components/NoteDetail/NoteDetail';

const Home = () => {
    const dispatch = useDispatch();

    const { notes, loading } = useSelector((state) => state.note);

    useEffect(() => {
        dispatch(getNotes());
    }, [dispatch]);


    if (loading) {
        return <p>Carregando...</p>;
    }

    return (
        <div id="home">
            {notes && notes.length === 0 && (
                <div >
                    Ainda não há notes publicados!{" "}
                </div>
            )}
            <Row >
                {notes && notes.map((note, index) => (
                    <Col key={note._id} xs={12} md={6} lg={4}>
                        <NoteDetail note={note} />
                    </Col>
                ))}
            </Row>
        </div>
    )
}

export default Home