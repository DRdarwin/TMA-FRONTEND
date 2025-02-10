import axios from "axios";
import { useEffect, useState } from "react";
import Web3 from "web3";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../components/ui/dialog";

export default function Finance() {
  const [balance, setBalance] = useState<number>(0);
  const [paymentHistory, setPaymentHistory] = useState<
    { date: string; amount: number; flight: string }[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const INFURA_PROJECT_ID =
          process.env.REACT_APP_INFURA_PROJECT_ID || "default_project_id";
        const web3 = new Web3(
          Web3.givenProvider || `https://mainnet.infura.io/v3/${INFURA_PROJECT_ID}`
        );

        const account = process.env.REACT_APP_WALLET_ADDRESS || "";
        const usdtContract = new web3.eth.Contract(
          [
            {
              constant: true,
              inputs: [{ name: "_owner", type: "address" }],
              name: "balanceOf",
              outputs: [{ name: "balance", type: "uint256" }],
              type: "function",
            },
          ],
          process.env.REACT_APP_USDT_CONTRACT_ADDRESS || ""
        );

        const userBalanceRaw = await usdtContract.methods.balanceOf(account).call();
        if (userBalanceRaw && typeof userBalanceRaw === "string") {
          setBalance(parseFloat(web3.utils.fromWei(userBalanceRaw, "mwei")));
        } else {
          console.warn("Баланс користувача не визначений або недійсний");
        }

        const response = await axios.get(`${process.env.REACT_APP_PAYMENT_HISTORY_API}`);
        if (response.data && Array.isArray(response.data)) {
          setPaymentHistory(response.data);
        } else {
          console.error("Недійсний формат даних для історії виплат:", response.data);
        }
      } catch (error) {
        console.error("Помилка отримання фінансових даних:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleTransfer = () => {
    setModalOpen(true);
  };

return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">💰 Фінанси</h1>

 {/* Кнопка відкриття модального вікна */}
      <Button onClick={() => setModalOpen(true)}>Переказати USDT</Button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Баланс */}
        <Card>
          <CardHeader>
            <CardTitle>💵 Баланс</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p className="text-gray-500">Завантаження...</p>
            ) : (
              <p className="text-2xl font-semibold">{balance} USDT</p>
            )}
          </CardContent>
        </Card>

        {/* Історія платежів */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>📜 Історія виплат</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p className="text-gray-500">Завантаження історії...</p>
            ) : paymentHistory.length === 0 ? (
              <p className="text-gray-500">Немає транзакцій.</p>
            ) : (
              <ul className="divide-y divide-gray-200">
                {paymentHistory.map((payment, index) => (
                  <li key={index} className="py-2 flex justify-between">
                    <span className="text-gray-600">{payment.date}</span>
                    <span className="text-gray-800 font-semibold">{payment.amount} USDT</span>
                    <span className="text-blue-500">{payment.flight}</span>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        {/* Переказ */}
        <Card>
          <CardHeader>
            <CardTitle>🔄 Переказ коштів</CardTitle>
          </CardHeader>
          <CardContent>
            <Button onClick={handleTransfer} className="w-full">
              Переказати USDT
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Використовуємо Dialog замість Modal */}
      <Dialog open={isModalOpen} onOpenChange={setModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>🔄 Підтвердьте переказ</DialogTitle>
          </DialogHeader>
          <p>Ви впевнені, що хочете переказати USDT?</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setModalOpen(false)}>Скасувати</Button>
            <Button
              onClick={() => {
                console.log("✅ Переказ підтверджено");
                setModalOpen(false);
              }}
            >
              Підтвердити
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}