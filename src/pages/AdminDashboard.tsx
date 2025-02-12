// src/pages/AdminDashboard.tsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import FlightManagement from "../components/admin/FlightManagement";
import WalletManagement from '../components/admin/WalletManagement';
import UserManagement from '../components/admin/UserManagement'; // New import
import TypographyH1 from '../components/ui/typography';
import { Card } from '../components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';
import { getAdmin } from '../api/getAdmin';
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from '../components/ui/chart';
import { Bar, BarChart } from 'recharts';

interface Flight {
    id: string;
    name: string;
    date: string;
}

interface Wallet {
    id: string;
    balance: number;
    currency: string;
}

const AdminDashboard: React.FC = () => {
    const [flights, setFlights] = useState<Flight[]>([]);
    const [wallets, setWallets] = useState<Wallet[]>([]);
    const loading = useRef<boolean>(false);
    const [activeTab, setActiveTab] = useState<string>(() => localStorage.getItem("activeTab") || "overview");
    const [chartData, setChartData] = useState<number[]>([]);

    useEffect(() => {
        localStorage.setItem("activeTab", activeTab);
    }, [activeTab]);

    useEffect(() => {
        const fetchAdminData = async () => {
            if (loading.current) return;
            loading.current = true;
            try {
                const data = await getAdmin();
                setFlights(data.flights || []);
                setWallets(data.wallets || []);
                setChartData(Array.isArray(data.chartData) ? data.chartData : []);
            } catch (error) {
                console.error("Помилка завантаження даних адміністратора", error);
            } finally {
                loading.current = false;
            }
        };
        fetchAdminData();
    }, []);

    const handleTabChange = useCallback((tab: string) => {
        setActiveTab(tab);
    }, []);

    return (
        <div className="container mx-auto p-6">
            <TypographyH1 className="mb-6">Панель адміністратора</TypographyH1>
            <Tabs value={activeTab} onValueChange={handleTabChange} className="mb-6">
                <TabsList>
                    <TabsTrigger value="overview">Огляд</TabsTrigger>
                    <TabsTrigger value="analytics">Аналітика</TabsTrigger>
                    <TabsTrigger value="settings">Налаштування</TabsTrigger>
                    <TabsTrigger value="users">Користувачі</TabsTrigger> {/* New tab */}
                </TabsList>
                <TabsContent value="overview">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                        <Card className="p-4">
                            <h2 className="text-lg font-semibold">Доходи</h2>
                            <p className="text-2xl font-bold">$45,231.89</p>
                            <p className="text-sm text-gray-500">+20.1% з минулого місяця</p>
                        </Card>
                        <Card className="p-4">
                            <h2 className="text-lg font-semibold">Підписки</h2>
                            <p className="text-2xl font-bold">+2350</p>
                            <p className="text-sm text-gray-500">+180.1% з минулого місяця</p>
                        </Card>
                        <Card className="p-4">
                            <h2 className="text-lg font-semibold">Продажі</h2>
                            <p className="text-2xl font-bold">+12,234</p>
                            <p className="text-sm text-gray-500">+19% з минулого місяця</p>
                        </Card>
                        <Card className="p-4">
                            <h2 className="text-lg font-semibold">Активні зараз</h2>
                            <p className="text-2xl font-bold">+573</p>
                            <p className="text-sm text-gray-500">+201 за останню годину</p>
                        </Card>
                    <Card className="p-4 mb-6">
                        <h2 className="text-lg font-semibold mb-4">Огляд</h2>
                        <div className="chart-container"></div>
                        <div className="chart-container">
                            <h3 className="text-lg font-semibold mb-4">Графік даних</h3>
                            <ChartContainer config={{}}>
                                <BarChart data={chartData}>
                                    <Bar dataKey="value" />
                                    <ChartTooltip content={<ChartTooltipContent />} />
                                </BarChart>
                            </ChartContainer>
                            <div className="chart">
                                {/* Replace this with your actual chart implementation */}
                                <p>Chart data: {chartData.join(', ')}</p>
                            </div>
                        </div>
                    </Card>
                        <FlightManagement flights={flights} setFlights={setFlights} />
                        <WalletManagement wallets={wallets} setWallets={setWallets} />
                    </div>
                </TabsContent>
                <TabsContent value="analytics">
                    <p>Аналіз даних тут...</p>
                </TabsContent>
                <TabsContent value="settings">
                    <p>Налаштування тут...</p>
                </TabsContent>
                <TabsContent value="users"> {/* New tab content */}
                    <UserManagement />
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default AdminDashboard;