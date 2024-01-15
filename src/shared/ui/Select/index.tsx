import styled, {css} from "styled-components";
import React, {useState} from "react";
import {ReactComponent as ExpandMore} from "shared/images/expand-more.svg";
import {ReactComponent as Close} from "shared/images/close.svg";


const SelectContainer = styled.div`
  position: relative;
  margin: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
`

const SelectLabel = styled.p`
  font-weight: 400;
  font-size: 0.9rem;
  margin: 0;
`

const SelectLabelButton = styled.button`
  padding: 0.3rem 0.5rem;
  text-align: start;
  min-width: 12rem;
  font-size: 0.9rem;
  font-weight: 500;
  background-color: #363636;
  color: #d3d3d3;
  display: flex;
  align-items: center;
  justify-content: end;
  border: none;
  cursor: pointer;
  box-shadow: 0 0 5px 0 #464646;
  transition: 0.3s ease;

  &:hover {
    background-color: #5d5d5d;
  }
`;

const SelectLabelArrow = styled(ExpandMore)<{ open: boolean }>`
  transition: all 0.2s;
  ${(p) =>
          p.open && css`
            transform: rotateX(180deg);
          `}
`

const CloseButton = styled(Close)`
  transition: all .2s;
  display: block;
  margin-left: auto;
  opacity: 0.6;
    & :hover {
      color: dodgerblue;
      opacity: 1;
    }
`

const DropdownStyle = styled.div<{ isVisible: boolean }>`
  position: absolute;
  top: 30px;
  right: 0;
  max-height: 20vmax;
  min-width: 12rem;
  max-width: 17rem;
  overflow-x: hidden;
  overflow-y: scroll;
  text-overflow: ellipsis;
  display: flex;
  flex-direction: column;
  background-color: #363636;
  box-sizing: border-box;
  transition: max-height 0.2s ease;

  ${(p) =>
          p.isVisible !== true &&
          css`
            max-height: 40px;
            visibility: hidden;
          `}
  &::-webkit-scrollbar {
    opacity: 1;
  }

  &::-webkit-scrollbar-track {
    background-color: #4b4b4b;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #606060;
  }
`;

const DropdownItem = styled.div<{ active: boolean }>`
  display: flex;
  align-items: center;
  width: 90%;
  padding: 0.4rem 0.5rem;
  font-size: 0.9rem;
  font-weight: 400;
  color: #d3d3d3;
  cursor: pointer;

  ${(p) =>
          p.active &&
          css`
            color: dodgerblue;
            font-weight: 500;
          `}
  &:hover, :focus, :focus:hover {
    background-color: dodgerblue;
    color: #d3d3d3;
    outline: none;
  }
`;

interface Props {
    label: string,
    values: string[],
    onChange: (value: string | null) => void,
}


function Select({label, values, onChange}: Props) {
    const [currentValue, setCurrentValue] = useState('');
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (value: string) => {
        setCurrentValue(value)
        onChange(value);
        handleClose();
    };

    const handleClean = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
        e.stopPropagation()
        setCurrentValue('')
        onChange(null)
    }


    return (
        <SelectContainer>
            <SelectLabel>{label}</SelectLabel>
            <SelectLabelButton onClick={handleOpen}>
                {currentValue !== "" ? currentValue : ''}
                {currentValue && <CloseButton onClick={handleClean}/>}
                <SelectLabelArrow  open={open}/>
            </SelectLabelButton>
            <DropdownStyle isVisible={open}>
                {values.map((value, index) => (
                    <DropdownItem
                        onClick={() => handleChange(value)}
                        active={value === currentValue}
                        key={index}
                    >
                        {value}
                    </DropdownItem>
                ))}
            </DropdownStyle>
        </SelectContainer>
    );
}


export default Select;