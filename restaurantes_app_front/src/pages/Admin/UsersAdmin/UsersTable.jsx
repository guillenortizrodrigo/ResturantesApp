import React from 'react'
import Table from 'react-bootstrap/Table'
import { Button } from 'react-bootstrap';
import './UsersTable.scss'
import { Check, X, PencilSquare, Trash } from 'react-bootstrap-icons';

export default function UsersTable(props) {
    const { users, editUser, setShowDelete, setItem, setItemId } = props;
    const deleteUser = (user) => {
        setItem(`al usuario ${user.username}`); // Corregido para interpolación de variables
        setItemId(user.id);
        setShowDelete(true);
    };

    return (
        <Table variant="dark" className='rounded'>
            <thead>
                <tr>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Nombre</th>
                    <th>Apellidos</th>
                    <th className="text-center">Activo</th>
                    <th className="text-center">Staff</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {users.map((user) => (
                    <tr key={user.id}>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>{user.first_name}</td>
                        <td>{user.last_name}</td>
                        <td className="text-center">{user.is_active ? <Check className="text-success" /> : <X className="text-success" />}</td>
                        <td className="text-center">{user.is_staff ? <Check className="text-success" /> : <X className="text-success" />}</td>
                        <td className="text-center">
                            <Button variant="primary" size="sm" className="action-btn me-2" onClick={()=>editUser(user,user.id)}>
                                <PencilSquare />
                            </Button>
                            <Button variant="danger" size="sm" className="action-btn" onClick={() => deleteUser(user)}>
                                <Trash />
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    )
}
