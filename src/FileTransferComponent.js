import React from 'react'

import './App.css';
import { Progress, Box, ActionIcon, white } from '@mantine/core';
import { IconPlayerPause, IconCheckbox, IconFolder, IconTrash, IconPlayerPlay } from '@tabler/icons-react';
import { invoke } from '@tauri-apps/api/tauri';
import { useState, useEffect } from 'react';

const FileTransferComponent = ({ row, setTransfer }) => {

    const [paused, setPaused] = useState(false);
    const [progressColor, SetProgressColor] = useState('gray');
    const [progressText, setProgressText] = useState('Initializing download');

    useEffect(() => {
        console.log(row?.status)
        if (row?.status > 0 && row?.status < 100) {
            setProgressText('Downloading');
            SetProgressColor('blue');
        } else if (row?.staus === 100) {
            setProgressText('Seeding');
            SetProgressColor('green')
        }



    },
        [row]
    );



    const handleDeleteofDowloadedFile = (file) => {
        setTransfer((prev) => {
            return prev.filter((row) => row.file !== file);

        });

    };

    const handlePausePlay = () => {
        setPaused((prevPaused) => !prevPaused);
    };

    async function handleClickofDownloadedFile() {

        await invoke("open_file_location_of_recenlty_downloaded_file");
    }


    const progressTextStyle = {
        position: "absolute",
        marginLeft: 20,
        color: "white",
        marginTop: -14,
        textTransform: 'uppercase',
        fontFamily: "Monospace",
        fontSize: 11
    };
    return (

        <tr key={row?.file}>

            <td>
                <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
                    {row?.status === 100 ? (<IconCheckbox color={'#40bf55'} />) :
                        (<ActionIcon onClick={handlePausePlay}>
                            {paused ? (<IconPlayerPlay />) : (<IconPlayerPause />)}
                        </ActionIcon>)}
                    {row?.file}
                </Box>
            </td>
            <td>{row?.down}</td>
            <td>{row?.up}</td>
            <td>

                <Progress
                    value={row?.status}
                    color={progressColor}
                    size="lg"
                    radius="xl"
                    styles={{ root: { width: 200 } }}
                />
                <div style={progressTextStyle}>
                    {`${progressText} ${row?.status < 100 ? row?.status : ""}%`}
                </div>
            </td>
            <td>
                {row?.remaining}
            </td>
            <td>
                {row?.seed}
            </td>
            <td> <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}><ActionIcon onClick={() => handleDeleteofDowloadedFile(row?.file)}><IconTrash className='delete-icon' /></ActionIcon><ActionIcon onClick={handleClickofDownloadedFile}><IconFolder className='file-explorer' /></ActionIcon ></Box></td>


        </tr>

    )
}

export default FileTransferComponent;