import React, { useContext } from 'react';
import { createStyles, Table, Text, Skeleton, ScrollArea, rem, Box, ActionIcon, Badge } from '@mantine/core';
import { IconDownload, IconSquareArrowLeft, IconSquareArrowRight } from '@tabler/icons-react';
import FileAdd from './FileAdd';
import { invoke } from '@tauri-apps/api/tauri';
import { listen } from '@tauri-apps/api/event';
import { useState, useEffect } from 'react';
import { MyContext } from './Context';
import { useNavigate } from 'react-router-dom';


const useStyles = createStyles((theme) => ({
  progressBar: {
    '&:not(:first-of-type)': {
      borderLeft: `${rem(3)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white
        }`,
    },
  },
}));



export default function RemoteFiles() {
  const navigate = useNavigate();

  const { clickSearch, setClickSearch, setTransfer } = useContext(MyContext);



  const [values, setValue] = useState([]);

  useEffect(() => {

    const clickHandle = () => {

      // if (clickSearch == true) {
      // invoke('init_process')
      const fileInfo = listen('event-name', (e) => {
        setValue(e.payload)
        console.log(e)

      });
      if (clickSearch) {
        <Skeleton height={50} width='391%' radius='md' />
      }

      setClickSearch(false)

    }

    clickHandle();
    // console.log("Hello World", values.length)

  },
    [clickSearch, setClickSearch, values]);


  const handleDownloadClick = async (fileHash) => {

    invoke(
      'download_file_from_remotefiles',
      { fileHash: fileHash })

    const transferInfo = await listen("event-transfer", (e) => {
      setTransfer((prev) => {
        return [...prev, ...e.payload]
      })

    })
    navigate("/");

  }

  const rows = values.length ? values.map((row) => {
    return (
      <>
        <tr key={row.name}>

          <td>
            {row.name}

          </td>
          <td>{row.chunks}</td>
          <td>{row.fileHash}</td>

          <td>
            {row.seeds}
          </td>
          <td>
            {row.source}
          </td>
          <td> <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}><ActionIcon onClick={() => { handleDownloadClick(row.fileHash) }} >

            <IconDownload /></ActionIcon></Box></td>


        </tr>

      </>
    );

  }

  ) : (<Skeleton height={100} width='391%' />)


  return (
    <>
      <Badge className='font-badge' style={{ fontSize: '25px', padding: '20px', marginTop: '20px' }} color="gray" variant="outline">Remote Files</Badge>

      <ScrollArea sx={{ marginTop: "20px" }}>
        <Table sx={{ minWidth: 800 }} verticalSpacing="xs">
          <thead>
            <tr className='font-header'>
              <th>Name & size</th>
              <th>Chunks</th>
              <th>File Hash</th>
              <th>Seeds</th>
              <th>Source</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>

        </Table>
      </ScrollArea>

      <FileAdd />

    </>
  );

}