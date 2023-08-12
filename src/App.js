import React, { useState, useEffect } from "react";
import copy from "copy-to-clipboard";
import { ToastContainer, toast } from "react-toastify";
const App = () => {
  const [password, setPassword] = useState("");
  const [passwordLength, setPasswordLength] = useState(8);
  const [includeUppercase, setIncludeUppercase] = useState(false);
  const [includeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSpecialCharacters, setIncludeSpecialCharacters] =
    useState(false);
  const [show, setShow] = useState(false);

  const generatePassword = () => {
    const characters = "abcdefghijklmnopqrstuvwxyz";
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const specialCharacters = "!@#$%^&*<>?/";

    let availableCharacters = characters;
    let generatedPassword = "";

    if (includeUppercase) availableCharacters += uppercase;
    if (includeLowercase) availableCharacters += characters;
    if (includeNumbers) availableCharacters += numbers;
    if (includeSpecialCharacters) availableCharacters += specialCharacters;

    for (let i = 0; i < passwordLength; i++) {
      generatedPassword += availableCharacters.charAt(
        Math.floor(Math.random() * availableCharacters.length)
      );
    }

    setPassword(generatedPassword);
    setShow(true);
  };

  const clearPassword = () => {
    setPassword("");
    setShow(false);
  };

  const copyToClipboard = () => {
    copy(password);
    toast.success("Password Copied!", {
      position: "bottom-center",
      autoClose: 500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };
  return (
    <>
      <ToastContainer
        position="bottom-center"
        autoClose={500}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      <div className="container">
        <h1>Password-Generator</h1>
        <div className="box">
          <p className="description">select options below</p>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="options">
              <div className="option">
                <input
                  type="checkbox"
                  id="checkbox"
                  onChange={(e) =>
                    setIncludeSpecialCharacters(e.target.checked)
                  }
                />
                <label htmlFor="checkbox">Contain special characters?</label>
              </div>
              <div className="option">
                <input
                  type="checkbox"
                  id="checkbox2"
                  onChange={(e) => setIncludeNumbers(e.target.checked)}
                />
                <label htmlFor="checkbox2">Contain numbers?</label>
              </div>
              <div className="option">
                <input
                  type="checkbox"
                  id="checkbox3"
                  onChange={(e) => setIncludeUppercase(e.target.checked)}
                />
                <label htmlFor="checkbox3">Contain uppercase letters?</label>
              </div>
            </div>

            <div className="range">
              <input
                type="range"
                min="0"
                max="20"
                value={passwordLength}
                step="1"
                onChange={(e) => setPasswordLength(e.target.value)}
              />
              <p>{passwordLength}</p>
            </div>

            <button onClick={generatePassword}>Generate</button>

            {show ? (
              <>
                <button onClick={clearPassword} className="clear">
                  Clear
                </button>
                <p value={password}>{password}</p>
                <button onClick={copyToClipboard}>Copy to Clipboard</button>
              </>
            ) : null}
          </form>
        </div>
        <footer>
          Created by : <a href="https://mrcodeiq.com">Mr.CodeIq</a>
        </footer>
      </div>
    </>
  );
};

export default App;
