import React from 'react';
import deburr from 'lodash/deburr';
import Downshift from 'downshift';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';

import './style.scss';

    let suggestions = [];

    function setSuggestions(Suggestions){
        suggestions= Suggestions;
    }

    function renderInput(inputProps) {
        const { InputProps, ref, ...other } = inputProps;

        return (
            <TextField
                InputProps={{
                    inputRef: ref,
                    ...InputProps,
                }}
                {...other}
            />
        );
    }

    function renderSuggestion({ suggestion, index, itemProps, highlightedIndex, selectedItem }) {
    const isHighlighted = highlightedIndex === index;
    const isSelected = (selectedItem || '').indexOf(suggestion.label) > -1;

    return (
        <MenuItem
        {...itemProps}
        key={suggestion.label}
        selected={isHighlighted}
        component="div"
        style={{
            fontWeight: isSelected ? 500 : 400,
        }}
        >
        {suggestion.label}
        </MenuItem>
    );
    }

    function getSuggestions(value, listSize) {
    const inputValue = deburr(value.trim()).toLowerCase();
    const inputLength = inputValue.length;
    let count = 0;

    return inputLength === 0
        ? []
        : suggestions.filter(suggestion => {
            const keep =
            count < listSize && suggestion.label.slice(0, inputLength).toLowerCase() === inputValue;

            if (keep) {
            count += 1;
            }

            return keep;
        });
    }


export default class autoComplete extends React.Component {
    componentDidMount() {
        this.renderList();
        window.addEventListener("resize", this.renderList);
    }
    renderList() {
        let elem = document.getElementById('downshift-simple-menu');
        elem.style.width = (document.getElementById('autoComplete').clientWidth).toString() + 'px';
    }
    render(){
        setSuggestions(this.props.suggestions);
        return (
            <div className= 'autoComplete' id ='autoComplete'>
                <Downshift id="downshift-simple">
                    {({
                        getInputProps,
                        getItemProps,
                        getMenuProps,
                        highlightedIndex,
                        inputValue,
                        isOpen,
                        selectedItem,
                    }) => (
                            <div className='container'>
                                {renderInput({
                                    fullWidth: true,
                                    InputProps: getInputProps({
                                        placeholder: this.props.hint,
                                    }),
                                })}
                                <div {...getMenuProps()}>
                                    {isOpen ? (
                                        <Paper className= 'paper' square>
                                            {getSuggestions(inputValue, this.props.listSize).map((suggestion, index) =>
                                                renderSuggestion({
                                                    suggestion,
                                                    index,
                                                    itemProps: getItemProps({ item: suggestion.label }),
                                                    highlightedIndex,
                                                    selectedItem,
                                                }),
                                            )}
                                        </Paper>
                                    ) : null}
                                </div>
                            </div>
                        )}
                </Downshift>
            </div>
        );
    }
};  