import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { insertHistory, resetMessage, getHistory, deleteHistory } from '../../slices/historySlice'
import Message from '../../components/Message/Message'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';


function History() {

    const { id } = useParams();

    const dispatch = useDispatch();

    const { histories, loading, error, message } = useSelector(
        (state) => state.history
    );

    const [descricao, setDescricao] = useState('');
    const [data, setData] = useState('');

    // Load note data
    useEffect(() => {
        dispatch(getHistory(id));
    }, [dispatch, id]);

    const handleDataChange = (e) => {
        const formattedDate = formatarData(e.target.value);
        setData(formattedDate);
    };

    // Reset component message
    function resetComponentMessage() {
        setTimeout(() => {
            dispatch(resetMessage());
        }, 2000);
    }

    const insertHistoryData = (e) => {

        e.preventDefault();

        const formData = {
            descricao: descricao,
            data: data,
            _id: id,
        }



        dispatch(insertHistory(formData));

        resetComponentMessage();

        setDescricao('');
        setData('');

        e.target.reset();
    }


    // Exclude an history
    const handleDelete = (historyId) => {

        dispatch(deleteHistory(historyId));

        resetComponentMessage();

    };

    return (
        <div className="history" >
            <Container>
                <Form onSubmit={insertHistoryData}
                    style={{ width: '50%', margin: 'auto', border: '1px solid #ccc', padding: '20px', borderRadius: '10px', marginBottom: '20px' }}
                >
                    <h2 style={{ textAlign: 'center' }} >Resumo de Reuniões e/ou analises</h2>
                    <Form.Group className="mb-3" controlId="descricao">
                        <Form.Label>Descrição</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            type="text"
                            name="descricao"
                            placeholder="Descricao"
                            onChange={(e) => setDescricao(e.target.value)}
                            required
                            style={{ resize: 'none', height: '6rem' }}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="data">
                        <Form.Label>Data</Form.Label>
                        <Form.Control
                            type="date"
                            name="data"
                            placeholder="Digite a data"
                            onChange={handleDataChange}
                            required
                        />
                    </Form.Group>


                    {!loading && <Button variant="warning" id='criar' type="submit">
                        Publicar
                    </Button>}
                    {loading && <Button variant="warning" type="submit" disabled>
                        Aguarde...
                    </Button>}
                    {error && <Message msg={error} type="error" />}
                    {message && <Message msg={message} type="success" />}
                </Form>
            </Container>
            <div className="dashboard">
                <h2>Dashboard</h2>
                {histories && histories.length === 0 ? (
                    <div className="noposts">
                        <p>Não foram encontrados narrativas</p>
                    </div>
                ) : (
                    <div className="post_header" >
                        <span>Título</span>
                        <span>Ações</span>
                    </div>
                )}
                {histories &&
                    histories.map((history) => (
                        <div className="post_row" key={history._id}>
                            {history && history._id && (
                                <p className="titulo_dash">{history.data} - {history.descricao}</p>
                            )}
                            <div className="actions">
                                <Button
                                    variant="danger"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleDelete(history._id);
                                    }}
                                >
                                    Excluir
                                </Button>
                            </div>
                        </div>
                    ))
                }

            </div>
        </div>
    )
}

export default History

function formatarData(data) {
    const selectedDate = new Date(data + 'T00:00:00'); // A'T00:00:00' para especificar a hora como meia-noite (00:00:00)
    selectedDate.setUTCHours(0, 0, 0, 0); // horário UTC para evitar problemas de fuso horário

    const day = selectedDate.getUTCDate().toString().padStart(2, '0');
    const month = (selectedDate.getUTCMonth() + 1).toString().padStart(2, '0');
    const year = selectedDate.getUTCFullYear();

    return `${day}/${month}/${year}`;
}



