import React, { useState, useEffect } from 'react';
import { getUsers } from '../../api/getUsers';
import { Card } from '../ui/card';
import { deleteUser } from "../../api/deleteUser";

interface User {
    id: string;
    name: string;
    email: string;
}

const UserManagement: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await getUsers();
                setUsers(data);
            } catch (error) {
                console.error("Помилка завантаження користувачів", error);
            }
        };
        fetchUsers();
    }, []);

    const handleDelete = async (userId: string) => {
        try {
            await deleteUser(userId);
            setUsers(users.filter(user => user.id !== userId));
        } catch (error) {
            console.error("Помилка видалення користувача", error);
        }
    };

    return (
        <Card className="p-4">
            <h2 className="text-lg font-semibold mb-4">Керування користувачами</h2>
            <ul>
                {users.map(user => (
                    <li key={user.id} className="mb-2 flex justify-between items-center">
                        <span>{user.name} ({user.email})</span>
                        <button onClick={() => handleDelete(user.id)} className="text-red-500">Видалити</button>
                    </li>
                ))}
            </ul>
        </Card>
    );
};

export default UserManagement;
