import { useEffect, useReducer, useState } from "react";
import { Button } from "../components/ui/button";
import { api } from "../api/api";

// Імпортуємо компоненти таблиці з shadcn/ui
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "../components/ui/table";

// Імпортуємо Header
import Header from "../components/navigation/Header";

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
      return { ...state, isLoading: false, flights: action.payload };
    case "FETCH_ERROR":
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
}

export default function Schedule() {
  console.log("📌 Schedule component rendering");
  const [state, dispatch] = useReducer(reducer, initialState);

  // Додаємо стан для теми
  const [theme, setTheme] = useState("light");
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    console.log("🔄 useEffect triggered: Fetching flights");
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchFlights = async () => {
      dispatch({ type: "FETCH_START" });
      try {
        const response = await api.get<Flight[]>("/flights", { signal });
        console.log("✈️ Отримані рейси:", response.data);
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
    <div className="min-h-screen bg-background text-foreground">
      {/* Хедер, який перемикає тему */}
      <Header theme={theme} toggleTheme={toggleTheme} />

      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Розклад рейсів</h1>
        {state.isLoading ? (
          <p>Завантаження...</p>
        ) : state.error ? (
          <p className="text-red-500">{state.error}</p>
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
                    <Button>Детальніше</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}
