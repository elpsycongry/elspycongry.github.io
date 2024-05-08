import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import * as React from 'react';

export default function SelectSmall() {
    const [status, setStatus] = React.useState('');

    const handleChange = (event) => {
        setStatus(event.target.value);
    };

    const listTestSelect = [
        { id: 1, text: "Hoạt động" },
        { id: 2, text: "Không hoạt động" },
        { id: 3, text: "Đang chờ" }
    ]

    return (
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-select-small-label">Status</InputLabel>
            <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={status}
                label="status"
                onChange={handleChange}
            >
                {listTestSelect.map(item => (
                    <MenuItem value={item.id} key={item.id}>{item.text}</MenuItem>
                ))
                }
                {/* <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem> */}
            </Select>
        </FormControl>
    );
}