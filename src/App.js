import React, { useState } from 'react';

function App() {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleTranslate = async () => {
    console.log("click me");
    try {
      const response = await fetch('http://localhost:5000/api/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: inputText }),
      });

      if (!response.ok) {
        throw new Error('Translation request failed');
      }

      const data = await response.json();
      setTranslatedText(data.translated_text);
    } catch (error) {
      console.error('Translation error:', error);
    }
  };

  return (
    <div>
      <h1>Web Translate</h1>
      <textarea
        rows="5"
        placeholder="Enter Vietnamese text..."
        value={inputText}
        onChange={handleInputChange}
      />
      <button onClick={handleTranslate}>Translate</button>
      <p>Translated Text:</p>
      <div>{translatedText}</div>
    </div>
  );
}

export default App;
