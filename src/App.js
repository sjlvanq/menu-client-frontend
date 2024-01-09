import React from 'react';
import Menu from './components/Menu';
import { lightGreen } from '@mui/material/colors';

function App() {
  return (
    <div className="App" style={{ paddingTop: '10px', paddingBottom: '10px' }}>
		<div style={{width:"100%", textAlign:'center'}}>
      <img src="wlo.png" alt="w-lo logo" style={{ marginBottom: '10px' }} />
      <div style={{ fontSize: '18px', color: lightGreen[500], fontWeight: 'bold' }}>ICO.MENU - LOGO</div>
		</div>
      <Menu />
    </div>
  );
}

export default App;
