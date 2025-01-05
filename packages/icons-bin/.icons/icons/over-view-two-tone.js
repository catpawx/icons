
  import React from 'react';
  import PropTypes from 'prop-types';

  const OverViewTwoTone = (props) => {
    const { color, size, ...otherProps } = props;
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...otherProps}>
        <path d="M15.5518 1.5C15.3516 1.5 15.1537 1.5085 14.9571 1.5267C14.7156 1.54853 14.491 1.6599 14.3275 1.83893C14.1639 2.01795 14.0733 2.25168 14.0734 2.49415V8.54035C14.0734 8.7979 14.1757 9.0449 14.3578 9.22701C14.5399 9.40913 14.7869 9.51144 15.0444 9.51144H21.0919C21.3343 9.51151 21.5681 9.42088 21.7471 9.25735C21.9261 9.09382 22.0375 8.86924 22.0593 8.62775C22.1418 7.72336 22.0349 6.8117 21.7453 5.95094C21.4558 5.09018 20.99 4.29923 20.3777 3.62856C19.7654 2.95788 19.02 2.42221 18.1891 2.05571C17.3582 1.68922 16.46 1.49996 15.5518 1.5ZM16.0155 7.56927L16.0143 3.46523C17.0663 3.57258 18.0491 4.03942 18.7969 4.78704C19.5448 5.53467 20.0119 6.51731 20.1196 7.56927H16.0155Z" fill="#C6DDF4"></path><path d="M10.7886 1.8727C11.1083 1.83439 11.4301 1.92464 11.6833 2.1236C11.9364 2.32256 12.1001 2.61393 12.1385 2.93361C12.1768 3.25329 12.0865 3.5751 11.8876 3.82824C11.6886 4.08137 11.3972 4.24511 11.0775 4.28342C9.60212 4.46268 8.20685 5.05329 7.0511 5.98777C5.89535 6.92226 5.02572 8.16295 4.54153 9.56815C4.05734 10.9733 3.9781 12.4864 4.31288 13.9345C4.64766 15.3826 5.38295 16.7073 6.43478 17.7574C7.4866 18.8075 8.81255 19.5406 10.2612 19.873C11.7098 20.2053 13.2227 20.1236 14.6271 19.6371C16.0315 19.1506 17.2708 18.2789 18.2033 17.1216C19.1359 15.9643 19.7242 14.5681 19.9011 13.0924C19.9424 12.7756 20.1069 12.488 20.3589 12.2917C20.6109 12.0955 20.9301 12.0065 21.2473 12.044C21.5645 12.0816 21.8541 12.2426 22.0534 12.4922C22.2526 12.7419 22.3455 13.06 22.3118 13.3776C22.0811 15.3058 21.3128 17.1303 20.0945 18.6425C18.8762 20.1548 17.2571 21.2939 15.4222 21.9296C13.5872 22.5653 11.6105 22.6721 9.71773 22.2377C7.82499 21.8034 6.0926 20.8453 4.71849 19.4731C3.34439 18.1009 2.38398 16.3698 1.947 14.4777C1.51002 12.5855 1.61409 10.6086 2.24732 8.7728C2.88055 6.93699 4.0174 5.31633 5.52799 4.09596C7.03857 2.8756 8.86197 2.10475 10.7899 1.87149L10.7886 1.8727Z" fill="#5F9CDB"></path><path d="M10.9975 6.74134C11.1553 6.70814 11.3181 6.70671 11.4765 6.73715C11.6349 6.76758 11.7856 6.82927 11.9199 6.91861C12.0541 7.00795 12.1692 7.12314 12.2585 7.25747C12.3477 7.39179 12.4093 7.54255 12.4396 7.70094C12.4699 7.85933 12.4684 8.02218 12.4351 8.17997C12.4018 8.33775 12.3373 8.48732 12.2456 8.61993C12.1538 8.75254 12.0365 8.86554 11.9006 8.95232C11.7647 9.03909 11.6128 9.09792 11.4539 9.12535C10.7545 9.26266 10.1246 9.63918 9.67255 10.1903C9.22048 10.7414 8.97435 11.4326 8.97642 12.1454C8.97514 12.5476 9.05309 12.9461 9.20582 13.3181C9.35855 13.6902 9.58307 14.0285 9.86655 14.3138C10.15 14.5991 10.4869 14.8258 10.858 14.9808C11.2291 15.1359 11.6271 15.2164 12.0293 15.2177C12.7718 15.2155 13.4882 14.9434 14.045 14.452C14.6017 13.9607 14.9609 13.2837 15.0554 12.5472C15.0969 12.2278 15.2636 11.9381 15.5188 11.7416C15.774 11.5452 16.0968 11.4581 16.4161 11.4996C16.7355 11.5412 17.0253 11.7079 17.2217 11.9631C17.4182 12.2182 17.5052 12.541 17.4637 12.8604C17.2931 14.1817 16.6476 15.3959 15.6476 16.2763C14.6477 17.1568 13.3616 17.6434 12.0293 17.6454C9.0007 17.6442 6.54871 15.1801 6.54871 12.1442C6.54702 10.867 6.99016 9.62912 7.80201 8.64316C8.61385 7.65721 9.74371 6.98476 10.9975 6.74134Z" fill="#5F9CDB"></path>
      </svg>
    )
  };

  OverViewTwoTone.propTypes = {
    color: PropTypes.string,
    size: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
  }

  OverViewTwoTone.defaultProps = {
    color: 'currentColor',
    size: '24',
  }

  export default OverViewTwoTone
