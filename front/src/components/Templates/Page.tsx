import { ReactNode } from 'react';
import { Container, Typography, Toolbar, AppBar } from '@mui/material';

interface ITemplate {
  children: ReactNode;
  title?: string;
}

const PageTemplate = ({ children, title }: ITemplate) => {
  return (
    <>
      <header>
        <AppBar position='static'>
          <Toolbar>
            <Typography variant='h6' color='inherit' component='div'>
              Taller de autos {title ? '-' : ''} {title || ''}
            </Typography>
          </Toolbar>
        </AppBar>
      </header>

      <Container maxWidth='xl' component='main'>
        {children}
      </Container>

      <Container
        maxWidth='md'
        component='footer'
        sx={{
          borderTop: (theme) => `1px solid ${theme.palette.divider}`,
          mt: 8,
          py: [3, 6],
        }}
      >
        Andres U.
      </Container>
    </>
  );
};

export default PageTemplate;
