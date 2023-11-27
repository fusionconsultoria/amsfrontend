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
import { register, reset } from "../../slices/authSlice";

function Register() {

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const togglePasswordVisibilityTwo = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const { loading, error } = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();

        const user = {
            nome,
            email,
            password,
            confirmPassword,
        };

        dispatch(register(user));
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

                {!loading && <Button variant="warning" type="submit">
                    Cadastrar
                </Button>}
                {loading && <Button variant="warning" type="submit" disabled>
                    Aguarde...
                </Button>}
                {error && <Message msg={error} type="error" />}
            </Form>
        </div >
    )
}

export default Register

