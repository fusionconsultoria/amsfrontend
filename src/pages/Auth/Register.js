import './Auth.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

// Components
import Message from '../../components/Message/Message';

// Hooks
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";

// Redux
import { register, reset } from "../../slices/registerSlice";

function Register() {

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role, setRole] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const togglePasswordVisibilityTwo = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const { loading, error, message } = useSelector((state) => state.register);

    const dispatch = useDispatch();

    // Reset component message
    function resetComponentMessage() {
        setTimeout(() => {
            dispatch(reset());
        }, 2000);
    }


    const handleSubmit = (e) => {
        e.preventDefault();

        const user = {
            nome,
            email,
            password,
            confirmPassword,
            role
        };

        dispatch(register(user));

        resetComponentMessage();
    };


    // Clean all auth states
    useEffect(() => {
        dispatch(reset());
    }, [dispatch]);


    return (
        < div id='register' >
            <Form
                onSubmit={handleSubmit}
            >
                <Form.Group className="mb-3 border-input" controlId="formBasicName">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Digite o nome"
                        onChange={(e) => setNome(e.target.value)}
                        value={nome}
                        required
                        className='border-input'
                    />
                </Form.Group>
                <Form.Group className="mb-3 border-input" controlId="formBasicEmail">
                    <Form.Label>E-mail</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Digite o e-mail"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                        className='border-input'
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Senha</Form.Label>
                    <div className="password-input">
                        <Form.Control
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Digite sua senha"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            required
                            className='border-input'
                        />
                        <span onClick={togglePasswordVisibility} className="password-toggle">
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>
                </Form.Group>

                <Form.Group className="mb-3 border-input" controlId="formBasicPassword">
                    <Form.Label>Confirmação de senha</Form.Label>
                    <div className="password-input">
                        <Form.Control
                            type={showConfirmPassword ? 'text' : 'password'}
                            placeholder="Confirme a sua senha"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            value={confirmPassword}
                            required
                            className='border-input'
                        />
                        <span onClick={togglePasswordVisibilityTwo} className="password-toggle">
                            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>
                </Form.Group>
                <Form.Group className="mb-3 border-input" controlId="formBasicRole">
                    <Form.Label>Atribuição</Form.Label>
                    <Form.Select
                        className="mb-3 border-input"
                        aria-label="Role"
                        onChange={(e) => setRole(e.target.value)}  // Atualiza o estado role
                        value={role}
                        required>
                        <option>Selecione a Atribuição</option>
                        <option value="ADMIN">ADMIN</option>
                        <option value="OPER">OPER</option>
                    </Form.Select>
                </Form.Group>

                {!loading && <Button variant="warning" type="submit">
                    Cadastrar
                </Button>}
                {loading && <Button variant="warning" type="submit" disabled>
                    Aguarde...
                </Button>}
                {error && <Message msg={error} type="error" />}
                {message && <Message msg={message} type="success" />}
            </Form>
        </div >
    )
}

export default Register

