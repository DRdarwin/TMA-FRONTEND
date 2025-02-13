import { useEffect, useState } from "react";
import { fetchRoutes, deleteRoute } from "../api/routes";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

// Визначення інтерфейсів
interface Waypoint {
  latitude: number;
  longitude: number;
}

interface Route {
  id: number; // ОНОВЛЕНО: `id` тепер має тип `number`
  name: string;
  waypoints?: Waypoint[];
}

const mapContainerStyle = { width: "100%", height: "400px" };
const center = { lat: 48.3794, lng: 31.1656 };

const Routes = () => {
  const [routes, setRoutes] = useState<Route[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadRoutes = async () => {
      try {
        const data: Route[] = await fetchRoutes();
        setRoutes(Array.isArray(data) ? data : []);
      } catch {
        setError("Помилка завантаження маршрутів");
      } finally {
        setLoading(false);
      }
    };
    loadRoutes();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await deleteRoute(id);
      setRoutes((prevRoutes) => prevRoutes.filter((route) => route.id !== id));
    } catch {
      alert("Не вдалося видалити маршрут");
    }
  };

  if (loading) return <p>Завантаження...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Маршрути</h1>
      <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ""}>
        <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={6}>
          {routes.map((route) =>
            route.waypoints?.map((point: Waypoint, index: number) => (
              <Marker key={`${route.id}-${index}`} position={{ lat: point.latitude, lng: point.longitude }} />
            ))
          )}
        </GoogleMap>
      </LoadScript>
      <ul>
        {routes.map((route) => (
          <li key={route.id} className="flex justify-between items-center p-2 border-b">
            <span>{route.name}</span>
            <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={() => handleDelete(route.id)}>
              Видалити
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Routes;
