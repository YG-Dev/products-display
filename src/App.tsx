import { createTheme, ThemeProvider } from '@mui/material/styles';
import HomePage from './components/HomePage';

const ThemeApp = () => {
  const theme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <HomePage/>
    </ThemeProvider>
  )
}


function App() {
  return (
      <ThemeApp/>
  );
}

export default App;
