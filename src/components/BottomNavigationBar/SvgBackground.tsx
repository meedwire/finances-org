import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import Svg, {Path} from 'react-native-svg';

const SvgBackGround: React.FC = () => {
  return (
    <Svg
      style={{...StyleSheet.absoluteFillObject}}
      width={Dimensions.get('screen').width + 1}
      height={95}
      fillRule="evenodd"
      clipRule="evenodd"
      viewBox="0 0 25.01 5.99">
      <Path
        fill="#494361"
        fillOpacity={0.569}
        d="M1.66 1.56l7.71 0c0.58,0 1.1,-0.24 1.49,-0.67 0.36,-0.54 0.97,-0.89 1.66,-0.89 0.69,0 1.3,0.35 1.66,0.88 0.37,0.41 0.9,0.68 1.49,0.68l7.71 0c0.9,0 1.63,0.73 1.63,1.62l-0.04 2.81 -24.97 0 0.03 -2.81c0,-0.89 0.74,-1.62 1.63,-1.62z"
      />
    </Svg>
  );
};

export {SvgBackGround};
