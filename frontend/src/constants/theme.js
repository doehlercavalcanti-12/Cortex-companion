import React, { createContext, useContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

const ThemeContext = createContext({
  colors: {
    background: '#0B172A',
    textPrimary: '#FFFFFF',
    textSecondary: '#94A3B8',
    accent: '#2563EB',
  },
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(true);

  const value = useMemo(
    () => ({
      colors: isDark
        ? {
            background: '#0B172A',
            textPrimary: '#FFFFFF',
            textSecondary: '#94A3B8',
            accent: '#2563EB',
          }
        : {
            background: '#FFFFFF',
            textPrimary: '#0F172A',
            textSecondary: '#475569',
            accent: '#1D4ED8',
          },
      toggleTheme: () => setIsDark((prev) => !prev),
    }),
    [isDark],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useTheme = () => useContext(ThemeContext);

export default ThemeContext;
