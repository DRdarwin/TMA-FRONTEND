/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import { createRoute } from '../../api/routes';

const RouteForm: React.FC<{ onRouteAdded: (route: { id: string; name: string; description?: string; waypoints: { latitude: number; longitude: number }[] }) => void }> = ({ onRouteAdded }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [waypoints, setWaypoints] = useState<{ latitude: number; longitude: number }[]>([]);
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  const handleAddWaypoint = () => {
    if (!latitude || !longitude) return;
    setWaypoints([...waypoints, { latitude: parseFloat(latitude), longitude: parseFloat(longitude) }]);
    setLatitude('');
    setLongitude('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newRoute = await createRoute({ name, description, waypoints });
      onRouteAdded(newRoute);
      setName('');
      setDescription('');
      setWaypoints([]);
    } catch (error) {
      alert('Не вдалося створити маршрут');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded">
      <h2 className="text-lg font-bold mb-2">Додати маршрут</h2>
      <input 
        type="text" 
        placeholder="Назва" 
        value={name} 
        onChange={(e) => setName(e.target.value)}
        className="border p-2 w-full mb-2"
        required
      />
      <textarea 
        placeholder="Опис" 
        value={description} 
        onChange={(e) => setDescription(e.target.value)}
        className="border p-2 w-full mb-2"
      />
      <div className="flex gap-2 mb-2">
        <input 
          type="number" 
          placeholder="Широта" 
          value={latitude} 
          onChange={(e) => setLatitude(e.target.value)}
          className="border p-2 w-full"
        />
        <input 
          type="number" 
          placeholder="Довгота" 
          value={longitude} 
          onChange={(e) => setLongitude(e.target.value)}
          className="border p-2 w-full"
        />
        <button type="button" onClick={handleAddWaypoint} className="bg-blue-500 text-white px-3 py-1 rounded">
          +
        </button>
      </div>
      <ul className="mb-2">
        {waypoints.map((wp, index) => (
          <li key={index} className="text-sm">{wp.latitude}, {wp.longitude}</li>
        ))}
      </ul>
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded w-full">
        Додати маршрут
      </button>
    </form>
  );
};

export default RouteForm;
