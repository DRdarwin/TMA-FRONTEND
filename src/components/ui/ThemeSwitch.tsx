import React from 'react';

const ThemeSwitch: React.FC = () => {
    const [isDarkMode, setIsDarkMode] = React.useState<boolean>(false);

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
        document.body.classList.toggle('dark', !isDarkMode);
    };

    return (
        <label className="flex items-center cursor-pointer">
            <span className="mr-2">Темна тема</span>
            <input type="checkbox" checked={isDarkMode} onChange={toggleTheme} className="hidden" />
            <div className="relative">
                <div className="block bg-gray-600 w-14 h-8 rounded-full"></div>
                <div className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
            </div>
        </label>
    );
};

export default ThemeSwitch;
