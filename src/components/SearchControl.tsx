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
            defaultValue={props.getDatasReq.dateFrom}
            onChange={(event: ChangeEvent<HTMLInputElement>) => props.setGetDatasReq({
                ...props.getDatasReq,
                dateFrom: event.target.value
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
            defaultValue={props.getDatasReq.dateUntil}
            onChange={(event: ChangeEvent<HTMLInputElement>) => props.setGetDatasReq({
                ...props.getDatasReq,
                dateUntil: event.target.value
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
            defaultValue={props.getDatasReq.documentNumber}
            onChange={(event: ChangeEvent<HTMLInputElement>) => props.setGetDatasReq({
                ...props.getDatasReq,
                documentNumber: event.target.value
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
            defaultValue={props.getDatasReq.description}
            onChange={(event: ChangeEvent<HTMLInputElement>) => props.setGetDatasReq({
                ...props.getDatasReq,
                description: event.target.value
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