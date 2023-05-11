import { Footer, Text, Box, ActionIcon, FileInput, Input } from '@mantine/core';
import { useState } from 'react';
import { invoke } from '@tauri-apps/api/tauri';
import image from "../src/images/add.png"

import { open } from '@tauri-apps/api/dialog';



export default function FileAdd() {
  const [file, setFile] = useState('');

  const openFileDialog = async () => {
    const selectedFile = await open({
      multiple: false,
    });
    const response = await invoke(
      'upload_file_from_dir',
      { selectedFile: selectedFile });
    console.log(response);
    setFile(selectedFile);

  }

  return (
    <Footer
      height={60}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }} >
        <Text> Total peers connected: 20</Text>
        <ActionIcon size={48}>

          <Input
            type="button"
            icon={<img src={image} alt="My Image" style={{ width: '60px', height: '60px', marginLeft: 10 }} />}
            onClick={openFileDialog}

          />
        </ActionIcon>

        <Text> Avg Speed: 10 MB/s | 5 MB/s</Text>
      </Box>
    </Footer>
  );
}