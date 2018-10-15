// NPM
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

// COMPONENTS
import { ArrowIcon } from '../icons';
import { DropArrow, PlusIcon, Camera } from '../icons';

// ACTIONS/CONFIG
import { resetButton } from '../../libs/styled';

// STYLES
const size = {
  text: {
    padding: '0',
    fontSize: '16px',
    iconSize: '12px',
  },
  small: {
    padding: '6px 18px',
    fontSize: '16px',
    iconSize: '12px',
  },
  medium: {
    padding: '12px 28px',
    fontSize: '18px',
    iconSize: '12px',
  },
};

const colors = {
  green: '#4FB798',
  lightGreen: '#38D39F',
  lighterGreen: '#B9FFE7',
  greenActive: '#4ac4a1',
  white: '#fff',
  gray: '#d3d7dc',
};

export const theme = {
  mainFilled: {
    background: colors.green,
    backgroundHover: colors.greenActive,
    border: colors.green,
    borderHover: colors.green,
    color: colors.white,
    colorHover: colors.white,
  },
  white: {
    background: 'transparent',
    backgroundHover: colors.green,
    border: colors.green,
    borderHover: colors.greenActive,
    color: colors.green,
    colorHover: colors.white,
  },
  whiteTransparent: {
    background: 'transparent',
    backgroundHover: colors.green,
    border: colors.green,
    borderHover: colors.greenActive,
    color: colors.white,
    colorHover: colors.white,
  },
  allWhite: {
    background: 'transparent',
    backgroundHover: 'transparent',
    border: colors.white,
    borderHover: colors.greenActive,
    color: colors.white,
    colorHover: colors.greenActive,
  },
  textGreen: {
    background: colors.white,
    backgroundHover: colors.white,
    border: colors.white,
    borderHover: colors.white,
    color: colors.green,
    colorHover: colors.greenActive,
  },
  textLightGreen: {
    background: colors.white,
    backgroundHover: colors.greenActive,
    border: colors.lightGreen,
    borderHover: colors.greenActive,
    color: colors.lightGreen,
    colorHover: colors.white,
  },
  fillLightGreen: {
    background: colors.lightGreen,
    backgroundHover: colors.greenActive,
    border: colors.lightGreen,
    borderHover: colors.greenActive,
    color: colors.white,
    colorHover: colors.white,
  },
  fillLighterGreen: {
    background: colors.lighterGreen,
    backgroundHover: colors.lightGreen,
    border: colors.lighterGreen,
    borderHover: colors.lightGreen,
    color: colors.lightGreen,
    colorHover: colors.white,
  },
  icon: {
    background: 'transparent',
    backgroundHover: 'transparent',
    border: 'transparent',
    borderHover: 'transparent',
    color: colors.gray,
    colorHover: colors.gray,
  },
  danger: {
    background: '#dc3545',
    backgroundHover: '#c82333',
    border: '#dc3545',
    borderHover: '#bd2130',
    color: colors.white,
    colorHover: colors.white,
  },
  disabled: {
    background: '#e0e1e2',
    backgroundHover: '#e0e1e2',
    border: '#e0e1e2',
    borderHover: '#e0e1e2',
    color: 'rgba(0,0,0,0.6)',
    colorHover: 'rgba(0,0,0,0.6)',
  },
};

export const Wrap = styled.div`
  display: inline-block;
  width: ${props => props.width};

  > div,
  > label,
  > button,
  > a {
    border-radius: ${props => (props.round ? '25px' : '0')};
    cursor: ${props => (props.theme === 'disabled' ? 'default' : 'pointer')};
    display: inline-block;
    font-size: ${props => props.fontSize || (props.size ? size[props.size].fontSize : 'inherit')};
    height: auto;
    overflow: hidden;
    padding: ${props => (props.size ? size[props.size].padding : '0')};
    text-align: ${props => props.align};
    transition: all 0.1s ease-out;
    font-weight: ${props => (props.bold ? 'bold' : 'normal')};
    width: ${props => props.width};
    ${props =>
      props.align === 'center'
        ? `padding-right: 0;
    padding-left: 0;`
        : ''} svg {
      font-size: ${props => (props.size ? size[props.size].iconSize : '12px')};
    }

    ${props =>
      props.theme &&
      css`
        background: ${theme[props.theme].background};
        border: 1px solid ${theme[props.theme].border};
        color: ${theme[props.theme].color};
        outline: none;

        &:hover,
        &:focus {
          background: ${theme[props.theme].backgroundHover};
          border: 1px solid ${theme[props.theme].borderHover};
          color: ${theme[props.theme].colorHover};

          svg {
            fill: ${theme[props.theme].colorHover};
          }
        }
      `};
  }
`;

export const Btn = styled.button`
  ${resetButton()} height: 100%;
`;

export const IconBefore = styled.span`
  margin-right: 5px;
  display: inline-block;
  width: 12px;
  position: relative;
  top: 1px;
`;

export const IconAfter = styled.span`
  margin-left: 5px;
  display: inline-block;
  width: 12px;
  position: relative;
  top: 1px;
`;

// MODULE
export default class Button extends Component {
  constructor() {
    super();
    this.state = {};
    this.onClick = this.onClick.bind(this);
  }

  getIcon(type) {
    switch (type) {
      case 'arrowDown': {
        return <DropArrow />;
      }
      case 'arrowUp': {
        return <DropArrow style={{ transform: 'rotate(180deg)' }} />;
      }
      case 'arrow': {
        return <ArrowIcon />;
      }
      case 'plus': {
        return <PlusIcon />;
      }
      case 'camera': {
        return <Camera />;
      }
      default:
        return null;
    }
  }

  onClick(ev) {
    // props.disableClick allows to disable the button but keep hover behaviour
    if (this.props.disableClick) {
      return;
    }

    this.props.onClick(ev);
    this.button.blur();
  }

  render() {
    let El;
    if (this.props.element) {
      El = this.props.element;
    } else if (this.props.type === 'link') {
      El = props => (
        <Link to={this.props.href} target={this.props.target} children={this.props.children} />
      );
    } else {
      El = props => (
        <Btn
          innerRef={button => {
            this.button = button;
          }}
          type={this.props.type}
          onClick={this.onClick}
          disabled={this.props.disabled}
          {...props}
        />
      );
    }

    return (
      <Wrap
        theme={this.props.disabled || this.props.disableClick ? 'disabled' : this.props.theme}
        round={this.props.round}
        size={this.props.size}
        align={this.props.align}
        width={this.props.width}
        bold={this.props.bold}
        fontSize={this.props.fontSize}
      >
        <El>
          {this.props.iconBefore && <IconBefore>{this.getIcon(this.props.iconBefore)}</IconBefore>}
          <span>{this.props.text || this.props.children}</span>
          {this.props.iconAfter && <IconAfter>{this.getIcon(this.props.iconAfter)}</IconAfter>}
        </El>
      </Wrap>
    );
  }
}

// Props Validation
Button.propTypes = {
  type: PropTypes.string,
  theme: PropTypes.oneOf(Object.keys(theme)),
  round: PropTypes.bool,
  size: PropTypes.string,
  align: PropTypes.string,
  width: PropTypes.string,
  iconBefore: PropTypes.string,
  iconAfter: PropTypes.string,
  text: PropTypes.string,
  children: PropTypes.node,
  bold: PropTypes.bool,
};

Button.defaultProps = {
  theme: 'mainFilled',
  type: 'button',
  round: true,
  size: 'small',
  align: 'left',
  width: 'auto',
  iconBefore: '',
  iconAfter: '',
  text: '',
  bold: false,
};
