import axios from "axios";
const urlAPI = "https://roomtrackrservidor.fly.dev";
//const urlAPI = "http://localhost:8001";
const AUTHENTICATION_URL = `${urlAPI}/auth`;

const formatProfileData = data => {
  const { photos, names, emailAddresses, resourceName } = data;
  return {
    picture: photos[0].url,
    email: emailAddresses[0].value,
    name: names[0].displayName,
    username: names[0].displayName,
    sub: resourceName.split("/")[1],
  };
};
export const getProfileData = async code => {
  const authResponse = await axios.post(AUTHENTICATION_URL + "/login", {
    code: code,
  });
  const data = authResponse.data;
  console.log(data);
  const { access_token: accessToken, profile_data: profileData } = data;
  const profileDataFormated = formatProfileData(profileData);
  return { profileData: profileDataFormated, accessToken: accessToken };
};
