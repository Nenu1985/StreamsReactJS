import React from 'react';
import LanguageContext from './contexts/LangugageContext';

class Field extends React.Component {

    getTextDependingOnLanguage() {
        switch (this.context) {
            case 'dutch':
                return 'Naam'
            case 'russian':
                return 'Имя'
            default:
                return 'Name'
        }
    }
    render() {
        return (
            <div className="ui field">
                <label>{this.getTextDependingOnLanguage()}</label>
                <input ></input>
            </div>
        )
    }
}

Field.contextType = LanguageContext;
export default Field;
