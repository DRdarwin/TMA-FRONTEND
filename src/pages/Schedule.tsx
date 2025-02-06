import { useEffect, useState } from "react";
import { api } from "../api/api";

type Flight = {
    id: number;
    origin: string;
    destination: string;
    date: string;
    passengers: number;
};

export default function Schedule() {
    const [flights, setFlights] = useState<Flight[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchFlights = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await api.get<Flight[]>("/flights");
                console.log("✈️ Отримані рейси:", response.data);
                setFlights(response.data);
            } catch (err) {
                console.error("❌ Помилка при завантаженні рейсів:", err);
                setError("Не вдалося завантажити рейси. Спробуйте ще раз.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchFlights();
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Розклад рейсів</h1>
            {isLoading ? (
                <p>Завантаження...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <ul className="space-y-4">
                    {flights.map((flight) => (
                        <li key={flight.id} className="border p-4 rounded-md shadow">
                            <h2 className="text-lg font-semibold">
                                {flight.origin} → {flight.destination}
                            </h2>
                            <p className="text-gray-500">Дата: {flight.date}</p>
                            <p className="text-gray-500">Пасажири: {flight.passengers}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
