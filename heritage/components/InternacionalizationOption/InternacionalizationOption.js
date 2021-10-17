import React from 'react';

export default function InternacionalizationOption(props) {
    const selected = (props.selected);
    return (<a onClick={props.language}>{selected?<b>{props.option}</b>:props.option}</a>);
}