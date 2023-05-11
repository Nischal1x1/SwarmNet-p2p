import { TextInput, ActionIcon, useMantineTheme, Skeleton } from '@mantine/core';
import { ChevronRightIcon, MagnifyingGlassIcon, ChevronLeftIcon } from '@modulz/radix-icons';
import { invoke } from '@tauri-apps/api/tauri';
import { useNavigate } from 'react-router-dom';
import { listen } from '@tauri-apps/api/event';
import { useContext, useState } from 'react';
import { MyContext } from './Context';

export function SearhTab(props) {
  const { clickSearch, setClickSearch } = useContext(MyContext);

  const navigate = useNavigate();

  const theme = useMantineTheme();

  const [searchString, setSearchString] = useState("");
  const handleChange = (event) => {
    setSearchString(event.target.value);
  };
  const handleClick = () => {
    const response = invoke(
      'store_string_from_search_tab',
      { searchString: searchString });


    setClickSearch(true);

    navigate("remotefiles");

  };
  return (
    <TextInput
      value={searchString}
      onChange={handleChange}
      icon={<MagnifyingGlassIcon size="1.1rem" stroke={1.5} />}
      radius="md"
      size="md"

      rightSection={
        <ActionIcon size={32} radius="xl" color={theme.primaryColor} variant="filled" onClick={handleClick}>
          {theme.dir === 'ltr' ? (
            <ChevronRightIcon size="1.1rem" stroke={1.5} />
          ) : (
            <ChevronLeftIcon size="1.1rem" stroke={1.5} />
          )}
        </ActionIcon>
      }
      placeholder="Search"
      rightSectionWidth={42}
      {...props}
    />
  );
}