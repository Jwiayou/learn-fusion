import React, { PropsWithChildren, ReactElement, CSSProperties } from 'react';
import styled from 'styled-components';
import { isNumber, isArray } from 'lodash';

const StyledWrapper = styled.div`
  .box {
    display: flex;
  }
  .row {
    flex-display: row;
  }
  .column {
    flex-direction: column;
  }
`;

function Box({
  spacing,
  direction = 'column',
  padding,
  margin,
  children,
  justify,
  align,
}: PropsWithChildren<{
  spacing?: number;
  direction?: 'row' | 'column';
  padding?: number | number[];
  margin?: number | number[];
  justify?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around';
  align?: 'flex-start' | 'center' | 'flex-end' | 'baseline' | 'stretch';
}>) {
  function renderChildren() {
    if (!isNumber(spacing)) return children;
    return React.Children.map(children, (node, index) => {
      switch (index) {
        case 0:
          return node;
        case React.Children.toArray(children).length - 1:
          return React.cloneElement(node as ReactElement, {
            style: { margin: direction === 'column' ? `${spacing / 2}px 0 0` : `0  0 0 ${spacing / 2}px` },
          });
        default:
          return React.cloneElement(node as ReactElement, {
            style: { margin: direction === 'column' ? `${spacing / 2}px 0` : `0 ${spacing / 2}px` },
          });
      }
    });
  }

  /**** set style begin****/
  const style: CSSProperties = {};
  if (padding) {
    if (isNumber(padding)) {
      style.padding = padding;
    }
    if (isArray(padding)) {
      style.padding = padding.slice(0, 4).join('px ') + 'px';
    }
  }
  if (margin) {
    if (isNumber(margin)) {
      style.margin = margin;
    }
    if (isArray(margin)) {
      style.margin = margin.slice(0, 4).join('px ') + 'px';
    }
  }
  if (align) {
    style.alignItems = align;
  }
  if (justify) {
    style.justifyContent = justify;
  }
  /**** set style end****/

  return (
    <StyledWrapper>
      <div className={`box ${direction}`} style={style}>
        {renderChildren()}
      </div>
    </StyledWrapper>
  );
}

export default Box;
