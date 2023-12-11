import { Button, Grid, Stack, TextField } from "@mui/material"
import { ChangeEvent } from "react"
import { GetDatasReq } from "../types/data/GetDatasReq"

interface Props {
    getDatasReq: GetDatasReq,
    setGetDatasReq(value: GetDatasReq): void,
    doSearch(): void
}

export default function SearchControl(props: Props) {
    const displayTanggalFrom = () => {
        return <TextField
            label="Tanggal From"
            type="date"
            size="small"
            fullWidth={true}
            defaultValue={props.getDatasReq.tanggalFrom}
            onChange={(event: ChangeEvent<HTMLInputElement>) => props.setGetDatasReq({
                ...props.getDatasReq,
                tanggalFrom: event.target.value
            })}
            sx={{
                background: "white"
            }}
            InputLabelProps={{
                shrink: true,
            }}
        />
    }

    const displayTanggalUntil = () => {
        return <TextField
            label="Tanggal Until"
            type="date"
            size="small"
            fullWidth={true}
            defaultValue={props.getDatasReq.tanggalUntil}
            onChange={(event: ChangeEvent<HTMLInputElement>) => props.setGetDatasReq({
                ...props.getDatasReq,
                tanggalUntil: event.target.value
            })}
            sx={{
                background: "white"
            }}
            InputLabelProps={{
                shrink: true,
            }}
        />
    }

    const displayNoDokumen = () => {
        return <TextField
            label="No Dokumen"
            size="small"
            fullWidth={true}
            defaultValue={props.getDatasReq.noDokumen}
            onChange={(event: ChangeEvent<HTMLInputElement>) => props.setGetDatasReq({
                ...props.getDatasReq,
                noDokumen: event.target.value
            })}
            sx={{
                background: "white"
            }}
        />
    }

    const displayKeterangan = () => {
        return <TextField
            label="Keterangan"
            size="small"
            fullWidth={true}
            defaultValue={props.getDatasReq.keterangan}
            onChange={(event: ChangeEvent<HTMLInputElement>) => props.setGetDatasReq({
                ...props.getDatasReq,
                keterangan: event.target.value
            })}
            sx={{
                background: "white"
            }}
        />
    }

    const displaySearchButton = () => {
        return <Button
            variant="contained"
            color="primary"
            onClick={() => props.doSearch()}
        >
            Search
        </Button>
    }

    return <Stack>
        <Grid container width="100%" columnSpacing={2}>
            <Grid item sm={2}>
                {displayTanggalFrom()}
            </Grid>
            <Grid item sm={2}>
                {displayTanggalUntil()}
            </Grid>
            <Grid item sm={3}>
                {displayNoDokumen()}
            </Grid>
            <Grid item sm={4}>
                {displayKeterangan()}
            </Grid>
            <Grid item sm={1}>
                {displaySearchButton()}
            </Grid>
        </Grid>
    </Stack>
}