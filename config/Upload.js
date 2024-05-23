// premission library image
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
// import * as FileSystem from 'expo-file-system';

// update anh
export const openImagePickerAsync = async () => {
  // cấp quyền
  let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (permissionResult.granted === false) {
    alert('Permission to access camera roll is required!');
    return;
  }
  // cho phép truy cập thư viện ảnh 
  let pickerResult = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });
  if (!pickerResult.canceled) {
    let newFile = {
      uri: pickerResult.assets[0].uri,
      type: `test/${pickerResult.assets[0].uri.split(".")[1]}`,
      name: `test/${pickerResult.assets[0].uri.split(".")[1]}`,
    }
    return newFile
  }
};

export const handleUploadOne = (pics, setImage, setLoading) => {
  const data = new FormData();
  data.append('file', pics);
  data.append('upload_preset', "babuapp")
  data.append('cloud_name', "minhtuandev")

  fetch('https://api.cloudinary.com/v1_1/minhtuandev1/image/upload', {
    method: 'post',
    body: data,
  }).then(res => res.json()).then((data) => {
    setImage(data.url)
    setLoading(false)
  })
    .catch(err => console.log(err))
}
export const handleUpload2 = (pics, images, setImage, setLoading) => {
  const data = new FormData();
  data.append('file', pics);
  data.append('upload_preset', "babuapp")
  data.append('cloud_name', "minhtuandev")

  fetch('https://api.cloudinary.com/v1_1/minhtuandev1/image/upload', {
    method: 'post',
    body: data,
  }).then(res => res.json()).then((data) => {
    if (images.length > 0) {
      setImage([data.url, ...images])
    } else {
      setImage([data.url])
    }
    setLoading(false)
  })
    .catch(err => console.log(err))
}