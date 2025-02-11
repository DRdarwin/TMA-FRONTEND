// src/components/FlightForm.tsx
import React, { useState } from 'react';
import { createFlight } from '../../api/createFlight';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

interface Flight {
    id: number;
    name: string;
    date: string;
}

const FlightForm: React.FC<{ flights: Flight[], setFlights: React.Dispatch<React.SetStateAction<Flight[]>> }> = ({ flights, setFlights }) => {
    const [flightData, setFlightData] = useState({ name: '', date: '' });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const newFlight = await createFlight(flightData);
        setFlights([...flights, newFlight]);
        setFlightData({ name: '', date: '' });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-2">
            <Input
                type="text"
                placeholder="Назва рейсу"
                value={flightData.name}
                onChange={(e) => setFlightData({ ...flightData, name: e.target.value })}
            />
            <Input
                type="date"
                value={flightData.date}
                onChange={(e) => setFlightData({ ...flightData, date: e.target.value })}
            />
            <Button type="submit">Додати рейс</Button>
        </form>
    );
};

export default FlightForm;
