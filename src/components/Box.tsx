import React, { PropsWithChildren, ReactElement, CSSProperties } from 'react';
import styled from 'styled-components';
import { isNumber, isArray, isObject } from 'lodash';

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
  .wrap {
    flex-wrap: wrap;
  }
`;

function Box({
  spacing,
  direction = 'column',
  wrap,
  padding,
  margin,
  children,
  justify,
  align,
}: PropsWithChildren<{
  spacing?: number;
  direction?: 'row' | 'column';
  wrap?: boolean;
  padding?: number | number[];
  margin?: number | number[];
  justify?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around';
  align?: 'flex-start' | 'center' | 'flex-end' | 'baseline' | 'stretch';
}>) {
  function renderChildren() {
    if (!isNumber(spacing)) return children;
    return React.Children.map(children, (node, index) => {
      if (isObject(node) && 'props' in node) {
        switch (index) {
          case 0:
            return node;
          case React.Children.toArray(children).length - 1:
            return React.cloneElement(node as ReactElement, {
              ...node.props,
              style: {
                ...node.props.style,
                margin: direction === 'column' ? `${spacing / 2}px 0 0` : `0  0 0 ${spacing / 2}px`,
              },
            });
          default:
            return React.cloneElement(node as ReactElement, {
              ...node.props,
              style: {
                ...node.props.style,
                margin: direction === 'column' ? `${spacing / 2}px 0` : `0 ${spacing / 2}px`,
              },
            });
        }
      } else {
        return node;
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
      <div className={`box ${direction} ${wrap && 'wrap'}`} style={style}>
        {renderChildren()}
      </div>
    </StyledWrapper>
  );
}

export default Box;
