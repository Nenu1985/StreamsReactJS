import React from 'react';
import LanguageContext from './contexts/LangugageContext';
import ColorContext from './contexts/ColorContext';

class Button extends React.Component {

    // Hooking up the context to our class. contextType is a very specific field.
    // We can't name it in another way.
    // static contextType = LanguageContext;


    getTextDependingOnLanguage(language) {

        switch (language) {
            case 'dutch':
                return 'Voorleggen'
            case 'russian':
                return 'Подтвердить'
            default:
                return 'Submit'
        }
    }
    renderButton(color) {
        return (
            <button className={`ui button ${color}`} >
                <LanguageContext.Consumer>
                    {(value) => this.getTextDependingOnLanguage(value)}
                </LanguageContext.Consumer>
            </button>
        )
    }
    render() {
        // const className = {`ui button primary ${d}`}
        return (
            <ColorContext.Consumer>
                { (color) => this.renderButton(color)}
            </ColorContext.Consumer>
        )
    }
}
// Another way to hook up the context:
// ---> '' Button.contextType = LanguageContext; ''

export default Button;
