import AlbumComponent from "../components/Album/Album";
import { NavbarComponent} from "../components/Navbar/Navbar";


export default function MyHouseholds() {
  return <div>
        <NavbarComponent/>
        <h1 className="d-flex justify-content-center">Mis Anuncios </h1>
        <AlbumComponent/>
        </div>;
}