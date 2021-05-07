import React from 'react'

function InputSuggestion({suggestions ,setInput}) {
    return (
        <div className = 'inputSuggestion'>
            {suggestions.map(suggest => 
                <p key = {suggest} data-value = {suggest} onClick = {(e) => setInput(e)}>
                    {suggest}
                </p>
            )}
        </div>
    )
}

export default InputSuggestion
