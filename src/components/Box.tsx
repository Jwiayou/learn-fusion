import React from "react";
import styled from "styled-components";

const StyledWrapper = styled.div`
  display: flex;
`;

function Box({children, ...props}) {
  return (
    <StyledWrapper>
      {children}
    </StyledWrapper>
  )
}

export default styled(Box)`
  display: flex;
  height: 20px;
  color: red;
`;