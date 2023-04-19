import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import React, { useMemo } from 'react';

interface IProps {
  Logo?: JSX.Element;
  backgroundColor?: string;
}

function Header({ Logo, children, backgroundColor }: HeaderProps): JSX.Element {
  const color = useMemo(() => {
    const isCss = /(?:#|0x)(?:[a-f0-9]{3}|[a-f0-9]{6})\b|(?:rgb|hsl)a?\([^)]*\)/.test(backgroundColor || '');
    return isCss ? { style: { backgroundColor } } : { className: backgroundColor };
  }, [backgroundColor]);

  return (
    <Box sx={{ py: 2 }} {...color}>
      <Container maxWidth={false} sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box>{Logo}</Box>
        <Box display="flex" alignItems="center" gap={2}>
          {children}
        </Box>
      </Container>
    </Box>
  );
}

export default Header;

export type HeaderProps = React.PropsWithChildren<IProps>;
