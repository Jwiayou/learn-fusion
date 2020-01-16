import React from 'react';
import Box from "./components/Box";

const App: React.FC = () => {
  return (
    <>
      <h2>Box</h2>
      <Box padding={20} direction="row" spacing={20} justify="">
        <Box margin={[10, 0]}>1</Box>
        <div>2</div>
      </Box>
    </>
  );
};

export default App;
