// NPM
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Truncate from 'react-truncate';
import { Popup } from 'semantic-ui-react';

// COMPONENTS
import Rating from '../Rating';
import PriceTag from '../Currency/PriceTag';
import Thumb from './components/Thumb';

// ACTIONS/CONFIG

// STYLES
import { Cart, ContentWrap } from './styles';
import { cardConfig } from 'libs/config';
import { PinIcon } from 'shared_components/icons';
import I18nText from 'shared_components/I18nText';

const Wrap = styled.div`
  display: inline-block;
  width: 300px;
`;

// How did we come up with height: 104px?
// the max number of lines Title can render is 4
// rendered a title that long and saw how many pixels it takes 😜
const Title = styled.h3`
  font-size: 18px;
  font-height: 21px;
  color: #3C434B;
  font-weight: bold;
  margin-bottom: 12px;
  max-height: ${cardConfig.titleHeight};

  a {
    color: inherit;
  }
`;

const Description = styled.div`
  font-size: 14px;
  line-height: 16px;
  color: #545454;
`;

const Price = styled.span`
  color: #3C434B;
  font-size: 14px;
  line-height: 16px;
  font-weight: bold;
`;

const Location = styled.span`
  color: #787878;
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  height: 44px;
  font-size: 12px;
  line-height: 14px;

  svg {
    display: inline-block;
    width: 17px;
    height: 17px;
    margin-right: 2px;
    fill: #d3d7dc;
    position: relative;
    left: -3px;
  }

  p {
    width: 100%;
  }
`;

const ContentFooter = styled.div`
  margin-top: auto;
  position: absolute;
  bottom: 93px;
`;

const Author = styled.div`
  border-top: 1px solid #E5E5E5;
  margin: 0 22px;
  height: 75px;
`;

function formatLocation(location) {
  let result = '';
  if (location.city) {
    result = location.city
    if (location.state) {
      result = result.concat(`, ${location.state}`)
    }
    return result;
  }
  return location.state;
}

export default class TripCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      truncated: false,
    };
  }

  handleTruncate = truncated => {
    if (this.state.truncated !== truncated) {
      this.setState({
        truncated,
      });
    }
  };

  render() {
    return (
      <div>
        {this.state.truncated ? (
          <Popup
            trigger={
              <Wrap>
                <Cart column>
                  <Thumb
                    url={this.props.item.image || "https://please-com.imgix.net/7a7b798deb8064c64f57bff9ffeaa53a_1531363432782-4561574624.jpg?auto=format&dpr=1&crop=faces&fit=crop&w=800&h=500&ixlib=react-7.2.0"}
                    tripCount={this.props.item.partOf}
                    withTooltip={this.props.withTooltip}
                  />
                  <ContentWrap>
                    <Title>
                      <Truncate onTruncate={this.handleTruncate} lines={cardConfig.titleLines}>
                        <I18nText data={this.props.item.title} />
                      </Truncate>
                    </Title>
                    <Location>
                      <PinIcon />
                      <p>
                        <Truncate lines={cardConfig.locationLines}>
                          {formatLocation(this.props.item.location)}
                        </Truncate>
                      </p>
                    </Location>
                    <Rating
                      marginBottom="10px"
                      rating={this.props.item.rating}
                      count={this.props.item.reviews}
                    />
                    From <PriceTag unit="hidden" price={this.props.item.price} />
                  </ContentWrap>
                </Cart>
              </Wrap>
            }
            content={this.props.item.title}
          />
        ) : (
          <Wrap>
            <Cart column>
              <Thumb
                url={this.props.item.image || "https://please-com.imgix.net/7a7b798deb8064c64f57bff9ffeaa53a_1531363432782-4561574624.jpg?auto=format&dpr=1&crop=faces&fit=crop&w=800&h=500&ixlib=react-7.2.0"}
                tripCount={this.props.item.partOf}
                withTooltip={this.props.withTooltip}
              />
              <ContentWrap>
                <Title>
                  <Truncate lines={cardConfig.titleLines}>
                    <I18nText data={this.props.item.title} />
                  </Truncate>
                </Title>
                <Description>
                  <Truncate lines={cardConfig.descriptionLines}>
                    <I18nText data={this.props.item.description} />
                  </Truncate>
                </Description>
                <ContentFooter>
                  <Price>
                    From <PriceTag unit="hidden" price={this.props.item.basePrice}>
                      {({ symbol, convertedPrice }) => `${symbol}${convertedPrice}`}
                    </PriceTag>
                  </Price>
                  <Location>
                    <PinIcon />
                    <p>
                      <Truncate lines={cardConfig.locationLines}>
                        {formatLocation(this.props.item.location)}
                      </Truncate>
                    </p>
                  </Location>
                </ContentFooter>
              </ContentWrap>
              <Author>
              </Author>
            </Cart>
          </Wrap>
        )}
      </div>
    );
  }
}

// Props Validation
TripCart.propTypes = {
  item: PropTypes.shape({
    image: PropTypes.string,
    partof: PropTypes.number,
    title: PropTypes.object,
    description: PropTypes.object,
    rating: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    review: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  withTooltip: PropTypes.bool,
  href: PropTypes.string,
  withShadow: PropTypes.bool,
};

// Default props
TripCart.defaultProps = {
  withTooltip: false,
  withShadow: false,
  href: '/',
};
