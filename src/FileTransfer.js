import React from 'react';
import './App.css';
import { createStyles, Table, Progress, Anchor, Text, Group, ScrollArea, rem, Box, ActionIcon, white, Badge } from '@mantine/core';
import { IconPlayerPause, IconCheckbox, IconFolder, IconSquareArrowLeft, IconSquareArrowRight, IconTrash, IconPlayerPlay } from '@tabler/icons-react';
import FileAdd from './FileAdd';
import { invoke } from '@tauri-apps/api/tauri';
import { listen } from '@tauri-apps/api/event';
import { useState, useEffect, useContext } from 'react';
import FileTransferComponent from './FileTransferComponent';
import { MyContext } from './Context';



export default function FileTransfer() {
  const { transfers, setTransfer } = useContext(MyContext);


  console.log("Bye", transfers)

  const rows = transfers.map((row) => {

    return (

      <FileTransferComponent
        row={row}
        setTransfer={setTransfer}
      />

    );

  });

  return (
    <>
      <Badge className='font-badge' style={{ fontSize: '25px', padding: '20px', marginTop: '20px' }} color="gray" variant="outline">File Transfer</Badge>

      <ScrollArea sx={{ marginTop: "20px" }}>
        <Table sx={{ minWidth: 800 }} verticalSpacing="sm">
          <thead>
            <tr className='font-header'>
              <th>File</th>
              <th>Down</th>
              <th>Up</th>
              <th>Status</th>
              <th>Remaining</th>
              <th>Seed</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </ScrollArea>

      <FileAdd />
    </>
  );

}