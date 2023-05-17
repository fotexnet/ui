import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Box from '@mui/material/Box';
import _Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import React, { useMemo } from 'react';

export interface IBreadcrumbsProps {
  url: string;
  map?: Map<string, string>;
}

function Breadcrumbs(props: IBreadcrumbsProps): JSX.Element {
  const parts = useMemo(() => props.url.split('/').filter(label => !!label), [props.url]);
  const activePart = useMemo(() => {
    const active: string = parts.pop() || '';
    return props.map?.get(active) || active;
  }, [parts]);

  return (
    <Box>
      <_Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
        {parts.map((label, linkIndex) => {
          const href = '/' + parts.filter((_, i) => i <= linkIndex).join('/');
          return (
            <Link key={`breadcrumbLink-${label}-${linkIndex}`} underline="hover" color="inherit" href={href}>
              {props.map?.get(label) || label}
            </Link>
          );
        })}
        <Typography color="text.primary">{activePart}</Typography>
      </_Breadcrumbs>
    </Box>
  );
}

export default Breadcrumbs;
