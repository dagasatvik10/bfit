import React, {FC} from 'react';
import {Image, Linking, Pressable, Text, View} from 'react-native';
import {
  Asset,
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import {Button, IconButton, Modal, Portal} from 'react-native-paper';

import {
  useAddUserActivityMutation,
  useFetchUserActivityQuery,
  useGetAuthUserQuery,
} from '../../slices/userSlice';
import SquareImage from '../atoms/SquareImage';
import {Activity} from '../../types';
import {useUploadImageMutation} from '../../slices/imageSlice';

type Props = Omit<Activity, 'start' | 'end'>;

export const CurrentActivity: FC<Props> = ({
  id,
  title,
  description,
  points,
  youtubeLink,
  isImageRequired,
}) => {
  const {data: user} = useGetAuthUserQuery('auth');
  const {data: userActivity} = useFetchUserActivityQuery(
    {activityId: id},
    {refetchOnMountOrArgChange: true},
  );
  const [addUserActivity, {isLoading: isAddUserActivityLoading}] =
    useAddUserActivityMutation();
  const [uploadImage, {isLoading: isUploadImageLoading}] =
    useUploadImageMutation();

  const [showImagePicker, setShowImagePicker] = React.useState(false);
  const [image, setImage] = React.useState<Asset | null>(null);

  const showModal = () => setShowImagePicker(true);
  const hideModal = () => setShowImagePicker(false);

  const containerStyle = {
    backgroundColor: 'white',
    padding: 20,
  };

  const onImageSelected = (imageResponse: ImagePickerResponse) => {
    if (imageResponse.errorCode) {
      console.log('ImagePicker Error: ', imageResponse.errorMessage);
    } else if (imageResponse.assets) {
      const asset = imageResponse.assets[0];
      setImage(asset ?? null);
      showModal();
    }
  };

  return (
    <View className="my-4 py-4 px-4 bg-[#fef8f1] h-48 rounded-2xl shadow flex flex-col justify-between w-full">
      <Portal>
        <Modal
          contentContainerStyle={containerStyle}
          visible={showImagePicker}
          onDismiss={hideModal}>
          <View className="flex flex-col justify-center w-full">
            {image && (
              <>
                <View className="flex flex-row justify-center w-full py-2">
                  <SquareImage uri={image?.uri!} />
                </View>
                <View className="flex flex-row justify-center pt-2">
                  <Button
                    loading={isUploadImageLoading || isAddUserActivityLoading}
                    onPress={async () => {
                      await uploadImage({
                        activityTitle: title,
                        email: user?.id!,
                        uri: image?.uri!,
                      }).unwrap();
                      await addUserActivity({
                        activityId: id,
                        points,
                        userId: user?.id!,
                        teamId: user?.teamId!,
                      }).unwrap();
                      hideModal();
                    }}
                    mode="contained">
                    Upload
                  </Button>
                </View>
              </>
            )}
          </View>
        </Modal>
      </Portal>
      <View className="flex flex-row justify-between py-2">
        <Text className="text-black font-bold text-base">{title}</Text>
        <View className="flex flex-row items-center justify-around">
          <Text className="text-xs">{points} points</Text>
          <Image source={require('../../assets/images/coin.webp')} />
        </View>
      </View>
      <View className="flex flex-row items-center justify-center">
        <Text className="text-base text-black font-normal">{description}</Text>
      </View>
      {youtubeLink && (
        <Pressable
          onPress={() => Linking.openURL(youtubeLink)}
          className="flex flex-row items-center justify-center my-2">
          <Text className="text-base text-blue-500 font-normal">
            Watch video
          </Text>
        </Pressable>
      )}
      <View className="w-full py-2">
        {userActivity?.completed ? (
          <View className="rounded-full bg-[#018e89] items-center py-2 my-4 w-full">
            <Text className="text-base font-bold text-white">Completed</Text>
          </View>
        ) : (
          <View className="flex flex-row justify-between items-center">
            <View className="flex flex-row justify-start items-center w-1/4">
              <IconButton
                onPress={() =>
                  launchCamera({mediaType: 'photo'}, onImageSelected)
                }
                icon="camera"
                iconColor="#018e89"
                size={20}
                className="w-1/4"
              />
              <IconButton
                onPress={() =>
                  launchImageLibrary(
                    {
                      mediaType: 'photo',
                      quality: 0.5,
                    },
                    onImageSelected,
                  )
                }
                icon="image"
                iconColor="#018e89"
                size={20}
                className="w-1/4"
              />
            </View>
            <Pressable
              className={`flex flex-row items-center justify-center w-3/4 ${
                isImageRequired && 'opacity-50'
              }`}
              disabled={isImageRequired}
              onPress={() =>
                addUserActivity({
                  activityId: id,
                  points,
                  userId: user?.id!,
                  teamId: user?.teamId!,
                })
              }>
              <View className="rounded-full bg-[#018e89] items-center p-2 mr-4 w-full">
                <Text className="text-base font-bold text-white">Yes</Text>
              </View>
            </Pressable>
          </View>
        )}
      </View>
    </View>
  );
};
