import { memo } from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/PrimaryButton.module.css';

const PrimaryButton = ({ label, onPress = () => {} }) => (
  <button
    type="button"
    className={styles.button}
    onClick={onPress}
    aria-label={label}
  >
    <span className={styles.label}>{label}</span>
  </button>
);

PrimaryButton.propTypes = {
  label: PropTypes.string.isRequired,
  onPress: PropTypes.func,
};

export default memo(PrimaryButton);
