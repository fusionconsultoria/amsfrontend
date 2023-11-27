import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { publishModulo, resetMessage, resetError } from '../../slices/moduloSlice';
import Message from '../Message/Message';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { MdAdd } from 'react-icons/md';
import { publishSubmodulo } from "../../slices/submoduloSlice";
import { publishProcessoNegocio } from "../../slices/processoNegocioSlice";

export const ModalPost = ({ data }) => {
    const dispatch = useDispatch();

    const [show, setShow] = useState(false);
    const [nome, setNome] = useState('');

    const {
        loading: loadingModulo,
        error: errorModulo,
        message: messageModulo,
    } = useSelector((state) => state.modulo);

    const {
        loading: loadingSubmodulo,
        error: errorSubmodulo,
        message: messageSubmodulo,
    } = useSelector((state) => state.submodulo);

    const {
        loading: loadingProcessoNegocio,
        error: errorProcessoNegocio,
        message: messageProcessoNegocio,
    } = useSelector((state) => state.processoNegocio);

    function resetComponentMessage() {
        setTimeout(() => {
            dispatch(resetMessage());
            dispatch(resetError());
        }, 3000);
    }

    const handleClose = () => {
        setShow(false);
        resetComponentMessage();
    }

    const handleShow = () => setShow(true);

    const onSubmit1 = async (e) => {
        e.preventDefault();

        if (data && data.tipo === 'submodulo') {
            const infoData = {
                nome,
                moduloId: data.id
            };

            try {

                console.log(infoData);

                dispatch(publishSubmodulo(infoData));

                setNome('');

                resetComponentMessage();

                setTimeout(() => {
                    handleClose();
                }, 4000);

            } catch (error) {
                console.log(error);
            }

        } else if (data && data.tipo === 'processoNegocio') {

            const infoData = {
                nome,
                submoduloId: data.id
            };

            try {

                dispatch(publishProcessoNegocio(infoData));

                setNome('');

                resetComponentMessage();

                setTimeout(() => {
                    handleClose();
                }, 4000);

            } catch (error) {
                console.log(error);
            }

        } else {

            const infoData = {
                nome,
            };

            try {

                dispatch(publishModulo(infoData));

                setNome('');

                resetComponentMessage();

                setTimeout(() => {
                    handleClose();
                }, 4000);

            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <div style={{ margin: '0' }}>
            <Button variant="warning" onClick={handleShow}>
                <MdAdd size={20} />
            </Button>


            <Modal show={show} onHide={handleClose}>
                <Form onSubmit={onSubmit1}>
                    <Modal.Header closeButton>
                        <Modal.Title>Novo</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Módulo/Submódulo/Processo de negócio</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Digite módulo/submódulo/processo de negócio"
                                autoFocus
                                value={nome || ''}
                                onChange={(e) => setNome(e.target.value)}
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Fechar
                        </Button>
                        <Button variant="primary" type="submit">
                            Salvar
                        </Button>
                        {loadingModulo && (
                            <div className="d-grid gap-2" style={{ marginBottom: '1.5rem' }}>
                                <Button variant="warning" size="lg" type="submit" disabled
                                    style={{ width: '40%', margin: '0 auto' }}
                                >
                                    Aguarde...
                                </Button>
                            </div>
                        )}
                        {loadingSubmodulo && (
                            <div className="d-grid gap-2" style={{ marginBottom: '1.5rem' }}>
                                <Button variant="warning" size="lg" type="submit" disabled
                                    style={{ width: '40%', margin: '0 auto' }}
                                >
                                    Aguarde...
                                </Button>
                            </div>
                        )}
                        {loadingProcessoNegocio && (
                            <div className="d-grid gap-2" style={{ marginBottom: '1.5rem' }}>
                                <Button variant="warning" size="lg" type="submit" disabled
                                    style={{ width: '40%', margin: '0 auto' }}
                                >
                                    Aguarde...
                                </Button>
                            </div>
                        )}

                        {errorModulo && <Message msg={errorModulo} type="error" />}
                        {errorSubmodulo && <Message msg={errorSubmodulo} type="error" />}
                        {errorProcessoNegocio && <Message msg={errorProcessoNegocio} type="error" />}

                        {messageModulo && <Message msg={messageModulo} type="success" />}
                        {messageSubmodulo && <Message msg={messageSubmodulo} type="success" />}
                        {messageProcessoNegocio && <Message msg={messageProcessoNegocio} type="success" />}|
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    )
}
