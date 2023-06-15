import Tooltip, { TooltipProps } from '@mui/material/Tooltip';
import Typography, { TypographyProps } from '@mui/material/Typography';
import React, { useMemo } from 'react';

function useTextShortener(text: string, limit: number, options?: TextShortenerOptions): TextShortenerResult {
  const short = useMemo(() => text.substring(0, limit), [text, limit]);
  const isShort = useMemo(() => short.length < text.length, [short, text]);
  const shortened = useMemo(() => (isShort ? short + (options?.delimiter || '...') : short), [isShort, short]);

  return {
    isShort,
    text: shortened,
    tooltip: (
      <Tooltip title={text} {...options?.tooltipProps}>
        <Typography {...options?.typographyProps}>{shortened}</Typography>
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
