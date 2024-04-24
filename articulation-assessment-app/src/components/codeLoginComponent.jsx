import React, { useState } from 'react';
import "./css/Login.Module.css";
const codeLoginComponent = () => {

  return (
    <>
      <div className='codeLogin'>
        <div class="radio-group">
          <input type="radio" id="option1" name="options" checked></input>
          <label for="option1">Child login</label>
          
          <input type="radio" id="option2" name="options" ></input>
          <label for="option2">Parent login</label>
        </div>
        <div className='information'>
          <p className='testCode'>Test code</p>
          <div className='inputContainer'>
          <input className='codeInput'></input>
          <button className='buttonLogin'>Log in</button>
          </div>
        </div>
      </div>
 </> );
}

export default codeLoginComponent;
