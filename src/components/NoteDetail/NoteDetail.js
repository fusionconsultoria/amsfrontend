import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';

const NoteDetail = ({ note }) => {

    const truncateTitle = (title) => {
        if (title.length <= 40) {
            return title;
        } else {
            return title.substring(0, 40) + '...';
        }
    };

    return (
        <Container style={{ marginBottom: '30px' }}>
            <Card
                border='secondary'
                text={'dark'}
                style={{ width: '18rem', height: '14rem' }}
                className="mb-2"
                bg='Light'
            >
                <Card.Header>{note.idChamado}</Card.Header>
                <Card.Body >
                    <Card.Title> {truncateTitle(note.titulo)}</Card.Title>
                    <Card.Text>
                        {note.modulo}
                    </Card.Text>
                </Card.Body>
                <Button variant="warning" href={`/note/${note._id}`} style={{ marginBottom: '1.5rem', width: '6rem', marginLeft: '1rem' }}>Ler mais</Button>
            </Card>
        </Container>
    );
};

export default NoteDetail;
