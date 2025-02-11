/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/AdminPanel.tsx
import React, { useEffect, useState } from 'react';
import { getFlights, getWallets } from '../api/api';
import FlightForm from './admin/FlightForm';
import WalletForm from './admin/WalletForm';
import { Card } from '../components/ui/card';

interface Flight {
    id: number;
    name: string;
    date: string;
}

interface Wallet {
    id: number;
    name: string;
    balance: number;
}

const AdminPanel: React.FC = () => {
    const [flights, setFlights] = useState<Flight[]>([]);
    const [wallets, setWallets] = useState<Wallet[]>([]);

    useEffect(() => {
        getFlights()
            .then((data) => setFlights(data as any))
            .catch((error) => {
            console.error(error);
            return Promise.reject(error);
            });

        getWallets()
            .then((data) => setWallets(data as any))
            .catch((error) => {
                console.error(error);
                return Promise.reject(error);
            });
    }, []);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
                <h2 className="text-lg font-bold">Керування рейсами</h2>
                <FlightForm flights={flights} setFlights={setFlights} />
            </Card>
            <Card>
                <h2 className="text-lg font-bold">Керування гаманцями</h2>
                <WalletForm wallets={wallets} setWallets={setWallets} />
            </Card>
        </div>
    );
};

export default AdminPanel;