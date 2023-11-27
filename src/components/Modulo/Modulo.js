import { useSelector, useDispatch } from "react-redux";
import { getModulos } from "../../slices/moduloSlice";
import { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form';

export const Modulo = ({ onOptionChange, currentProcessoNegocio }) => {
    const dispatch = useDispatch();
    const { modulos, loading } = useSelector((state) => state.modulo);

    useEffect(() => {
        dispatch(getModulos());
    }, [dispatch]);

    const [selectedOption, setSelectedOption] = useState(currentProcessoNegocio);

    if (loading) {
        return <p>Carregando...</p>;
    }

    const getOptions = () => {
        const options = [];

        modulos.forEach((modulo) => {
            const moduloNome = modulo.nome || 'N/A';

            modulo.submodulos.forEach((submodulo) => {
                const submoduloNome = submodulo.nome || 'N/A';

                submodulo.processosNegocio.forEach((processo) => {
                    const processoNome = processo.nome || 'N/A';
                    const moduleOption = `${moduloNome} - ${submoduloNome} - ${processoNome}`;
                    options.push({
                        label: moduleOption,
                        value: moduleOption,
                    });
                });
            });
        });

        return options;
    };

    const options = getOptions();

    const handleOptionSelect = (event) => {
        const selectedValue = event.target.value;
        setSelectedOption(selectedValue);
        onOptionChange(selectedValue);
    };

    return (
        <>
            <Form.Select
                aria-label="Select Option"
                value={selectedOption}
                onChange={handleOptionSelect}
                style={{ borderColor: 'gray' }}
                size="sm"
            >
                <option>Selecione uma opção</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </Form.Select>
        </>
    );
}
