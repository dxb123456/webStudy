import './App.css';
import React, {useState} from 'react';

function App() {
    const [content, setContent] = useState('hello,world!')

    return (
        <div className="App" data-testid="container">
            <h3 onClick={()=>{
                setContent('hello,jack!')
            }}>{content}</h3>
        </div>
    );
}

export default App;
