import React from 'react';
import { getAllUsers, deleteUser, resetMessage } from '../../slices/userSlice';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import "./Users.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

function Users() {

    const dispatch = useDispatch();

    const { users, loading } = useSelector((state) => {
        return state.user;
    });

    useEffect(() => {
        dispatch(getAllUsers());
    }, [dispatch]);

    function resetComponentMessage() {
        setTimeout(() => {
            dispatch(resetMessage());
        }, 2000);
    }

    const handleDelete = (id) => {

        dispatch(deleteUser(id));
        
        resetComponentMessage();
    };

    if (loading) {
        return <p>Carregando...</p>;
    }

    return (
        <div className="users">
            <h1 >Lista de Usuários</h1>
            {users &&
                users.map((user) => (
                    <div className="post_user_row" key={user._id}>
                        <p className="titulo_user">{user.nome}</p>
                        <div className="actions">
                            <Button
                                className="btn btn-outline btn-danger"
                                variant="danger"
                                onClick={() => handleDelete(user._id)}
                            >
                                Excluir
                            </Button>
                        </div>
                    </div>
                ))}
        </div>
    );

}

export default Users;