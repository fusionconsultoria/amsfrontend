import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "./EditProfile.css"

// Hooks
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// Redux
import { profile, updateProfile, resetMessage } from "../../slices/userSlice";

// Components
import Message from "../../components/Message/Message";

const Profile = () => {
    const dispatch = useDispatch();

    const { user, message, error, loading } = useSelector((state) => state.user);

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Load user data
    useEffect(() => {
        dispatch(profile());
    }, [dispatch]);

    // fill user form
    useEffect(() => {
        if (user) {
            setNome(user.nome);
            setEmail(user.email);
        }
    }, [user]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        // Gather user data from states
        const userData = {
            nome,
            email
        };


        if (password) {
            userData.password = password;
        }

        // build form data
        const formData = new FormData();

        const userFormData = Object.keys(userData).forEach((key) =>
            formData.append(key, userData[key])
        );


        formData.append("user", userFormData);

        await dispatch(updateProfile(userData));

        setTimeout(() => {
            dispatch(resetMessage());
        }, 2000);
    };


    return (
        <div
            id='login'
        >
            <Form
                onSubmit={handleSubmit}
            >
                <Form.Group
                    className="mb-3"
                    controlId="nome"
                >
                    <Form.Label>Nome</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Nome"
                        onChange={(e) => setNome(e.target.value)}
                        value={nome || ""}
                        className='border-input'
                    />
                </Form.Group>
                <Form.Group
                    className="mb-3"
                    controlId="email"
                >
                    <Form.Label>E-mail</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder="E-mail"
                        disabled
                        value={email || ""}
                        className='border-input'
                    />
                </Form.Group>

                <Form.Group
                    className="mb-3"
                    controlId="password"
                >
                    <Form.Label>Quer alterar sua senha?</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder="Digite sua nova senha..."
                        onChange={(e) => setPassword(e.target.value)}
                        value={password || ""}
                        className='border-input'
                        
                    />
                </Form.Group>

                {!loading && <Button variant="warning" type="submit">
                    Atualizar
                </Button>}
                {loading && <Button variant="warning" type="submit" disabled>
                    Aguarde...
                </Button>}
                {error && <Message msg={error} type="error" />}
                {message && <Message msg={message} type="success" />}
            </Form>
        </div>
    );
};

export default Profile;

