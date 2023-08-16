import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import React, {FC, useState} from 'react';
import {FlatList, Pressable, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import ImageView from 'react-native-image-viewing';

import SquareImage from '../../../components/atoms/SquareImage';
import Header from '../../../components/layout/header';
import {RootTabParamList} from '../../../navigation/HomeTab';
import {useFetchImagesQuery} from '../slices/imageSlice';

type Props = BottomTabScreenProps<RootTabParamList, 'PhotoWall'>;

interface IImageViewer {
  index: number;
  visible: boolean;
}

export const PhotoWallPage: FC<Props> = ({navigation}) => {
  const [imageViewerData, setImageViewerData] = useState<IImageViewer>({
    index: 0,
    visible: false,
  });
  const [pageToken, setPageToken] = useState<string>('');
  const {
    data: imageData,
    isFetching,
    refetch,
  } = useFetchImagesQuery(
    {pageToken},
    {
      refetchOnMountOrArgChange: 5 * 60, // 5 min
    },
  );

  return (
    <SafeAreaView className="container flex p-2">
      <ImageView
        images={imageData?.images.map(image => ({uri: image.uri})) ?? []}
        imageIndex={imageViewerData.index}
        visible={imageViewerData.visible}
        onRequestClose={() => setImageViewerData({index: 0, visible: false})}
      />
      <View className="flex flex-col ">
        <FlatList
          ListEmptyComponent={
            <View className="flex flex-col items-center py-10">
              <Text className="text-black text-2xl">No Images Yet!</Text>
            </View>
          }
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
          renderItem={({item, index}) => (
            <View className="p-2 w-1/2">
              <Pressable
                onPress={() =>
                  setImageViewerData({
                    index,
                    visible: true,
                  })
                }>
                <SquareImage uri={item?.uri!} />
              </Pressable>
            </View>
          )}
          extraData={imageData?.images}
          onRefresh={async () => {
            setPageToken('');
            await refetch().unwrap();
          }}
          refreshing={isFetching}
          onEndReached={() => {
            if (imageData?.pageToken) {
              setPageToken(imageData.pageToken);
            }
          }}
          onEndReachedThreshold={0.4}
        />
      </View>
    </SafeAreaView>
  );
};
