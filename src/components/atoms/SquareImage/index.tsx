import React, {FC} from 'react';
import {Image, StyleSheet, View, ViewProps} from 'react-native';

type Props = {uri: string} & ViewProps;

const SquareImage: FC<Props> = ({uri, ...props}) => {
  return (
    <View style={styles.squareRatio} {...props}>
      <Image className="flex-1 rounded-lg" source={{uri}} />
    </View>
  );
};

const styles = StyleSheet.create({
  squareRatio: {
    // height: '100%',
    width: '100%',
    aspectRatio: 1,
  },
});

export default SquareImage;
