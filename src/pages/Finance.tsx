import axios from "axios";
import { useEffect, useState, useMemo } from "react";
import * as TronWebModule from "tronweb";
import type { TronWeb as TronWebType } from "tronweb";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../components/ui/dialog";

// Якщо ці типи потрібні лише у цьому компоненті, оголосимо їх тут:
type TronWebOptions = {
  fullHost: string;
  solidityNode: string;
  eventServer: string;
  headers?: Record<string, string>;
};

type TronWebConstructorType = new (config: TronWebOptions) => TronWebType;

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

  // Ініціалізація tronWeb через useMemo з приведенням типу
  const tronWeb = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const TronWebConstructor = (((TronWebModule as any).default || TronWebModule) as unknown) as TronWebConstructorType;
    return new TronWebConstructor({
      fullHost: fullNode,
      solidityNode: solidityNode,
      eventServer: eventServer,
      headers: {
        "TRON-PRO-API-KEY": "faa10796-545f-4985-84dd-f245cf2e9b7b",
      },
    });
  }, [fullNode, solidityNode, eventServer]);

  // usdtAbi не змінюється – оголошуємо через useMemo
  const usdtAbi = useMemo(
    () => [
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
    ],
    []
  );

  // Адреса контракту USDT TRC20
  const usdtContractAddress =
    process.env.REACT_APP_USDT_CONTRACT_ADDRESS || "TXLAQ63Xg1NAzckPwKHvzw7CSEmLMEqcdj";

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const account = process.env.REACT_APP_WALLET_ADDRESS || "";
        const usdtContract = await tronWeb.contract(usdtAbi, usdtContractAddress);
        const userBalanceRaw: string = await usdtContract.balanceOf(account).call();
        setBalance(parseFloat(userBalanceRaw) / 1e6);

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
  }, [tronWeb, usdtAbi, usdtContractAddress]);

  const confirmTransfer = async () => {
    if (!recipient || transferAmount <= 0) {
      setTransferStatus("Будь ласка, введіть коректні дані");
      return;
    }
    setTransferStatus("Відправлення транзакції...");
    try {
      const usdtContract = await tronWeb.contract(usdtAbi, usdtContractAddress);
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
      <Button onClick={() => setModalOpen(true)}>Переказати USDT</Button>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
          {transferStatus && <p className="mt-2 text-sm text-gray-600">{transferStatus}</p>}
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
