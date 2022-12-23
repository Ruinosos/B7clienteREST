import {
  GoogleOAuthProvider,
  googleLogout,
  useGoogleLogin,
} from "@react-oauth/google";
import { Outlet, Link } from "react-router-dom";
import NavbarComponent from "./components/Navbar/Navbar";
import { useState } from "react";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import { Row, Col } from "react-bootstrap";
import { getProfileData } from "./api/Authentication";
import * as dotenv from "dotenv";
dotenv.config();

export const Wrapper = () => {
  const CLIENT_ID = process.env.CLIENT_ID;
  const GoogleAuth = () => {
    const [profile, setProfile] = useState(
      JSON.parse(localStorage.getItem("profile"))
    );
    const [token, setToken] = useState(localStorage.getItem("accessToken"));

    const login = useGoogleLogin({
      onSuccess: codeResponse => getTokenAndProfileData(codeResponse),
      flow: "auth-code",
    });
    const getTokenAndProfileData = async ({ code }) => {
      const { accessToken, profileData } = await getProfileData(code);
      setToken(accessToken);
      setProfile(profileData);
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("profile", JSON.stringify(profileData));
    };
    const onLogOut = () => {
      setProfile(null);
      setToken(null);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("profile");
      googleLogout();
    };
    console.log(token, profile);
    return profile && token && token !== undefined && profile !== undefined ? (
      <Row className='align-items-center'>
        <Col>
          <Link to={"/profile"}>
            <Image
              className='rounded-circle'
              src={profile.picture}
              referrerpolicy='no-referrer'
              alt='user profile'
              width={32}
              height={32}
            />
          </Link>
        </Col>
        <Col>
          <p className='m-0'>{profile.email}</p>
          <Button className='m-0' size='sm' variant='danger' onClick={onLogOut}>
            Cerrar sesión
          </Button>
        </Col>
      </Row>
    ) : (
      <Button onClick={() => login()}>Sign in with Google 🚀</Button>
    );
  };

  return (
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <NavbarComponent auth={GoogleAuth} />
      <Outlet />
    </GoogleOAuthProvider>
  );
};
