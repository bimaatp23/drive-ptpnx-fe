import { Button, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, TextField } from "@mui/material"
import { ChangeEvent, KeyboardEvent } from "react"
import { Category } from "../types/category/Category"
import { GetDatasReq } from "../types/data/GetDatasReq"
import { Locker } from "../types/locker/Locker"

interface Props {
    getDatasReq: GetDatasReq
    categorys: Category[]
    lockers: Locker[]
    setGetDatasReq(value: GetDatasReq): void
    doSearch(): void
}

export default function SearchControl(props: Props) {
    const handleOnEnter = (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Enter") {
            props.doSearch()
        }
    }

    const displayDateFrom = () => {
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
            onKeyDown={handleOnEnter}
        />
    }

    const displayDateUntil = () => {
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
            onKeyDown={handleOnEnter}
        />
    }

    const displayDocumentNumber = () => {
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
            onKeyDown={handleOnEnter}
        />
    }

    const displayDescription = () => {
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
            onKeyDown={handleOnEnter}
        />
    }

    const displayCategory = () => {
        return <FormControl fullWidth>
            <InputLabel id="label-category" size="small">Kategori</InputLabel>
            <Select
                name="categoryId"
                label="Kategori"
                size="small"
                value={props.getDatasReq.categoryId}
                onChange={(event: SelectChangeEvent<string>) => props.setGetDatasReq({
                    ...props.getDatasReq,
                    categoryId: event.target.value
                })}
                labelId="label-category"
                sx={{ background: "white" }}
            >
                <MenuItem>No Filter</MenuItem>
                {props.categorys.map((category) => {
                    return <MenuItem value={category.id}>{category.name}</MenuItem>
                })}
            </Select>
        </FormControl>
    }

    const displayLocker = () => {
        return <FormControl fullWidth>
            <InputLabel id="label-locker" size="small">Loker</InputLabel>
            <Select
                name="lockerId"
                label="Loker"
                size="small"
                value={props.getDatasReq.lockerId}
                onChange={(event: SelectChangeEvent<string>) => props.setGetDatasReq({
                    ...props.getDatasReq,
                    lockerId: event.target.value
                })}
                labelId="label-locker"
                sx={{ background: "white" }}
            >
                <MenuItem>No Filter</MenuItem>
                {props.lockers.map((locker) => {
                    return <MenuItem value={locker.id}>{locker.name}</MenuItem>
                })}
            </Select>
        </FormControl>
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
            <Grid item sm={1.5}>
                {displayDateFrom()}
            </Grid>
            <Grid item sm={1.5}>
                {displayDateUntil()}
            </Grid>
            <Grid item sm={2}>
                {displayDocumentNumber()}
            </Grid>
            <Grid item sm={3}>
                {displayDescription()}
            </Grid>
            <Grid item sm={2}>
                {displayCategory()}
            </Grid>
            <Grid item sm={1}>
                {displayLocker()}
            </Grid>
            <Grid item sm={1}>
                {displaySearchButton()}
            </Grid>
        </Grid>
    </Stack>
}