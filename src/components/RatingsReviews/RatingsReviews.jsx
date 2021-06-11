import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import bluebird from 'bluebird';
import axios from 'axios';
import { Grid, Divider } from 'semantic-ui-react';
// import dayjs from 'dayjs';
// import handleTime from '../configFiles/dayjsConfig';
import config from '../../config';

import RatingSummary from './RatingSummary/RatingSummary';
import RatingBreakdown from './RatingBreakdown/RatingBreakdown';
import ProductBreakdown from './ProductBreakdown/ProductBreakdown';
import SortOptions from './SortOptions/SortOptions';
import ReviewList from './ReviewList/ReviewList';
import ListModifierButtons from './ListModifierButtons/ListModifierButtons';

class RatingsReviews extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
      // date: dayjs(),
      productId: props.productId || 27189,
      reviews: [],
      characteristics: [],
      ratings: {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
      },
      recommended: {
        false: 0,
        true: 0,
      },
    };
  }

  componentDidMount() {
    const { productId } = this.state;
    axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-atx/reviews/', {
      headers: {
        Authorization: `${config.token}`,
      },
      params: {
        page: 1,
        count: 200,
        sort: 'newest',
        product_id: productId,
      },
    })
      .then((reviews) => {
        axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-atx/reviews/meta', {
          headers: {
            Authorization: `${config.token}`,
          },
          params: {
            product_id: productId,
          },
        })
          .then((metaReviews) => {
            this.setState({
              loaded: true,
              reviews: reviews.data.results,
              ratings: metaReviews.data.ratings,
              recommended: metaReviews.data.recommended,
              characteristics: metaReviews.data.characteristics,
            });
          });
      });
  }

  render() {
    const {
      loaded,
      ratings,
      recommended,
      reviews,
      characteristics,
    } = this.state;
    if (!loaded) {
      return <div />;
    }
    return (
      <div className="RatingsReviews">
        <Grid centered columns={2}>
          <Grid.Row stretched>
            <Grid.Column width={4}>
              <p>RATINGS & REVIEWS</p>
            </Grid.Column>
            <Grid.Column width={9} />
          </Grid.Row>
          <Grid.Row stretched>
            <Grid.Column width={4}>
              <RatingSummary ratings={ratings} />
              <Divider hidden />
              <RatingBreakdown
                ratings={ratings}
                recommended={recommended}
                total={reviews.length}
              />
              <Divider hidden />
              <ProductBreakdown characteristics={characteristics} />
            </Grid.Column>
            <Grid.Column width={9}>
              <SortOptions count={reviews.length} />
              <ReviewList ratings={ratings} />
              <ListModifierButtons />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

// RatingsReviews.propTypes = {
//   productId: PropTypes.number.isRequired,
// };

export default RatingsReviews;
