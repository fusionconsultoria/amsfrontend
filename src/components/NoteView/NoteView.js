import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

const NoteView = ({ note }) => {
    return (
        <div>
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
                                    value={(note && note.idChamado) || ''}
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
                                    value={(note && note.titulo) || ''}
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
                                    value={(note && note.modulo) || ''}
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
                                    value={(note && note.solicitacao) || ''}
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
                                    value={(note && note.prioridade) || ''}
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
                                    value={(note && note.cliente) || ''}
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
                                    value={(note && note.consultor) || ''}
                                    className='border-input'
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                </div>
            </Container>
            {note && note.solicitacao === 'Melhoria' && (
                <>
                    <Container>
                        <div>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3" controlId="origemSolicitacao">
                                        <Form.Label>Origem da Solicitação de Melhoria:</Form.Label>
                                        <p className="bordered-paragraph">{(note && note.origemSolicitacao) || ''}</p>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3" controlId="processoNegocio">
                                        <Form.Label>Processo de Negócio:</Form.Label>
                                        <p className="bordered-paragraph">{(note && note.processoNegocio) || ''}</p>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3" controlId="descricaoFuncional">
                                        <Form.Label>Descrição Funcional da Melhoria:</Form.Label>
                                        <p className='bordered-paragraph'>{(note && note.descricaoFuncional) || ''}</p>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3" controlId="referenciaFt">
                                        <Form.Label>Referência a Especificação Funcional e Técnica:</Form.Label>
                                        <p className='bordered-paragraph'>{(note && note.referenciaFt) || ''}</p>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3" controlId="cutover">
                                        <Form.Label>Plano de Cutover:</Form.Label>
                                        <p className='bordered-paragraph'>{(note && note.cutover) || ''}</p>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3" controlId="termoBusca">
                                        <Form.Label>Termos de Busca / Transações / Mensagem:</Form.Label>
                                        <p className='bordered-paragraph'>{(note && note.termoBusca) || ''}</p>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3" controlId="termoBusca">
                                        <Form.Label>Request:</Form.Label>
                                        <p className='bordered-paragraph'>{(note && note.request) || ''}</p>
                                    </Form.Group>
                                </Col>
                            </Row>
                        </div>
                    </Container>
                </>)}
            {note && note.solicitacao === 'Problema' && (
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
                                            value={(note && note.definicaoProblema) || ''}
                                            className='textarea-input'
                                            readOnly
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3" controlId="processoNegocio">
                                        <Form.Label>Processo de Negócio:</Form.Label>
                                        <p className='bordered-paragraph'>{(note && note.processoNegocio) || ''}</p>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3" controlId="reproducaoProblema">
                                        <Form.Label>Reprodução do Problema:</Form.Label>
                                        <p className='bordered-paragraph'>{(note && note.reproducaoProblema) || ''}</p>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3" controlId="causaProblema">
                                        <Form.Label>Possíveis Causas do Problema:</Form.Label>
                                        <p className='bordered-paragraph'>{(note && note.causaProblema) || ''}</p>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3" controlId="alternativaSolucao">
                                        <Form.Label>Alternativas de Solução Possíveis:</Form.Label>
                                        <p className='bordered-paragraph'>{(note && note.alternativaSolucao) || ''}</p>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3" controlId="pedidoMelhoria">
                                        <Form.Label>Pedidos de Melhorias Abertas Após Análise:</Form.Label>
                                        <p className='bordered-paragraph'>{(note && note.pedidoMelhoria) || ''}</p>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3" controlId="termoBusca">
                                        <Form.Label>Termos de Busca / Transações Envolvidas / Nº da Mensagem:</Form.Label>
                                        <p className='bordered-paragraph'>{(note && note.termoBusca) || ''}</p>
                                    </Form.Group>
                                </Col>
                            </Row>
                        </div>
                    </Container>
                </>)}
            {note && note.solicitacao === 'Dúvida' && (
                <>
                    <Container>
                        <div>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3" controlId="duvida">
                                        <Form.Label>Dúvida:</Form.Label>
                                        <p className='bordered-paragraph'>{(note && note.duvida) || ''}</p>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3" controlId="processoNegocio">
                                        <Form.Label>Processo de Negócio:</Form.Label>
                                        <p className='bordered-paragraph'>{(note && note.processoNegocio) || ''}</p>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3" controlId="reproducaoProcesso">
                                        <Form.Label>Reprodução do Processo:</Form.Label>
                                        <p className='bordered-paragraph'>{(note && note.reproducaoProcesso) || ''}</p>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3" controlId="esclarecimentoDuvida">
                                        <Form.Label>Esclarecimento da Dúvida:</Form.Label>
                                        <p className='bordered-paragraph'>{(note && note.esclarecimentoDuvida) || ''}</p>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3" controlId="termoBusca">
                                        <Form.Label>Termos de Busca / Transações Envolvidas / Nº da Mensagem:</Form.Label>
                                        <p className='bordered-paragraph'>{(note && note.termoBusca) || ''}</p>
                                    </Form.Group>
                                </Col>
                            </Row>
                        </div>
                    </Container>
                </>
            )}

            {note && note.solicitacao === 'Erro/Incidente' && (
                <>
                    <Container>
                        <div>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3" controlId="sintomas">
                                        <Form.Label>Sintomas:</Form.Label>
                                        <p className='bordered-paragraph'>{(note && note.sintomas) || ''}</p>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3" controlId="processoNegocio">
                                        <Form.Label>Processo de Negócio:</Form.Label>
                                        <p className='bordered-paragraph'>{(note && note.processoNegocio) || ''}</p>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3" controlId="reproducaoErro">
                                        <Form.Label>Reprodução do Erro:</Form.Label>
                                        <p className='bordered-paragraph'>{(note && note.reproducaoErro) || ''}</p>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3" controlId="causaProblema">
                                        <Form.Label>Causa do Problema:</Form.Label>
                                        <p className='bordered-paragraph'>{(note && note.causaProblema) || ''}</p>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3" controlId="descricaoSolucao">
                                        <Form.Label>Descrição da Solução:</Form.Label>
                                        <p className='bordered-paragraph'>{(note && note.descricaoSolucao) || ''}</p>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3" controlId="configuracoesExecutadas">
                                        <Form.Label>Configurações Executadas:</Form.Label>
                                        <p className='bordered-paragraph'>{(note && note.configuracoesExecutadas) || ''}</p>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3" controlId="termoBusca">
                                        <Form.Label>Termos de Busca / Transações / Mensagem:</Form.Label>
                                        <p className='bordered-paragraph'>{(note && note.termoBusca) || ''}</p>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3" controlId="objetosAbap">
                                        <Form.Label>Objetos ABAP criados/alterados:</Form.Label>
                                        <p className='bordered-paragraph'>{(note && note.objetosAbap) || ''}</p>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3" controlId="request">
                                        <Form.Label>Request:</Form.Label>
                                        <p className='bordered-paragraph'>{(note && note.request) || ''}</p>
                                    </Form.Group>
                                </Col>
                            </Row>
                        </div>
                    </Container>
                </>
            )}</div>
    )
}

export default NoteView