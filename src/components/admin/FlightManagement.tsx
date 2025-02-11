/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import FlightForm from './FlightForm';


interface FlightManagementProps {
  flights: any[];
  setFlights: React.Dispatch<React.SetStateAction<any[]>>;
}

const FlightManagement: React.FC<FlightManagementProps> = ({ flights, setFlights }) => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Управління рейсами</h1>
      <FlightForm flights={flights} setFlights={setFlights} />
      <div className="mt-6">
        <h2 className="text-2xl font-semibold mb-2">Список рейсів</h2>
        {flights.length === 0 ? (
          <p className="text-gray-500">Немає рейсів.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {flights.map((flight) => (
              <li key={flight.id} className="py-2 flex justify-between">
                <span className="text-gray-600">{flight.name}</span>
                <span className="text-gray-800 font-semibold">{flight.date}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default FlightManagement;