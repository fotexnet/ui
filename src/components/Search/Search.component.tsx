import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
import useDebounce from '../../hooks/Debounce/Debounce.hook';

interface IProps {
  onChange: (value: string) => void;
  results: { label: string; link: string }[];
  debounce?: number;
}

function Search(props: SearchProps): JSX.Element {
  const [value, setValue] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useDebounce(() => {
    props.onChange(value);
  }, props.debounce);

  return (
    <Box>
      <TextField
        InputProps={{
          style: { borderRadius: '999px', paddingLeft: 8 },
          startAdornment: <SearchIcon htmlColor="rgba(0, 0, 0, 0.65)" />,
        }}
        inputProps={{ style: { paddingTop: 8, paddingBottom: 8, paddingLeft: 8, paddingRight: 12 } }}
        placeholder="Keresés..."
        onChange={e => setValue(e.target.value)}
      />
      <Menu open={isOpen} onClose={() => setIsOpen(false)}>
        {props.results.map(item => (
          <MenuItem>
            <Link href={item.link}>{item.label}</Link>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}

export default Search;

export type SearchProps = React.PropsWithChildren<IProps>;
