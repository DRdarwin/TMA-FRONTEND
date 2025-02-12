import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../components/ui/dialog";

export default function Finance() {
  const [balance, setBalance] = useState<number>(0);
  interface Payment {
    date: string;
    amount: number;
  }

  const [paymentHistory, setPaymentHistory] = useState<Payment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [recipient, setRecipient] = useState<string>("");
  const [transferAmount, setTransferAmount] = useState<number>(0);
  const [transferStatus, setTransferStatus] = useState<string>("");

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        // Запит до бекенду для отримання балансу
        const responseBalance = await axios.get(`/api/finance/balance`, { params: { userId: "12345" } });
        setBalance(responseBalance.data.balance);
        // Запит до бекенду для отримання історії транзакцій
        const responseTransactions = await axios.get(`/api/finance/transactions`, { params: { userId: "12345" } });
        setPaymentHistory(responseTransactions.data.transactions || []);
      } catch (error) {
        console.error("Помилка отримання фінансових даних:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const confirmTransfer = async () => {
    if (!recipient || transferAmount <= 0) {
      setTransferStatus("Будь ласка, введіть коректні дані");
      return;
    }
    setTransferStatus("Відправлення транзакції...");
    try {
      const response = await axios.post(`/api/finance/transactions`, {
        userId: "12345",
        recipient,
        amount: transferAmount,
        type: "withdraw",
      });
      setTransferStatus(`Транзакція успішна: ${response.data.transactionId}`);
    } catch (err) {
      console.error("Помилка транзакції:", err);
      setTransferStatus("Помилка при відправленні транзакції");
    }
    setModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">💰 Фінанси</h1>
      <Button onClick={() => setModalOpen(true)}>Переказати USDT</Button>
      <Card>
        <CardHeader>
          <CardTitle>💵 Баланс</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? <p className="text-gray-500">Завантаження...</p> : <p className="text-2xl font-semibold">{balance} USDT</p>}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>📜 Історія виплат</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-gray-500">Завантаження...</p>
          ) : paymentHistory.length === 0 ? (
            <p className="text-gray-500">Немає транзакцій.</p>
          ) : (
            <ul className="divide-y divide-gray-200">
              {paymentHistory.map((payment, index) => (
                <li key={index} className="py-2 flex justify-between">
                  <span className="text-gray-600">{payment.date}</span>
                  <span className="text-gray-800 font-semibold">{payment.amount} USDT</span>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
      <Dialog open={isModalOpen} onOpenChange={setModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>🔄 Підтвердьте переказ</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-3">
            <label>
              Отримувач:
              <input type="text" value={recipient} onChange={(e) => setRecipient(e.target.value)} className="border rounded p-1 w-full" placeholder="Введіть адресу отримувача" />
            </label>
            <label>
              Сума USDT:
              <input type="number" value={transferAmount} onChange={(e) => setTransferAmount(parseFloat(e.target.value))} className="border rounded p-1 w-full" placeholder="Введіть суму" />
            </label>
          </div>
          {transferStatus && <p className="mt-2 text-sm text-gray-600">{transferStatus}</p>}
          <DialogFooter>
            <Button variant="outline" onClick={() => setModalOpen(false)}>Скасувати</Button>
            <Button onClick={confirmTransfer}>Підтвердити</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
