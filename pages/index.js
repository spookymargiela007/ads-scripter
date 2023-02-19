import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';
import { useState } from 'react';


const Home = () => {
  const [userInput, setUserInput] = useState('');
  const [apiOutput, setApiOutput] = useState('')
const [isGenerating, setIsGenerating] = useState(false)

const callGenerateEndpoint = async () => {
  setIsGenerating(true);
  
  console.log("Calling OpenAI...")
  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userInput }),
  });

  const data = await response.json();
  const { output } = data;
  console.log("OpenAI replied...", output.text)

  setApiOutput(`${output.text}`);
  setIsGenerating(false);
}

  const onUserChangedText = (event) => {
    console.log(event.target.value);
    setUserInput(event.target.value);
  };  

  return (
    <div className="root">
      <Head>
        <title>Scriptly | Campaign Managment Automation for Google and Microsoft Ads </title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>Scripts Made Easy for Ads Campaign Management.</h1>
          </div>
          <div className="header-subtitle">
            <h2>Experience 5x productivity with custom AI-powered Google and Microsoft Ads scripts for campaign managment and automation.</h2>
          </div>
        </div>
        {/* Prompt container or box for user input*/}
        <div className="prompt-container">
          <textarea 
          placeholder="Generate a Google Ads script to increase <campaign> daily budget by 10% if Impression Share Lost by Budget over the last 7-days is greater than 5%." 
          className="prompt-box"
          value={userInput}
          onChange={onUserChangedText}
        />
          {/* Generate result button*/}
  <div className="prompt-buttons">
  <a
    className={isGenerating ? 'generate-button loading' : 'generate-button'}
    onClick={callGenerateEndpoint}
  >
    <div className="generate">
    {isGenerating ? <span className="loader"></span> : <p>Generate</p>}
      </div>
    </a>
  </div>

  {/* Response output onto page */}
  {apiOutput && (
  <div className="output">
    <div className="output-header-container">
      <div className="output-header">
        <h3>Instructions</h3>
      </div>
    </div>
    <div className="output-content">
      {apiOutput
        .split('\n')
        .map((line, index) => {
          if (line.startsWith('```')) {
            return (
              <pre key={index}>
                <code className="code-editor">
                  {apiOutput
                    .split('\n')
                    .slice(index + 1, apiOutput.split('\n').indexOf('```', index + 1))
                    .join('\n')}
                </code>
              </pre>
            );
          } else {
            return <p key={index}>{line}</p>;
          }
        })}
    </div>
  </div>
)}

</div></div>
      <div className="badge-container grow">
        <a
          href="https://buildspace.so/builds/ai-writer"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            <Image src={buildspaceLogo} alt="buildspace logo" />
            <p>build with buildspace</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Home;
