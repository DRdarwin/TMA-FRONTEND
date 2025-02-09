import axios from "axios";
import { useEffect, useState } from "react";
import Web3 from "web3";
import Header from "../components/navigation/Header";
import Sidebar from "../components/navigation/Sidebar";
import { Button } from "../components/ui/button";

function Modal({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        {children}
        <Button onClick={onClose} className="mt-4">
          Закрити
        </Button>
      </div>
    </div>
  );
}

export default function Finance() {
  const [balance, setBalance] = useState<number>(0);
  const [paymentHistory, setPaymentHistory] = useState<
    { date: string; amount: number; flight: string }[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    async function fetchData() {
      let timeout: NodeJS.Timeout | null = null;
      try {
        setLoading(true);
        const INFURA_PROJECT_ID =
          process.env.REACT_APP_INFURA_PROJECT_ID || "default_project_id";
        const web3 = new Web3(
          Web3.givenProvider ||
            `https://mainnet.infura.io/v3/${INFURA_PROJECT_ID}`,
        );

        timeout = setTimeout(() => {
          console.warn("⏳ Запит займає занадто багато часу...");
        }, 5000);

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
          process.env.REACT_APP_USDT_CONTRACT_ADDRESS || "",
        );

        const userBalanceRaw = await usdtContract.methods
          .balanceOf(account)
          .call();
        if (userBalanceRaw && typeof userBalanceRaw === "string") {
          setBalance(parseFloat(web3.utils.fromWei(userBalanceRaw, "mwei")));
        } else {
          console.warn("Баланс користувача не визначений або недійсний");
        }

        const response = await axios.get(
          `${process.env.REACT_APP_PAYMENT_HISTORY_API}`,
        );
        if (response.data && Array.isArray(response.data)) {
          setPaymentHistory(response.data);
        } else {
          console.error(
            "Недійсний формат даних для історії виплат:",
            response.data,
          );
        }
      } catch (error) {
        console.error("Помилка отримання фінансових даних:", error);
      } finally {
        if (timeout) clearTimeout(timeout);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleTransfer = () => {
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header theme="light" toggleTheme={() => {}} />
      <div className="flex">
        <Sidebar />
        <main className="flex-grow">
          <div className="max-w-lg mx-auto p-4">
            <h1 className="text-2xl font-semibold">💰 Фінанси</h1>
            {loading ? (
              <p className="text-gray-500 mt-4">Завантаження даних...</p>
            ) : (
              <>
                <div className="mt-6 border border-muted rounded-lg p-4 shadow-md bg-background">
                  <h2 className="text-xl font-semibold">Баланс</h2>
                  <p className="text-lg">{balance} USDT</p>
                </div>

                <div className="mt-6 border border-muted rounded-lg p-4 shadow-md bg-background">
                  <h2 className="text-xl font-semibold">Історія виплат</h2>
                  <ul className="text-left mx-auto max-w-md">
                    {paymentHistory.map((payment, index) => (
                      <li key={index} className="mb-2">
                        <strong>Дата:</strong> {payment.date},{" "}
                        <strong>Сума:</strong> {payment.amount} USDT,{" "}
                        <strong>Рейс:</strong> {payment.flight}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6">
                  <Button onClick={handleTransfer} className="px-6 py-2">
                    Переказати USDT
                  </Button>
                </div>
              </>
            )}

            <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
              <h2 className="text-lg font-bold">Підтвердьте переказ</h2>
              <p>Ви впевнені, що хочете переказати USDT?</p>
              <Button
                onClick={() => {
                  console.log("✅ Переказ підтверджено");
                  setModalOpen(false);
                }}
                className="mt-4"
              >
                Підтвердити
              </Button>
            </Modal>
          </div>
        </main>
      </div>
    </div>
  );
}
