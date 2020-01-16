import React from 'react';
import Box from './components/Box';

const App: React.FC = () => {
  return (
    <>
      <h2>Box</h2>
      <Box padding={20} direction="row" spacing={20} justify="space-between" align="flex-end" wrap={true}>
        <Box margin={[10, 0]}>1</Box>
        <div style={{width: 1000, background: "red"}}>2</div>
      </Box>
    </>
  );
};

export default App;
