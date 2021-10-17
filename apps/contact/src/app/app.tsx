import { ReactElement } from 'react';
import { Button, Card, CardActions, CardContent, createTheme, ThemeProvider, Typography } from '@mui/material';
import { green, purple } from '@mui/material/colors';

export function App(): ReactElement {
  const theme = createTheme({
    palette: {
      primary: {
        main: purple[500],
      },
      secondary: {
        main: green[500],
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Card>
        <CardContent>
          <Typography variant={'h5'}>Contact me</Typography>
        </CardContent>
        <CardActions>
          <Button variant={'contained'}>Teste</Button>
          <Button variant={'contained'} color={'secondary'}>
            Teste
          </Button>
        </CardActions>
      </Card>
    </ThemeProvider>
  );
}
