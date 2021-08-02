import React, {useState} from 'react';

const ContextMain = () => {
    const [language, setLanguage] = useState('english')

    const onLanguageChange = (lang) => {
        setLanguage(lang)
    }

    return (
        <div className="ui container">
            <div>
                Select a language:
                <i className="flag us" onClick={() => onLanguageChange('english')}/>
                <i className="flag ru" onClick={() => onLanguageChange('russian')}/>
                <i className="flag nl" onClick={() => onLanguageChange('dutch')}/>
            </div>
            <div>{language}</div>
        </div>
    )
}

export default ContextMain;
