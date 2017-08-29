'use strict';

import  React from 'react';
import  Autocomplete from 'react-autocomplete';

class Search extends React.Component {

    handleRenderItem(item, isHighlighted) {

        const listStyle = {
            item: {
                padding: '0',
                cursor: 'pointer'
            },

            highlightedItem: {
                color: 'white',
                background: '#F38B72',
                padding: '0',
                cursor: 'pointer'
            }
        };

        return (
            <div
                style={isHighlighted ? listStyle.highlightedItem : listStyle.item}
                key={item.id}
                id={item.id}>
                {item.title}
            </div>
        );
    }

    render() {

        return (
            <div className="search">

            <Autocomplete
            ref="autocomplete"
            inputProps={{title: "Title"}}
            value={this.props.autoCompleteValue}
            items={this.props.tracks}
            getItemValue={(item) => item.title}
            onSelect={this.props.handleSelect}
            onChange={this.props.handleChange}
            renderItem={this.handleRenderItem.bind(this)} />

            </div>
        );
    }
}

export default Search;
