import React, { useState } from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, IconButton, TextField, MenuItem, Paper, TableContainer } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { styled } from '@mui/material/styles';

const StyledTable = styled(Table)(({ theme }) => ({
    width: '100%',
    borderCollapse: 'collapse',
}));

const StyledTableHead = styled(TableHead)(({ theme }) => ({
    width: '100%',
    backgroundColor: theme.palette.primary.main,
    '& th': {
        color: theme.palette.common.white,
        fontWeight: 'bold',
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:hover': {
        backgroundColor: theme.palette.action.hover,
    },
}));

export default function DynamicTable({ tableData, tableTitle, metals, onEdit, onDelete }) {
    const [editRowId, setEditRowId] = useState(null);
    const [editFormData, setEditFormData] = useState({});

    const handleEditClick = (row) => {
        setEditRowId(row._id);
        setEditFormData({ ...row });
    };

    const handleEditChange = (e, field) => {
        const value = e.target.value;
        setEditFormData(prev => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleDateChange = (date) => {
        setEditFormData(prev => ({
            ...prev,
            rateDate: date ? date.toISOString() : '',
        }));
    };

    const handleSaveClick = () => {
        onEdit(editFormData);
        setEditRowId(null);
    };

    const handleCancelClick = () => {
        setEditRowId(null);
    };

    return (
        <TableContainer component={Paper}>
            <StyledTable >
                <StyledTableHead>
                    <TableRow>
                        {tableTitle.map(({ title }) => (
                            <TableCell key={title}>
                                {title}
                            </TableCell>

                        ))}
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </StyledTableHead>

                <TableBody>
                    {tableData.map((row) => (
                        <StyledTableRow key={row._id}>
                            {tableTitle.map(({ value }) => {
                                if (editRowId === row._id) {
                                    if (value === 'metal') {
                                        return (
                                            <TableCell key={value}>
                                                <TextField
                                                    select
                                                    value={editFormData.metal || ''}
                                                    onChange={(e) => handleEditChange(e, 'metal')}
                                                    fullWidth
                                                >
                                                    {metals.map(m => (
                                                        <MenuItem key={m} value={m}>{m}</MenuItem>
                                                    ))}
                                                </TextField>
                                            </TableCell>
                                        );
                                    }
                                    else if (value === 'date') {
                                        return (
                                            <TableCell key={value}>
                                                <DatePicker
                                                    value={editFormData.rateDate ? new Date(editFormData.rateDate) : null}
                                                    onChange={handleDateChange}
                                                    renderInput={(params) => <TextField {...params} fullWidth />}
                                                />
                                            </TableCell>
                                        );
                                    }
                                    else {
                                        return (
                                            <TableCell key={value}>
                                                <TextField
                                                    value={editFormData[value] || ''}
                                                    onChange={(e) => handleEditChange(e, value)}
                                                    fullWidth
                                                />
                                            </TableCell>
                                        );
                                    }
                                }
                                return (
                                    <TableCell key={value}>
                                        {value === 'date' && row.rateDate
                                            ? new Date(row.rateDate).toLocaleDateString()
                                            : row[value] !== undefined ? row[value] : '-'}
                                    </TableCell>
                                );
                            })}
                            <TableCell>
                                {editRowId === row._id ? (
                                    <>
                                        <IconButton color="primary" onClick={handleSaveClick} aria-label="save">
                                            <SaveIcon />
                                        </IconButton>
                                        <IconButton color="secondary" onClick={handleCancelClick} aria-label="cancel">
                                            <CancelIcon />
                                        </IconButton>
                                    </>
                                ) : (
                                    <>
                                        <IconButton color="primary" onClick={() => handleEditClick(row)} aria-label="edit">
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton color="error" onClick={() => onDelete && onDelete(row)} aria-label="delete">
                                            <DeleteIcon />
                                        </IconButton>
                                    </>
                                )}
                            </TableCell>
                        </StyledTableRow >
                    ))}
                </TableBody>
            </StyledTable>
        </TableContainer>
    );
};

