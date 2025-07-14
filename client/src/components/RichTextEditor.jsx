import React, { forwardRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';




const RichTextEditor = ({ courseInput, setCourseInput }) => {
  const onChange = (value) => {
    setCourseInput((prevState) => ({ ...prevState, description: value }));

  };

  return <ReactQuill
    theme="snow"
    value={courseInput.description}  
    onChange={onChange} />;

}
export default RichTextEditor;
