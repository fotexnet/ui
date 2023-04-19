import Tooltip, { TooltipProps } from '@mui/material/Tooltip';
import Typography, { TypographyProps } from '@mui/material/Typography';
import React, { useMemo } from 'react';

function useTextShortener(text: string, limit: number, options?: TextShortenerOptions): TextShortenerResult {
  const short = useMemo(() => text.substring(0, limit) + (options?.delimiter || '...'), [text, limit]);
  return {
    isShort: short.length < text.length,
    text: short,
    tooltip: (
      <Tooltip title={text} {...options?.tooltipProps}>
        <Typography {...options?.typographyProps}>{short}</Typography>
      </Tooltip>
    ),
  };
}

export default useTextShortener;

export type TextShortenerResult = { isShort: boolean; text: string; tooltip: JSX.Element };
export type TextShortenerOptions = {
  delimiter?: string;
  tooltipProps?: Omit<TooltipProps, 'children' | 'title'>;
  typographyProps?: Omit<TypographyProps, 'children'>;
};
