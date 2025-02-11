// src/components/WalletForm.tsx
import React, { useState } from 'react';
import { updateWallet as updateWalletApi } from '../../api/api';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

interface WalletFormProps {
    wallets: { id: number; name: string; balance: number }[];
    setWallets: React.Dispatch<React.SetStateAction<{ id: number; name: string; balance: number }[]>>;
}

const WalletForm: React.FC<WalletFormProps> = ({ wallets, setWallets }) => {
    const [selectedWallet, setSelectedWallet] = useState(wallets[0]?.id || '');
    const [balance, setBalance] = useState('');

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        const updatedWallet = await updateWalletApi(String(selectedWallet), { balance });
        setWallets(wallets.map(w => w.id === selectedWallet ? updatedWallet : w));
        setBalance('');
    };

    return (
        <form onSubmit={handleUpdate} className="space-y-2">
            <select value={selectedWallet} onChange={(e) => setSelectedWallet(e.target.value)} className="w-full border rounded p-2">
                {wallets.map(wallet => (
                    <option key={wallet.id} value={wallet.id}>{wallet.name}</option>
                ))}
            </select>
            <Input
                type="number"
                placeholder="Баланс"
                value={balance}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBalance(e.target.value)}
            />
            <Button type="submit">Оновити баланс</Button>
        </form>
    );
};

export default WalletForm;
