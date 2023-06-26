import React, { useEffect, useState } from 'react';

export default function Editable() {
    const [content, setContent] = React.useState("")

    const onContentBlur = React.useCallback(evt => setContent(evt.currentTarget.innerHTML))

    return (
        <div style={{height: "2rem"}}
            contentEditable
            onBlur={onContentBlur}
            dangerouslySetInnerHTML={{ __html: content }} />
    )
}