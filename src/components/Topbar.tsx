import { Box, Button, Modal, Stack, Typography } from '@mui/material'
import { useState } from 'react'

interface Props {
    sidebarOpen: boolean
    setSidebarOpen(value: boolean): void
}

export default function Topbar(props: Props) {
    const [modalOpen, setModalOpen] = useState<boolean>(false)

    return <Stack
        position={'relative'}
        width={'100vw'}
        height={'4rem'}
        sx={{
            background: '#f0f0f0',
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.3)'
        }}
    >
        <Button
            variant={'contained'}
            color={'primary'}
            sx={{
                position: 'absolute',
                top: '50%',
                left: '1rem',
                transform: 'translateY(-50%)'
            }}
            onClick={() => props.setSidebarOpen(!props.sidebarOpen)}
        >
            Menu
        </Button>
        <Button
            variant={'outlined'}
            color={'primary'}
            sx={{
                position: 'absolute',
                top: '50%',
                right: '1rem',
                transform: 'translateY(-50%)'
            }}
            onClick={() => setModalOpen(!modalOpen)}
        >
            Profile
        </Button>
        <Modal
            open={modalOpen}
            onClose={() => setModalOpen(!modalOpen)}
        >
            <Box
                position={'fixed'}
                width={'17vw'}
                minWidth={'15rem'}
                top={'4rem'}
                right={0}
                sx={{
                    borderRadius: 2,
                    overflow: 'hidden'
                }}
            >
                <Stack
                    width={'100%'}
                    display={'flex'}
                >
                    <Button
                        variant={'contained'}
                        color={'success'}
                        sx={{
                            borderRadius: 0,
                            paddingY: 2
                        }}
                        onClick={() => window.location.assign('/ganti-password')}
                    >
                        <Typography
                            width={'100%'}
                            textAlign={'left'}
                        >
                            Ganti Password
                        </Typography>
                    </Button>
                    <Button
                        variant={'contained'}
                        color={'error'}
                        sx={{
                            borderRadius: 0,
                            paddingY: 2
                        }}
                        onClick={() => {}}
                    >
                        <Typography
                            width={'100%'}
                            textAlign={'left'}
                        >
                            Logout
                        </Typography>
                    </Button>
                </Stack>
            </Box>
        </Modal>
    </Stack>
}