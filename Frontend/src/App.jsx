import React, { useEffect, useState } from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-javascript'; // Add more if needed
import 'prismjs/components/prism-java';
import 'prismjs/themes/prism-tomorrow.css';
import axios from 'axios';
import SimpleCodeEditor from 'react-simple-code-editor';
import './App.css';

function App() {
  const [code, setCode] = useState(`//🛡️ ChatBot developed by Sahil Usmani \n \n`);
  const [review, setReview] = useState('');

  useEffect(() => {
    Prism.highlightAll();
  }, [review]);

  async function codeReview() {
    try {
      const response = await axios.post('http://localhost:3000/ai/get-review', { code });
      const raw = response.data;

      // Highlight code blocks using Prism
      const formatted = raw.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang = 'javascript', code) => {
        const highlighted = Prism.highlight(code, Prism.languages[lang] || Prism.languages.javascript, lang);
        return `<pre class="language-${lang}"><code>${highlighted}</code></pre>`;
      });

      setReview(formatted);
      setCode('');
    } catch (error) {
      setReview('⚠️ Error reviewing code. Please try again later.');
    }
  }

  return (
    <main>
      <div className="right">
        {
          review
            ? <div dangerouslySetInnerHTML={{ __html: review }} />
            : '🔎 Your code review will appear here.'
        }
      </div>
      <div className="left">
        <div className="code">
          <SimpleCodeEditor
            value={code}
            onValueChange={setCode}
            highlight={(code) =>
              Prism.highlight(code, Prism.languages.javascript, 'javascript')
            }
            padding={10}
            className="code-editor"
            style={{
              fontSize: 14,
              color: '#f8f8f2',
              backgroundColor: '#1e1e1e',
              height: '130px', // ⬅️ Set fixed smaller height
    overflowY: 'auto',
            }}
          />
        </div>
        <button onClick={codeReview} className="review">
          Review Code
        </button>
        <div className="footer">
          🛡️ Code Reviewer ChatBot developed by <strong>Sahil Usmani</strong>
        </div>
      </div>
    </main>
  );
}

export default App;
