import React from 'react';
import LanguageContext from './contexts/LangugageContext';

class Button extends React.Component {

    // Hooking up the context to our class. contextType is a very specific field.
    // We can't name it in another way.
    static contextType = LanguageContext;

    render() {

        return (
            <button className="ui button primary" >
                Submit
            </button>
        )
    }
}
// Another way to hook up the context:
// ---> '' Button.contextType = LanguageContext; ''

export default Button;
