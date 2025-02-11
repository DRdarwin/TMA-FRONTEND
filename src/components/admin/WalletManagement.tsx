import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../ui/dialog';

interface Wallet {
  id: string;
  balance: number;
  currency: string;
}

interface WalletManagementProps {
  wallets: Wallet[];
  setWallets: React.Dispatch<React.SetStateAction<Wallet[]>>;
}

const WalletManagement: React.FC<WalletManagementProps> = ({ wallets, setWallets }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [newWallet, setNewWallet] = useState<{ balance: number; currency: string }>({ balance: 0, currency: '' });

  useEffect(() => {
    async function fetchWallets() {
      try {
        setLoading(true);
        const response = await axios.get('/api/wallets');
        setWallets(response.data);
      } catch (error) {
        console.error('Error fetching wallets:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchWallets();
  }, [setWallets]);

  const handleAddWallet = async () => {
    try {
      const response = await axios.post('/api/wallets', newWallet);
      setWallets([...wallets, response.data]);
      setModalOpen(false);
      setNewWallet({ balance: 0, currency: '' });
    } catch (error) {
      console.error('Error adding wallet:', error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Управління гаманцями</h1>
      <Button onClick={() => setModalOpen(true)}>Додати гаманець</Button>
      <div className="mt-6">
        <h2 className="text-2xl font-semibold mb-2">Список гаманців</h2>
        {loading ? (
          <p className="text-gray-500">Завантаження...</p>
        ) : wallets.length === 0 ? (
          <p className="text-gray-500">Немає гаманців.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {wallets.map((wallet) => (
              <li key={wallet.id} className="py-2 flex justify-between">
                <span className="text-gray-600">{wallet.currency}</span>
                <span className="text-gray-800 font-semibold">{wallet.balance}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
      <Dialog open={isModalOpen} onOpenChange={setModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Додати новий гаманець</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-3">
            <label>
              Баланс:
              <input
                type="number"
                value={newWallet.balance}
                onChange={(e) => setNewWallet({ ...newWallet, balance: parseFloat(e.target.value) })}
                className="border rounded p-1 w-full"
                placeholder="Введіть баланс"
              />
            </label>
            <label>
              Валюта:
              <input
                type="text"
                value={newWallet.currency}
                onChange={(e) => setNewWallet({ ...newWallet, currency: e.target.value })}
                className="border rounded p-1 w-full"
                placeholder="Введіть валюту"
              />
            </label>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setModalOpen(false)}>Скасувати</Button>
            <Button onClick={handleAddWallet}>Додати</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WalletManagement;