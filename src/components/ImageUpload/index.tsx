import React, {FC} from 'react';
import {Image, View} from 'react-native';

interface Props {
  imageUri: string;
}

export const ImageUploader: FC<Props> = ({imageUri}) => {
  return (
    <View>
      <Image className source={{uri: imageUri}} />
    </View>
  );
};
