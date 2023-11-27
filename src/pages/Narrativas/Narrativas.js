import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getHistory } from '../../slices/historySlice'
import 'bootstrap/dist/css/bootstrap.min.css';

function History() {

    const { id } = useParams();

    const dispatch = useDispatch();

    const { histories } = useSelector(
        (state) => state.history
    );

    // Load note data
    useEffect(() => {
        dispatch(getHistory(id));
    }, [dispatch, id]);



    return (
        <div className="history" >
            <div className="dashboard">
                <h2>Dashboard</h2>
                {histories && histories.length === 0 ? (
                    <div className="noposts">
                        <p>Não foram encontrados reuniões e/ou analises</p>
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
                        </div>
                    ))
                }

            </div>
        </div>
    )
}

export default History




