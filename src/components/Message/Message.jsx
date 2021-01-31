import React from 'react';
import PropTypes from 'prop-types';

import './message.scss';

import Locale from '../../locale';
const locale = Locale.messages;

const Message = ({ message }) => (
  <>
    <span className='message'>{locale[message] || locale.DEFAULT}</span>
  </>
);

// Message.propTypes = {
//   message: PropTypes.string.isRequired
// };

export default Message;
