import axios from "axios";
import { useEffect, useState, useMemo } from "react";
import TronWeb from "tronweb";
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

  // Стейти для форми переказу
  const [recipient, setRecipient] = useState<string>("");
  const [transferAmount, setTransferAmount] = useState<number>(0);
  const [transferStatus, setTransferStatus] = useState<string>("");

  // Константи для підключення до TronGrid
  const fullNode = "https://api.trongrid.io";
  const solidityNode = "https://api.trongrid.io";
  const eventServer = "https://api.trongrid.io";

  // Використовуємо useMemo для ініціалізації tronWeb – він буде створений один раз
  const tronWeb = useMemo(() => {
    // Перевіряємо, чи TronWeb має властивість default (ESM export)
    const TronWebConstructor = ((TronWeb as any).default) || TronWeb;
    return new TronWebConstructor({
      fullHost: fullNode,
      solidityNode: solidityNode,
      eventServer: eventServer,
      headers: {
        "TRON-PRO-API-KEY": "faa10796-545f-4985-84dd-f245cf2e9b7b",
      },
    });
  }, [fullNode, solidityNode, eventServer]);

  // Використовуємо useMemo для usdtAbi, щоб масив не створювався знову при кожному рендері
  const usdtAbi = useMemo(() => ([
    {
      constant: true,
      inputs: [{ name: "_owner", type: "address" }],
      name: "balanceOf",
      outputs: [{ name: "balance", type: "uint256" }],
      type: "function",
    },
    {
      constant: false,
      inputs: [
        { name: "_to", type: "address" },
        { name: "_value", type: "uint256" },
      ],
      name: "transfer",
      outputs: [{ name: "success", type: "bool" }],
      type: "function",
    },
  ]), []);

  // Адреса контракту USDT TRC20 (можна брати з env)
  const usdtContractAddress =
    process.env.REACT_APP_USDT_CONTRACT_ADDRESS || "TXLAQ63Xg1NAzckPwKHvzw7CSEmLMEqcdj";

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        // Адреса гаманця – для демо беремо з env (у реальному додатку інтегруємо вбудований гаманець)
        const account = process.env.REACT_APP_WALLET_ADDRESS || "";
        // Створюємо інстанс контракту
        const usdtContract = await tronWeb.contract(usdtAbi, usdtContractAddress);
        // Викликаємо метод balanceOf
        const userBalanceRaw: string = await usdtContract.balanceOf(account).call();
        // USDT TRC20 має 6 десяткових, тому ділимо результат на 1e6
        setBalance(parseFloat(userBalanceRaw) / 1e6);

        // Отримання історії платежів із API
        const response = await axios.get(
          `${process.env.REACT_APP_PAYMENT_HISTORY_API}`
        );
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
  }, [tronWeb, usdtAbi, usdtContractAddress]);

  // Функція для підтвердження переказу
  const confirmTransfer = async () => {
    if (!recipient || transferAmount <= 0) {
      setTransferStatus("Будь ласка, введіть коректні дані");
      return;
    }
    setTransferStatus("Відправлення транзакції...");
    try {
      const usdtContract = await tronWeb.contract(usdtAbi, usdtContractAddress);
      // Конвертуємо суму в "sun" (1 USDT = 1e6 sun)
      const amountInSun = transferAmount * 1e6;
      const result = await usdtContract.transfer(recipient, amountInSun).send({
        feeLimit: 100000000,
        callValue: 0,
      });
      console.log("Результат транзакції:", result);
      setTransferStatus(`Транзакція успішна: ${result}`);
    } catch (err) {
      console.error("Помилка транзакції:", err);
      setTransferStatus("Помилка при відправленні транзакції");
    }
    setModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">💰 Фінанси</h1>

      {/* Кнопка відкриття модального вікна для переказу */}
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
                    <span className="text-gray-800 font-semibold">
                      {payment.amount} USDT
                    </span>
                    <span className="text-blue-500">{payment.flight}</span>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        {/* Блок для переказу */}
        <Card>
          <CardHeader>
            <CardTitle>🔄 Переказ коштів</CardTitle>
          </CardHeader>
          <CardContent>
            <Button onClick={() => setModalOpen(true)} className="w-full">
              Переказати USDT
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Модальне вікно для підтвердження переказу */}
      <Dialog open={isModalOpen} onOpenChange={setModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>🔄 Підтвердьте переказ</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-3">
            <label>
              Отримувач:
              <input
                type="text"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                className="border rounded p-1 w-full"
                placeholder="Введіть адресу отримувача"
              />
            </label>
            <label>
              Сума USDT:
              <input
                type="number"
                value={transferAmount}
                onChange={(e) => setTransferAmount(parseFloat(e.target.value))}
                className="border rounded p-1 w-full"
                placeholder="Введіть суму"
              />
            </label>
          </div>
          {transferStatus && (
            <p className="mt-2 text-sm text-gray-600">{transferStatus}</p>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setModalOpen(false)}>
              Скасувати
            </Button>
            <Button onClick={confirmTransfer}>Підтвердити</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
