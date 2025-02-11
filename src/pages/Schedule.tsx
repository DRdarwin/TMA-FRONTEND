import { useEffect, useReducer, useState } from "react";
import { Button } from "../components/ui/button";
import { api } from "../api/api";
import { Calendar } from "../components/ui/calendar";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "../components/ui/table";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

console.log("📜 Schedule component loaded");

type Flight = {
  id: number;
  origin: string;
  destination: string;
  date: string;
  passengers: number;
};

type State = {
  flights: Flight[];
  isLoading: boolean;
  error: string | null;
};

type Action =
  | { type: "FETCH_START" }
  | { type: "FETCH_SUCCESS"; payload: Flight[] }
  | { type: "FETCH_ERROR"; payload: string };

const initialState: State = {
  flights: [],
  isLoading: false,
  error: null,
};

function reducer(state: State, action: Action): State {
  console.log("🛠 Reducer action received:", action);
  switch (action.type) {
    case "FETCH_START":
      return { ...state, isLoading: true, error: null };
    case "FETCH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        flights: Array.isArray(action.payload) ? action.payload : [],
      };
    case "FETCH_ERROR":
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
}

export default function Schedule() {
  console.log("📌 Schedule component rendering");
  const [state, dispatch] = useReducer(reducer, initialState);
  const [date, setDate] = useState<Date | undefined>(new Date());

  useEffect(() => {
    console.log("🔄 useEffect triggered: Fetching flights");
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchFlights = async () => {
      dispatch({ type: "FETCH_START" });
      try {
        const response = await api.get<Flight[]>("/api/flights", { signal });
        console.log(
          "✈️ Отримані рейси:",
          Array.isArray(response.data),
          response.data,
        );
        dispatch({ type: "FETCH_SUCCESS", payload: response.data });
      } catch (err) {
        if (signal.aborted) return;
        console.error("❌ Помилка при завантаженні рейсів:", err);
        dispatch({
          type: "FETCH_ERROR",
          payload: "Не вдалося завантажити рейси. Спробуйте ще раз.",
        });
      }
    };

    fetchFlights();

    return () => {
      console.log("🚫 Cleaning up: Aborting fetch request");
      controller.abort();
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Заголовок */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        📅 Розклад рейсів
      </h1>

      {/* Головний контейнер */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Календар */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Обрати дату</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="border rounded-lg p-2 shadow-md w-full"
            />
          </CardContent>
        </Card>

        {/* Таблиця рейсів */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Список рейсів</CardTitle>
          </CardHeader>
          <CardContent>
            {state.isLoading ? (
              <p className="text-gray-600">Завантаження...</p>
            ) : state.error ? (
              <p className="text-red-500">{state.error}</p>
            ) : state.flights.length === 0 ? (
              <p className="text-gray-500">Немає доступних рейсів.</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Відправлення</TableHead>
                    <TableHead>Призначення</TableHead>
                    <TableHead>Дата</TableHead>
                    <TableHead>Пасажири</TableHead>
                    <TableHead>Дії</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {state.flights.map((flight) => (
                    <TableRow key={flight.id}>
                      <TableCell>{flight.id}</TableCell>
                      <TableCell>{flight.origin}</TableCell>
                      <TableCell>{flight.destination}</TableCell>
                      <TableCell>{flight.date}</TableCell>
                      <TableCell>{flight.passengers}</TableCell>
                      <TableCell>
                        <Button variant="outline">Детальніше</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
