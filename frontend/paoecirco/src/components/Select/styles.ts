import styled, { css } from "styled-components";
import React, { useRef, useEffect } from "react";

import ReactSelect from 'react-select';

export const CustomSelect = styled(ReactSelect)`
  border-radius: 10px;
  border: 2px solid black;
  padding: 8px;
  width: 111%;
  color: #666360;
  transition: all 1s;
  align-items: center;
  margin-top: 6px;
  margin-bottom: -7px;
`;

export const NiceDiv = styled.div`
  border-radius: 10px;
  border: 2px solid black;
  padding: 16px;
  width: 100%;
  color: #666360;
  transition: all 1s;
  align-items: center;
`;

export const NicerDiv = styled.div`
  size: 100000px; 
`;