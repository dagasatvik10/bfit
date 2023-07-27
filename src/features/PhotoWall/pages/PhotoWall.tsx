import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import React, {FC, useState} from 'react';
import {FlatList, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import SquareImage from '../../../components/atoms/SquareImage';
import Header from '../../../components/layout/header';
import {RootTabParamList} from '../../../navigation/HomeTab';
import {useFetchImagesQuery} from '../slices/imageSlice';

type Props = BottomTabScreenProps<RootTabParamList, 'PhotoWall'>;

export const PhotoWallPage: FC<Props> = ({navigation}) => {
  const [pageToken, setPageToken] = useState<string>('');
  const {data: imageData, isFetching} = useFetchImagesQuery({pageToken});

  return (
    <SafeAreaView className="container flex p-2">
      <View className="flex flex-col ">
        <FlatList
          ListHeaderComponent={
            <Header
              navigate={() =>
                navigation.navigate('HomeStack', {
                  screen: 'PointsHistory',
                })
              }
            />
          }
          numColumns={2}
          keyExtractor={item => item.name}
          data={imageData?.images ?? []}
          renderItem={({item}) => (
            <View className="p-2 w-1/2">
              <SquareImage uri={item?.uri!} />
            </View>
          )}
          extraData={imageData?.images}
          onRefresh={async () => setPageToken('')}
          refreshing={isFetching}
          onEndReached={() => {
            if (imageData?.pageToken) {
              setPageToken(imageData.pageToken);
            }
          }}
          onEndReachedThreshold={0.2}
        />
      </View>
    </SafeAreaView>
  );
};
