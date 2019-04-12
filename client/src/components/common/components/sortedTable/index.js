import React from 'react';
import { Menu, MenuItem, InputBase, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, TableSortLabel, Toolbar, Typography, Paper, Checkbox, IconButton, Tooltip } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import SearchIcon from '@material-ui/icons/Search';
import { lighten } from '@material-ui/core/styles/colorManipulator';

import './style.scss';

//Comparies value from two list a, b then returns the comparision
function desc(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

//Sorts Array using comparator function
function stableSort(array, comparator) {
    const stabilizedThis = array.map((item, index) => [item, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map(item => item[0]);
}

//Augment comparator based on sort order 
function getSorting(order, orderBy) {
    return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

//Style variables for toolbar component
const toolbarStyles = theme => ({
    root: {
        paddingRight: theme.spacing.unit,
        justifyContent: 'space-between',
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    spacer: {
        flex: '1 1 100%',
    },
    actions: {
        color: theme.palette.text.secondary,
    },
    title: {
        flex: '0 0 auto',
    },
});


//Base compoenent style variables
const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
    },
    table: {
        minWidth: 1020,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
});

let EnhancedTableToolbar = props => {
    let {state, numSelected, handleMenuClick, handleMenuClose, handleSearch, setTableData, prop } = props;
    return (
        <Toolbar className='toolBar'>
            <div className='toolBarInner'>
                <div className={toolbarStyles.title}>
                    {numSelected > 0 ? (
                        <Typography color="inherit">
                            {numSelected} selected
                        </Typography>
                    ):(   
                        <div>
                            <Typography id="tableTitle">
                                {state.tableSubHeader}
                            </Typography>
                        </div>
                    )}
                </div>
                <div className={toolbarStyles.spacer}/>
                <div className={toolbarStyles.actions}>
                    { numSelected > 0 ? 
                        <Tooltip title="Delete">
                            <IconButton aria-label="Delete">
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                      : state.tableNum > 1 ?
                        <Tooltip title="Filter list">
                            <IconButton onClick={handleMenuClick} aria-label="Filter list">
                                <FilterListIcon />
                            </IconButton>
                        </Tooltip>
                        :
                        ''
                        }
                </div>
            </div>
            <Menu
                id="tableMenu"
                anchorEl={state.anchorEl}
                open={Boolean(state.anchorEl)}
                onClose={handleMenuClose}
            >
                {prop.tables.map((item, index) => {
                    return (
                        <MenuItem key={index} onClick={() => { handleMenuClose(); setTableData(item); }}>{item.tableName}</MenuItem>
                    );
                })}
            </Menu>
            <div className='search'>
                <div className='searchIcon'>
                    <SearchIcon />
                </div>
                <InputBase
                    placeholder="Search…"
                    value={state.searchValue}
                    onChange={value => handleSearch(value.target.value)}
                />
            </div>
        </Toolbar>
    );
};

export default class EnhancedTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            order: 'asc',
            orderBy: '',
            selected: [],
            data: this.props.tables[0],
            page: 0,
            rowsPerPage: this.props.rowsPerPage,
            anchorEl: null,
            searchValue: '',
            tableSubHeader: this.props.tables[0].tableName,
            tableNum : this.props.tables.length
        };

        try {
            this.rows = Object.keys(this.state.data.tableData[0]).map((key, index) => {
                if (key != 'id') {
                    return { id: key, numeric: false, disablePadding: false, label: this.state.data.tableHeaders[index] };
                }
            });
        }
        catch(err){
            this.rows = this.state.data.tableHeaders.map((item, index) => {return { id: item, numeric: false, disablePadding: false, label: this.state.data.tableHeaders[index] }})
        }}

    //Sets state table data
    setTableData = (value) => {
        this.setState({ data: value, tableSubHeader: value.tableName });
        try {
            this.rows = Object.keys(value.tableData[0]).map((key, index) => {
                if (key != 'id') {
                    return { id: key, numeric: false, disablePadding: false, label: value.tableHeaders[index] };
                }
            });
        }
        catch (err) {
            this.rows = value.tableHeaders.map((item, index) => { return { id: item, numeric: false, disablePadding: false, label: value.tableHeaders[index] } })
        }
    }

    createSortHandler = property => event => {
        this.handleRequestSort(event, property);
    };

    //Function to sort tabledata using state searchValue
    filterList = object => {
        for (var i in object) {
            if (typeof object[i] === 'string') {
                if (object[i].toLowerCase().includes(this.state.searchValue.toLowerCase())) return true;
            }
        }
        return false;
    };

    //Sets state table sort key as well as sorting order
    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';

        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }

        this.setState({ order, orderBy });
    };

    //Sets state search value
    handleSearch = (value) => {
        this.setState({ searchValue: value });
    }

    handleSelectAllClick = event => {
        if (event.target.checked) {
            this.setState(state => ({ selected: this.state.data.tableData.map((item, index) => index) }));
            return;
        }
        this.setState({ selected: [] });
    };

    handleMenuClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleMenuClose = () => {
        this.setState({ anchorEl: null });
    };

    //Sets state select row by id
    handleRowClick = (event, id) => {
        const { selected } = this.state;
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        this.setState({ selected: newSelected });
    };
    
    //Sets state page index value
    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    //Sets state rowPerPage value
    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    //checks if index value exists in state selected array
    isSelected = id => this.state.selected.indexOf(id) !== -1;
    

    render() {

        const { classes } = this.props;
        let { order, orderBy, selected, rowsPerPage, page } = this.state;
        let data = this.state.data.tableData.filter(this.filterList)
        const emptyRows = rowsPerPage >= this.state.data.tableData.length? 0 : rowsPerPage - Math.min(rowsPerPage, this.state.data.tableData.length - page * rowsPerPage);

        return (
            <Paper className={styles.root}>
                <EnhancedTableToolbar state= {this.state} prop = {this.props} handleMenuClose={this.handleMenuClose} setTableData={this.setTableData} handleMenuClick={this.handleMenuClick} numSelected={selected.length} handleSearch={this.handleSearch} />
                <div className={styles.tableWrapper + ' mainTable'}>
                    <Table className={styles.table} aria-labelledby="tableTitle">
                        <TableHead>
                            <TableRow>
                                {
                                    this.state.data.editable? 
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                indeterminate={selected.length > 0 && selected.length < data.length}
                                                checked={selected.length === data.length}
                                                onChange={this.handleSelectAllClick}
                                            />
                                        </TableCell>
                                    : undefined
                                }
                                {this.rows.map(row => {
                                    return (
                                        <TableCell
                                            style={{ textAlign: 'center'}}
                                            key={row.id}
                                            numeric={row.numeric}
                                            padding={row.disablePadding ? 'none' : 'checkbox'}
                                            sortDirection={orderBy === row.id ? order : false}
                                        >
                                            <Tooltip
                                                title="Sort"
                                                placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                                                enterDelay={300}
                                            >
                                                <TableSortLabel
                                                    active={orderBy === row.id}
                                                    direction={order}
                                                    onClick={this.createSortHandler(row.id)}
                                                >
                                                    {row.label}
                                                </TableSortLabel>
                                            </Tooltip>
                                        </TableCell>
                                    );
                                }, this)}
                            </TableRow>
                        </TableHead>
                        <TableBody className = 'tableBody'>
                            {stableSort(data.map((item, index) => { return { ...item, id: index }; }), getSorting(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map(n => {
                                    const isSelected = this.isSelected(n.id);
                                    return (
                                        <TableRow
                                            hover
                                            role="checkbox"
                                            aria-checked={isSelected}
                                            tabIndex={-1}
                                            key={n.id}
                                            selected={isSelected}
                                        >
                                            {
                                                this.state.data.editable ?
                                                    <TableCell padding="checkbox">
                                                        <Checkbox checked={isSelected} onClick={event => this.handleRowClick(event, n.id)} />
                                                    </TableCell>
                                                : undefined
                                            }

                                            {
                                                Object.keys(n).map((key, index) => {
                                                    if (key != 'id'){
                                                        return (
                                                            <TableCell  key={index} component="th" scope="row" padding="checkbox">
                                                                {n[key]}
                                                            </TableCell>
                                                        );
                                                    }
                                                })
                                            }
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 48 * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                <TablePagination
                    className="tablePagination"
                    component="div"
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    backIconButtonProps={{
                        'aria-label': 'Previous Page',
                    }}
                    nextIconButtonProps={{
                        'aria-label': 'Next Page',
                    }}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
            </Paper>
        );
    }
}