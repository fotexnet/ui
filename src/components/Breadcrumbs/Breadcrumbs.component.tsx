import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Box from '@mui/material/Box';
import _Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import React, { useMemo } from 'react';

export interface IBreadcrumbsProps {
  url: string;
  map?: Map<string, string | ClickableLabel>;
}

function Breadcrumbs(props: IBreadcrumbsProps): JSX.Element {
  const parts = useMemo(() => props.url.split('/').filter(label => !!label), [props.url]);
  const activePart = useMemo(() => {
    const active: string = parts.pop() || '';
    const _label = props.map?.get(active) || active;
    return isClickableLabel(_label) ? _label.label : _label;
  }, [parts]);

  return (
    <Box>
      <_Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
        {parts.map((label, linkIndex) => {
          const href = '/' + parts.filter((_, i) => i <= linkIndex).join('/');
          const _label = props.map?.get(label) || label;
          const currentLabel = isClickableLabel(_label) ? _label.label : _label;
          const clickable = isClickableLabel(_label) ? _label.clickable : true;

          return clickable ? (
            <Link key={`breadcrumbLink-${label}-${linkIndex}`} underline="hover" color="inherit" href={href}>
              {currentLabel}
            </Link>
          ) : (
            <Typography key={`breadcrumbLink-${label}-${linkIndex}`} color="inherit">
              {currentLabel}
            </Typography>
          );
        })}
        <Typography color="text.primary">{activePart}</Typography>
      </_Breadcrumbs>
    </Box>
  );
}

export default Breadcrumbs;

export type ClickableLabel = { label: string; clickable: boolean };

export function isClickableLabel(obj: unknown): obj is ClickableLabel {
  return typeof obj === 'object' && !!obj && obj.hasOwnProperty('label') && obj.hasOwnProperty('clickable');
}
