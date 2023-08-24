import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { Data } from '../types/data/Data'

interface Props {
    datas: Data[]
}

export default function DataTable(props: Props) {
    return <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell
                        sx={{ fontWeight: 'bold' }}
                        align={'center'}
                    >
                        #
                    </TableCell>
                    <TableCell
                        sx={{ fontWeight: 'bold' }}
                        align={'center'}
                    >
                        Tanggal
                    </TableCell>
                    <TableCell
                        sx={{ fontWeight: 'bold' }}
                        align={'center'}
                    >
                        No Dokumen
                    </TableCell>
                    <TableCell
                        sx={{ fontWeight: 'bold' }}
                        align={'center'}
                    >
                        Keterangan
                    </TableCell>
                    <TableCell
                        sx={{ fontWeight: 'bold' }}
                        align={'center'}
                    >
                        Action
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {props.datas.map((data, index) => (
                <TableRow key={index}>
                    <TableCell 
                        sx={{ fontWeight: 'bold' }}
                        align={'center'}
                    >
                        {index + 1}
                    </TableCell>
                    <TableCell>
                        {data.tanggal}
                    </TableCell>
                    <TableCell>
                        {data.noDokumen}
                    </TableCell>
                    <TableCell>
                        {data.keterangan}
                    </TableCell>
                    <TableCell>
                        Action
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>
}