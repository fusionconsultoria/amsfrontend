//import "./Search.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NoteDetail from '../../components/NoteDetail/NoteDetail';


// hooks
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useQuery } from "../../hooks/useQuery";

// Redux
import { searchNotes } from "../../slices/noteSlice";

const Search = () => {
  const query = useQuery();
  const search = query.get("q");

  const dispatch = useDispatch();

  const { notes, loading } = useSelector((state) => state.note);

  useEffect(() => {
    dispatch(searchNotes(search));
  }, [dispatch, search]);


  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div id="search">
      <h2 style={{marginBottom: '30px' }}>Você está buscando por: {search}</h2>
      <Row >
                {notes && notes.map((note, index) => (
                    <Col key={note._id} xs={12} md={4}>
                        <NoteDetail note={note} />
                    </Col>
                ))}
            </Row>
    </div>
  );
};

export default Search;