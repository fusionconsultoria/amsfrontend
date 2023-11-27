import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getModulos } from '../../slices/moduloSlice';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import { ModalPost } from '../../components/ModalPost/ModalPost';
import { Col, Row } from 'react-bootstrap';
import './Modulo.css';

const Modulo = () => {

  const dispatch = useDispatch();

  const { modulos } = useSelector((state) => state.modulo);

  // Load all modulos
  useEffect(() => {
    dispatch(getModulos());
  }, [dispatch]);

  const [selectedModule, setSelectedModule] = useState('');
  const [selectedSubmodule, setSelectedSubmodule] = useState('');
  const [selectedProcess, setSelectedProcess] = useState('');

  const [showModuleModal, setShowModuleModal] = useState(false);
  const [showSubmoduleModal, setShowSubmoduleModal] = useState(false);
  const [showProcessModal, setShowProcessModal] = useState(false);


  const handleModuleSelect = (event) => {
    const selectedId = event.target.value;
    setSelectedModule(selectedId);
    setSelectedSubmodule('');
    setSelectedProcess('');
    setShowModuleModal(true);
  };

  const handleSubmoduleSelect = (event) => {
    const selectedId = event.target.value;
    setSelectedSubmodule(selectedId);
    setSelectedProcess('');
    setShowSubmoduleModal(true);
  };

  const handleProcessSelect = (event) => {
    const selectedId = event.target.value;
    setSelectedProcess(selectedId);
    setShowProcessModal(true);
  };

  const selectedModuleData = modulos.find((modulo) => modulo._id === selectedModule);

  // Renderiza novamente o componente Form.Select sempre que o estado modulos mudar
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (modulos) {
      // Atualiza o valor do componente Form.Select com os novos módulos
      const newOptions = modulos.map((modulo) => (
        <option key={modulo._id} value={modulo._id}>
          {modulo.nome}
        </option>
      ));
      setOptions(newOptions);
    }
  }, [modulos]);

  return (
    <div className='modulo'>
      <Container>
        <h2 className='titulo-modulo'>Processos de Negócio</h2>
        <Form>
          <Row className='mb-3'>
            <Col >
              <Form.Select
                aria-label='Select Module'
                value={selectedModule}
                onChange={handleModuleSelect}

              >
                <option>Selecione um módulo</option>
                {options}
              </Form.Select>
            </Col>
            <Col xs='auto' className='px-0'>
              <ModalPost
                show={showModuleModal}
                onHide={() => setShowModuleModal(false)}
                title='Módulo Modal Title'
              />
            </Col>
          </Row>

          <Row className='mb-3'>
            <Col>
              <Form.Select
                aria-label='Select Submodule'
                value={selectedSubmodule}
                onChange={handleSubmoduleSelect}
              >
                <option >Selecione um submódulo</option>
                {selectedModuleData && selectedModuleData.submodulos.map((submodulo) => (
                  <option key={submodulo._id} value={submodulo._id}>
                    {submodulo.nome}
                  </option>
                ))}
              </Form.Select>
            </Col>
            <Col xs='auto' className='px-0'>
              <ModalPost
                show={showSubmoduleModal}
                onHide={() => setShowSubmoduleModal(false)}
                title='Submódulo Modal Title'
                data={{ id: selectedModule, tipo: 'submodulo' }}
              />
            </Col>
          </Row>

          <Row className='mb-3'>
            <Col>
              <Form.Select
                aria-label='Select Process'
                value={selectedProcess}
                onChange={handleProcessSelect}
              >
                <option >Selecione um processo de negócio</option>
                {selectedModuleData &&
                  selectedModuleData.submodulos
                    .filter((submodulo) => submodulo._id === selectedSubmodule)
                    .map((submodulo) =>
                      submodulo.processosNegocio.map((processo) => (
                        <option key={processo._id} value={processo._id}>
                          {processo.nome}
                        </option>
                      ))
                    )}
              </Form.Select>
            </Col>
            <Col xs='auto' className='px-0'>
              <ModalPost
                show={showProcessModal}
                onHide={() => setShowProcessModal(false)}
                title='Processo Modal Title'
                data={{ id: selectedSubmodule, tipo: 'processoNegocio'}}
              />
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  );
};

export default Modulo;
