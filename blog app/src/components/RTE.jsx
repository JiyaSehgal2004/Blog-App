// {name, control} - control aata h react-hook-form se
// ye control hi responsible h sari states ko iss component se original form me le jane ke liye

import React from 'react'
import {Editor } from '@tinymce/tinymce-react';
import {Controller } from 'react-hook-form';

// The Controller component wraps the editor component (Editor) and is responsible for managing its state.

// It takes several props:
// name: The name of the field, which is used to identify the field in the form data.
// control: The control object provided by react-hook-form. It contains methods and state related to form control.
// render: A render function that receives an object with a field property, which contains onChange, onBlur, value, and name. This render function is responsible for rendering the actual rich text editor component (Editor in this case) and wiring up its onChange event to the onChange function provided by react-hook-form.

// Inside the render function, the Editor component is rendered with its necessary props:
// initialValue: The initial value of the editor, which is set to defaultValue if provided.
// init: Configuration options for the rich text editor.
// onEditorChange: A callback function that is triggered whenever the content of the editor changes. This function is provided by react-hook-form and is wired up to the onChange event of the editor.

export default function RTE({name, control, label, defaultValue =""}) {
  return (
    <div className='w-full'> 
    {label && <label className='inline-block mb-1 pl-1'>{label}</label>}

    <Controller
    name={name || "content"}
    control={control}
    render={({field: {onChange}}) => (
        <Editor
        initialValue={defaultValue}
        init={{
            initialValue: defaultValue,
            height: 500,
            menubar: true,
            plugins: [
                "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
                "anchor",
            ],
            toolbar:
            "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
            content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
        }}
        onEditorChange={onChange}
        />
    )}
    />
    </div>
  )
}
