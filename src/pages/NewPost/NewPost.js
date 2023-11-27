import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { publishNote, resetMessage } from '../../slices/noteSlice';
import Message from '../../components/Message/Message';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Modulo } from "../../components/Modulo/Modulo";

const NewPost = () => {
    const dispatch = useDispatch();

    const {
        loading: loadingNote,
        error: errorNote,
        message: messageNote,
    } = useSelector((state) => state.note);

    const [idChamado, setIdChamado] = useState("");
    const [chamado, setChamado] = useState({
        idcamposvariaveis_775: "",
        problema: "",
        cliente_nome: "",
        area: "",
        prioridade_desc: "",
        operador_responsavel: "",
    });

    const [titulo, setTitulo] = useState("");
    const [modulo, setModulo] = useState("");
    const [cliente, setCliente] = useState("");
    const [consultor, setConsultor] = useState("");
    const [solicitacao, setSolicitacao] = useState("");
    const [origemSolicitacao, setOrigemSolicitacao] = useState("");
    const [termoBusca, setTermoBusca] = useState("");
    const [processoNegocio, setProcessoNegocio] = useState("");
    const [descricaoFuncional, setDescricaoFuncional] = useState("");
    const [referenciaFt, setReferenciaFt] = useState("");
    const [cutover, setCutover] = useState("");
    const [request, setRequest] = useState("");
    const [definicaoProblema, setDefinicaoProblema] = useState("");
    const [causaProblema, setCausaProblema] = useState("");
    const [alternativaSolucao, setAlternativaSolucao] = useState("");
    const [pedidoMelhoria, setPedidoMelhoria] = useState("");
    const [reproducaoProcesso, setReproducaoProcesso] = useState("");
    const [esclarecimentoDuvida, setEsclarecimentoDuvida] = useState("");
    const [prioridade, setPrioridade] = useState("");
    const [reproducaoProblema, setReproducaoProblema] = useState("");
    const [duvida, setDuvida] = useState("");
    const [reproducaoErro, setReproducaoErro] = useState("");
    const [descricaoSolucao, setDescricaoSolucao] = useState("");
    const [configuracoesExecutadas, setConfiguracoesExecutadas] = useState("");
    const [objetosAbap, setObjetosAbap] = useState("");
    const [sintomas, setSintomas] = useState("");


    const handleChamadoChange = (event) => {
        setIdChamado(event.target.value);
    };

    const getDados = async (idChamado) => {
        const vmultiUrl = (process.env.REACT_APP_VMULTI_API);
        const vmultiKey = (process.env.REACT_APP_SENHA_WS);
        const vmultiUser = (process.env.REACT_APP_USUARIO_WS);
        const url = `${vmultiUrl}&campos_dinamicos={"numeros":${idChamado},"senha_ws":"${vmultiKey}", "usuario_ws":"${vmultiUser}"}&return_dinamicos={"dados":["apenas_data_abertura","cliente_nome","area","numero","prioridade_desc","operador_responsavel","problema", "idcamposvariaveis_775"]}`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            if (data && data.length > 0) {
                setChamado(data[0]);
                setTitulo(data[0].idcamposvariaveis_775);
                setModulo(data[0].area);
                setCliente(data[0].cliente_nome);
                setConsultor(data[0].operador_responsavel);
                setSolicitacao(data[0].problema);
                setPrioridade(data[0].prioridade_desc);
            } else {
                console.error('Nenhum dado retornado da API');
            }
        } catch (error) {
            console.error('Erro ao obter dados da API:', error);
        }

    };

    useEffect(() => {
        if (idChamado) {
            getDados(idChamado);
        }
    }, [idChamado]);

    // Reset component message
    function resetComponentMessage() {
        setTimeout(() => {
            dispatch(resetMessage());
        }, 2000);
    }

    const handleProcessoNegocioChange = (value) => {
        setProcessoNegocio(value);
    }


    const onSubmit2 = (e) => {

        e.preventDefault();

        const noteData = {

            idChamado,
            titulo,
            modulo,
            cliente,
            consultor,
            solicitacao,
            prioridade,

            origemSolicitacao,
            termoBusca,
            processoNegocio,
            descricaoFuncional,
            referenciaFt,
            cutover,
            request,

            
            definicaoProblema,
            causaProblema,
            alternativaSolucao,
            pedidoMelhoria,
            reproducaoProblema,

            sintomas,
            reproducaoProcesso,
            esclarecimentoDuvida,
            duvida,
            reproducaoErro,
            descricaoSolucao,
            configuracoesExecutadas,
            objetosAbap,
        };

        dispatch(publishNote(noteData));

        resetComponentMessage();

        setTimeout(() => {
            e.target.reset();
        }, 3000);

    }

    return (
        <>
            <div className="new-post">
                <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>Criar Note</h2>
                <Form onSubmit={onSubmit2}>
                    <Container>
                        <div>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3" controlId="idChamado">
                                        <Form.Label>N° do chamado:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="idChamado"
                                            placeholder='Digite o N° do chamado que deseja criar o documento'
                                            value={idChamado}
                                            onChange={handleChamadoChange}
                                            className='border-input'
                                        />
                                    </Form.Group>
                                </Col>
                                <Col xs={7}>
                                    <Form.Group className="mb-3" controlId="titulo">
                                        <Form.Label>Título:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="titulo"
                                            placeholder="Digite o titulo"
                                            readOnly
                                            value={chamado ? chamado.idcamposvariaveis_775 : ''}
                                            className='border-input'
                                        />

                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3" controlId="modulo">
                                        <Form.Label>Módulo/Submódulo:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="modulo"
                                            placeholder="Digite o Módulo/Submódulo"
                                            value={chamado ? chamado.area : ''}
                                            readOnly
                                            className='border-input'
                                        />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3" controlId="solicitacao">
                                        <Form.Label>Solicitação:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="solicitacao"
                                            placeholder="Digite a solicitação"
                                            readOnly
                                            value={chamado ? chamado.problema : ''}
                                            onChange={(e) => setSolicitacao(e)}
                                            className='border-input'
                                        />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3" controlId="prioridade">
                                        <Form.Label>Prioridade:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="prioridade"
                                            placeholder="Digite a prioridade"
                                            value={chamado ? chamado.prioridade_desc : ''}
                                            readOnly
                                            className='border-input'
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3" controlId="empresa">
                                        <Form.Label>Empresa:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="cliente"
                                            placeholder="Digite a empresa"
                                            readOnly
                                            value={chamado ? chamado.cliente_nome : ''}
                                            className='border-input'
                                        />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3" controlId="consultor">
                                        <Form.Label>Consultor responsável:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="consultor"
                                            placeholder="Digite a consultor"
                                            value={chamado ? chamado.operador_responsavel : ''}
                                            readOnly
                                            className='border-input'
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                        </div>
                    </Container>
                    {chamado && chamado.problema === 'Melhoria' && (
                        <>
                            <>
                                <Container>
                                    <div>
                                        <Row>
                                            <Col>
                                                <Form.Group className="mb-3" controlId="origemSolicitacao">
                                                    <Form.Label>Origem da Solicitação de Melhoria:</Form.Label>
                                                    <Form.Control
                                                        as="textarea"
                                                        rows={3}
                                                        type="text"
                                                        name="origemSolicitacao"
                                                        placeholder='Digite a origem da solicitação de melhoria'
                                                        onChange={(e) => setOrigemSolicitacao(e.target.value)}
                                                        className='textarea-input'
                                                    />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <Form.Group className="mb-3" controlId="processoNegocio">
                                                    <Form.Label>Processo de Negócio:</Form.Label>
                                                    <Modulo onOptionChange={handleProcessoNegocioChange} />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <Form.Group className="mb-3" controlId="descricaoFuncional">
                                                    <Form.Label>Descrição Funcional da Melhoria:</Form.Label>
                                                    <Form.Control
                                                        as="textarea"
                                                        rows={3}
                                                        type="text"
                                                        name="descricaoFuncional"
                                                        placeholder='Digite a descrição funcional da melhoria'
                                                        onChange={(e) => setDescricaoFuncional(e.target.value)}
                                                        className='textarea-input-large'
                                                    />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <Form.Group className="mb-3" controlId="referenciaFt">
                                                    <Form.Label>Referência a Especificação Funcional e Técnica:</Form.Label>
                                                    <Form.Control
                                                        as="textarea"
                                                        rows={3}
                                                        type="text"
                                                        name="referenciaFt"
                                                        placeholder='Digite a referência a especificação funcional e técnica'
                                                        onChange={(e) => setReferenciaFt(e.target.value)}
                                                        className='textarea-input'
                                                    />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <Form.Group className="mb-3" controlId="cutover">
                                                    <Form.Label>Plano de Cutover:</Form.Label>
                                                    <Form.Control
                                                        as="textarea"
                                                        rows={3}
                                                        type="text"
                                                        name="cutover"
                                                        placeholder='Digite o plano de cutover'
                                                        onChange={(e) => setCutover(e.target.value)}
                                                        className='textarea-input-large'
                                                    />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <Form.Group className="mb-3" controlId="termoBusca">
                                                    <Form.Label>Termos de Busca / Transações Envolvidas / Nº da Mensagem:</Form.Label>
                                                    <Form.Control
                                                        as="textarea"
                                                        rows={3}
                                                        type="text"
                                                        name="termoBusca"
                                                        placeholder='Digite a termo de busca / transações envolvidas / nº da mensagem'
                                                        onChange={(e) => setTermoBusca(e.target.value)}
                                                        className='textarea-input'
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col>
                                                <Form.Group className="mb-3" controlId="request">
                                                    <Form.Label>Request:</Form.Label>
                                                    <Form.Control
                                                        as="textarea"
                                                        rows={3}
                                                        type="text"
                                                        name="request"
                                                        placeholder='Digite o request'
                                                        onChange={(e) => setRequest(e.target.value)}
                                                        className='textarea-input'
                                                    />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </div>
                                </Container>
                            </>
                        </>
                    )}
                    {chamado && chamado.problema === 'Problema' && (
                        <>
                            <>
                                <Container>
                                    <div>
                                        <Row>
                                            <Col>
                                                <Form.Group className="mb-3" controlId="definicaoProblema">
                                                    <Form.Label>Definição do Problema:</Form.Label>
                                                    <Form.Control
                                                        as="textarea"
                                                        rows={3}
                                                        type="text"
                                                        name="definicaoProblema"
                                                        placeholder='Digite a definição do problema'
                                                        onChange={(e) => setDefinicaoProblema(e.target.value)}
                                                        className='textarea-input'
                                                    />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <Form.Group className="mb-3" controlId="processoNegocio">
                                                    <Form.Label>Processo de Negócio:</Form.Label>
                                                    <Modulo onOptionChange={handleProcessoNegocioChange} />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <Form.Group className="mb-3" controlId="reproducaoProblema">
                                                    <Form.Label>Reprodução do Problema:</Form.Label>
                                                    <Form.Control
                                                        as="textarea"
                                                        rows={3}
                                                        type="text"
                                                        name="reproducaoProblema"
                                                        placeholder='Digite a reprodução do problema'
                                                        onChange={(e) => setReproducaoProblema(e.target.value)}
                                                        className='textarea-input'
                                                    />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <Form.Group className="mb-3" controlId="causaProblema">
                                                    <Form.Label>Possíveis Causas do Problema:</Form.Label>
                                                    <Form.Control
                                                        as="textarea"
                                                        rows={3}
                                                        type="text"
                                                        name="causaProblema"
                                                        placeholder='Digite a possível causa do problema'
                                                        onChange={(e) => setCausaProblema(e.target.value)}
                                                        className='textarea-input-large'
                                                    />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <Form.Group className="mb-3" controlId="alternativaSolucao">
                                                    <Form.Label>Alternativas de Solução Possíveis:</Form.Label>
                                                    <Form.Control
                                                        as="textarea"
                                                        rows={3}
                                                        type="text"
                                                        name="alternativaSolucao"
                                                        placeholder='Digite a alternativa de solução possível'
                                                        onChange={(e) => setAlternativaSolucao(e.target.value)}
                                                        className='textarea-input'
                                                    />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <Form.Group className="mb-3" controlId="pedidoMelhoria">
                                                    <Form.Label>Pedidos de Melhorias Abertas Após Análise:</Form.Label>
                                                    <Form.Control
                                                        as="textarea"
                                                        rows={3}
                                                        type="text"
                                                        name="pedidoMelhoria"
                                                        placeholder='Digite o pedido de melhoria aberto após análise'
                                                        onChange={(e) => setPedidoMelhoria(e.target.value)}
                                                        className='textarea-input'
                                                    />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <Form.Group className="mb-3" controlId="termoBusca">
                                                    <Form.Label>Termos de Busca / Transações Envolvidas / Nº da Mensagem:</Form.Label>
                                                    <Form.Control
                                                        as="textarea"
                                                        rows={3}
                                                        type="text"
                                                        name="termoBusca"
                                                        placeholder='Digite a termo de busca / transações envolvidas / nº da mensagem'
                                                        onChange={(e) => setTermoBusca(e.target.value)}
                                                        className='textarea-input'
                                                    />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </div>
                                </Container>
                            </>
                        </>
                    )}
                    {chamado && chamado.problema === 'Dúvida' && (
                        <>
                            <Container>
                                <div>
                                    <Row>
                                        <Col>
                                            <Form.Group className="mb-3" controlId="duvida">
                                                <Form.Label>Dúvida:</Form.Label>
                                                <Form.Control
                                                    as="textarea"
                                                    rows={3}
                                                    type="text"
                                                    name="duvida"
                                                    placeholder='Digite a dúvida'
                                                    onChange={(e) => setDuvida(e.target.value)}
                                                    className='textarea-input'
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Form.Group className="mb-3" controlId="processoNegocio">
                                                <Form.Label>Processo de Negócio:</Form.Label>
                                                <Modulo onOptionChange={handleProcessoNegocioChange} />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Form.Group className="mb-3" controlId="reproducaoProcesso">
                                                <Form.Label>Reprodução do Processo:</Form.Label>
                                                <Form.Control
                                                    as="textarea"
                                                    rows={3}
                                                    type="text"
                                                    name="reproducaoProcesso"
                                                    placeholder='Digite a reprodução do processo'
                                                    onChange={(e) => setReproducaoProcesso(e.target.value)}
                                                    className='textarea-input'
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Form.Group className="mb-3" controlId="esclarecimentoDuvida">
                                                <Form.Label>Esclarecimento da Dúvida:</Form.Label>
                                                <Form.Control
                                                    as="textarea"
                                                    rows={3}
                                                    type="text"
                                                    name="esclarecimentoDuvida"
                                                    placeholder='Digite o esclarecimento da dúvida'
                                                    onChange={(e) => setEsclarecimentoDuvida(e.target.value)}
                                                    className='textarea-input'
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Form.Group className="mb-3" controlId="termoBusca">
                                                <Form.Label>Termos de Busca / Transações Envolvidas / Nº da Mensagem:</Form.Label>
                                                <Form.Control
                                                    as="textarea"
                                                    rows={3}
                                                    type="text"
                                                    name="termoBusca"
                                                    placeholder='Digite a termo de busca / transações envolvidas / nº da mensagem'
                                                    onChange={(e) => setTermoBusca(e.target.value)}
                                                    className='textarea-input'
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </div>
                            </Container>
                        </>
                    )}

                    {chamado && chamado.problema === 'Erro/Incidente' && (
                        <>
                            <Container>
                                <div>
                                    <Row>
                                        <Col>
                                            <Form.Group className="mb-3" controlId="sintomas">
                                                <Form.Label>Sintomas:</Form.Label>
                                                <Form.Control
                                                    as="textarea"
                                                    rows={3}
                                                    type="text"
                                                    name="sintomas"
                                                    placeholder='Digite os sintomas'
                                                    onChange={(e) => setSintomas(e.target.value)}
                                                    className='textarea-input-large'
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Form.Group className="mb-3" controlId="processoNegocio">
                                                <Form.Label>Processo de Negócio:</Form.Label>
                                                <Modulo onOptionChange={handleProcessoNegocioChange} />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Form.Group className="mb-3" controlId="reproducaoErro">
                                                <Form.Label>Reprodução do Erro:</Form.Label>
                                                <Form.Control
                                                    as="textarea"
                                                    rows={3}
                                                    type="text"
                                                    name="reproducaoErro"
                                                    placeholder='Digite a reprodução do erro'
                                                    onChange={(e) => setReproducaoErro(e.target.value)}
                                                    className='textarea-input'
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Form.Group className="mb-3" controlId="causaProblema">
                                                <Form.Label>Causa do Problema:</Form.Label>
                                                <Form.Control
                                                    as="textarea"
                                                    rows={3}
                                                    type="text"
                                                    name="causaProblema"
                                                    placeholder='Digite a causa do problema'
                                                    onChange={(e) => setCausaProblema(e.target.value)}
                                                    className='textarea-input-large'
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Form.Group className="mb-3" controlId="descricaoSolucao">
                                                <Form.Label>Descrição da Solução:</Form.Label>
                                                <Form.Control
                                                    as="textarea"
                                                    rows={3}
                                                    type="text"
                                                    name="descricaoSolucao"
                                                    placeholder='Digite a descrição da solução'
                                                    onChange={(e) => setDescricaoSolucao(e.target.value)}
                                                    className='textarea-input-large'
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Form.Group className="mb-3" controlId="configuracoesExecutadas">
                                                <Form.Label>Configurações Executadas:</Form.Label>
                                                <Form.Control
                                                    as="textarea"
                                                    rows={3}
                                                    type="text"
                                                    name="configuracoesExecutadas"
                                                    placeholder='Digite as configurações executadas'
                                                    onChange={(e) => setConfiguracoesExecutadas(e.target.value)}
                                                    className='textarea-input'
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Form.Group className="mb-3" controlId="termoBusca">
                                                <Form.Label>Termos de Busca / Transações / Mensagens:</Form.Label>
                                                <Form.Control
                                                    as="textarea"
                                                    rows={3}
                                                    type="text"
                                                    name="termoBusca"
                                                    placeholder='Digite a termo de busca / transações envolvidas / nº da mensagem'
                                                    onChange={(e) => setTermoBusca(e.target.value)}
                                                    className='textarea-input'
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group className="mb-3" controlId="objetosAbap">
                                                <Form.Label>Objetos ABAP criados/alterados:</Form.Label>
                                                <Form.Control
                                                    as="textarea"
                                                    rows={3}
                                                    type="text"
                                                    name="objetosAbap"
                                                    placeholder='Digite os objetos ABAP'
                                                    onChange={(e) => setObjetosAbap(e.target.value)}
                                                    className='textarea-input'
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group className="mb-3" controlId="request">
                                                <Form.Label>Request:</Form.Label>
                                                <Form.Control
                                                    as="textarea"
                                                    rows={3}
                                                    type="text"
                                                    name="request"
                                                    placeholder='Digite o request'
                                                    onChange={(e) => setRequest(e.target.value)}
                                                    className='textarea-input'
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </div>
                            </Container>
                        </>
                    )}
                    {!loadingNote &&
                        <div className="d-grid gap-2" style={{ marginBottom: '1.5rem' }}>
                            <Button id='criar' variant="warning" size="lg" type="submit"
                                style={{ width: '40%', margin: '0 auto' }}
                            >
                                Criar
                            </Button>
                        </div>
                    }
                    {loadingNote && (
                        <div className="d-grid gap-2" style={{ marginBottom: '1.5rem' }}>
                            <Button variant="warning" size="lg" type="submit" disabled
                                style={{ width: '40%', margin: '0 auto' }}
                            >
                                Aguarde...
                            </Button>
                        </div>
                    )}
                    {errorNote && <Message msg={errorNote} type="error" />}
                    {messageNote && <Message msg={messageNote} type="success" />}
                </Form>
            </div>
        </>
    );
};

export default NewPost;



