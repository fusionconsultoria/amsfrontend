import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Message from '../../components/Message/Message';
import { getNote, updateNote, resetMessage } from "../../slices/noteSlice"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Modulo } from "../../components/Modulo/Modulo";


const Editar = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { note, loading, error, message } = useSelector(
    (state) => state.note
  );

  const navigate = useNavigate();

  // Load note data
  useEffect(() => {
    dispatch(getNote(id));
  }, [dispatch, id]);

  const [formData, setFormData] = useState({
    origemSolicitacao: '',
    termoBusca: '',
    processoNegocio: '',
    ...note, // Preencher com dados de chamadoData, se disponível
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Função para atualizar o valor do "Processo de Negócio" no estado do formulário
  const handleProcessoNegocioChange = (selectedValue) => {
    setFormData({
      ...formData,
      processoNegocio: selectedValue
    });
  };

  useEffect(() => {
    if (note) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        ...note,
      }));
    }
  }, [note]);

  // Reset component message
  function resetComponentMessage() {
    setTimeout(() => {
      dispatch(resetMessage());
    }, 2000);
  }


  const handleUpdate = (e) => {

    e.preventDefault();

    dispatch(updateNote(formData));

    resetComponentMessage();

    navigate('/')
  }


  if (loading) {
    return <p>Carregando...</p>;
  }


  return (<div className="new-post">
    <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>{formData.idChamado} - {formData.titulo}</h2>
    <Form onSubmit={handleUpdate}>
      <>
        <Container>
          <div>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="idChamado">
                  <Form.Label>N° do chamado:</Form.Label>
                  <Form.Control
                    type="text"
                    name="idChamado"
                    readOnly
                    value={(formData && formData.idChamado) || ''}
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
                    readOnly
                    value={(formData && formData.titulo) || ''}
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
                    readOnly
                    value={(formData && formData.modulo) || ''}
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
                    readOnly
                    value={(formData && formData.solicitacao) || ''}
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
                    readOnly
                    value={(formData && formData.prioridade) || ''}
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
                    name="empresa"
                    readOnly
                    value={(formData && formData.cliente) || ''}
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
                    readOnly
                    value={(formData && formData.consultor) || ''}
                    className='border-input'
                  />
                </Form.Group>
              </Col>
            </Row>
          </div>
        </Container>
      </>
      {formData && formData.solicitacao === "Melhoria" && (
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
                      name="origemSolicitacao"
                      value={(formData && formData.origemSolicitacao) || ''}
                      onChange={handleInputChange}
                      className='textarea-input'
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group className="mb-3" controlId="processoNegocio">
                    <Form.Label>Processo de Negócio:</Form.Label>
                    <Modulo
                      onOptionChange={handleProcessoNegocioChange} // Passe a função de retorno de chamada
                      currentProcessoNegocio={formData.processoNegocio} // Passe o valor atual do "Processo de Negócio"
                    />
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
                      name="descricaoFuncional"
                      value={(formData && formData.descricaoFuncional) || ''}
                      className='textarea-input-large'
                      onChange={handleInputChange}
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
                      name="referenciaFt"
                      value={(formData && formData.referenciaFt) || ''}
                      className='textarea-input'
                      onChange={handleInputChange}
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
                      name="cutover"
                      value={(formData && formData.cutover) || ''}
                      className='textarea-input-large'
                      onChange={handleInputChange}
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
                      name="termoBusca"
                      value={(formData && formData.termoBusca) || ''}
                      onChange={handleInputChange}
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
                      name="request"
                      value={(formData && formData.request) || ''}
                      className='textarea-input'
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </div>
          </Container>
        </>
      )}


      {formData && formData.solicitacao === "Problema" && (
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
                      name="definicaoProblema"
                      value={(formData && formData.definicaoProblema) || ''}
                      className='textarea-input'
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group className="mb-3" controlId="processoNegocio">
                    <Form.Label>Processo de Negócio:</Form.Label>
                    <Modulo
                      onOptionChange={handleProcessoNegocioChange} // Passe a função de retorno de chamada
                      currentProcessoNegocio={formData.processoNegocio} // Passe o valor atual do "Processo de Negócio"
                    />
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
                      name="reproducaoProblema"
                      value={(formData && formData.reproducaoProblema) || ''}
                      className='textarea-input'
                      onChange={handleInputChange}
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
                      name="causaProblema"
                      value={(formData && formData.causaProblema) || ''}
                      className='textarea-input'
                      onChange={handleInputChange}
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
                      name="alternativaSolucao"
                      value={(formData && formData.alternativaSolucao) || ''}
                      className='textarea-input'
                      onChange={handleInputChange}
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
                      name="pedidoMelhoria"
                      value={(formData && formData.pedidoMelhoria) || ''}
                      className='textarea-input'
                      onChange={handleInputChange}
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
                      name="termoBusca"
                      value={(formData && formData.termoBusca) || ''}
                      className='textarea-input'
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </div>
          </Container>
        </>
      )}

      {formData && formData.solicitacao === "Dúvida" && (
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
                      value={(formData && formData.duvida) || ''}
                      className='textarea-input'
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group className="mb-3" controlId="processoNegocio">
                    <Form.Label>Processo de Negócio:</Form.Label>
                    <Modulo
                      onOptionChange={handleProcessoNegocioChange} // Passe a função de retorno de chamada
                      currentProcessoNegocio={formData.processoNegocio} // Passe o valor atual do "Processo de Negócio"
                    />
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
                      value={(formData && formData.reproducaoProcesso) || ''}
                      className='textarea-input'
                      onChange={handleInputChange}
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
                      value={(formData && formData.esclarecimentoDuvida) || ''}
                      className='textarea-input'
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group className="mb-3" controlId="termoBusca">
                    <Form.Label>ETermos de Busca / Transações Envolvidas / Nº da Mensagem:</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      type="text"
                      name="termoBusca"
                      value={(formData && formData.termoBusca) || ''}
                      className='textarea-input'
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </div>
          </Container>
        </>
      )}


      {formData && formData.solicitacao === "Erro/Incidente" && (
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
                      value={(formData && formData.sintomas) || ''}
                      className='textarea-input-large'
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group className="mb-3" controlId="processoNegocio">
                    <Form.Label>Processo de Negócio:</Form.Label>
                    <Modulo
                      onOptionChange={handleProcessoNegocioChange} 
                      currentProcessoNegocio={formData.processoNegocio} 
                    />
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
                      value={(formData && formData.reproducaoErro) || ''}
                      className='textarea-input'
                      onChange={handleInputChange}
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
                      value={(formData && formData.causaProblema) || ''}
                      className='textarea-input-large'
                      onChange={handleInputChange}
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
                      value={(formData && formData.descricaoSolucao) || ''}
                      className='textarea-input-large'
                      onChange={handleInputChange}
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
                      value={(formData && formData.configuracoesExecutadas) || ''}
                      className='textarea-input'
                      onChange={handleInputChange}
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
                      value={(formData && formData.termoBusca) || ''}
                      className='textarea-input'
                      onChange={handleInputChange}
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
                      value={(formData && formData.objetosAbap) || ''}
                      className='textarea-input'
                      onChange={handleInputChange}
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
                      value={(formData && formData.request) || ''}
                      className='textarea-input'
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </div>
          </Container>
        </>
      )}
      <div className="container-btn" style={{ marginBottom: '1rem', marginLeft: '0.5rem', marginRight: '0.5rem' }} >
        <div className="row">
          <div className="col">
            <Button id='criar' variant="secondary" size="lg" type="submit" style={{ width: '100%' }} href={`/history/${formData._id}`}>
              Reuniões e analises
            </Button>
          </div>
          {!loading && (
            <div className="col">
              <Button id='editar' variant="warning" size="lg" type="submit" style={{ width: '100%' }}>
                Editar
              </Button>
            </div>
          )}
          {loading && (
            <div className="col">
              <Button variant="warning" size="lg" type="submit" disabled style={{ width: '100%' }}>
                Aguarde...
              </Button>
            </div>
          )}
        </div>
        {error && <Message msg={error} type="error" />}
        {message && <Message msg={message} type="success" />}
      </div>

    </Form>
  </div>
  );
}


export default Editar