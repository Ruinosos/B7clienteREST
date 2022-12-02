import AlbumComponent from "../components/Album/Album";
import { NavbarComponent} from "../components/Navbar/Navbar";


export default function Home() {
  return <div>
        <NavbarComponent/>
        <h1 className="d-flex justify-content-center"> Anuncios </h1>
        <AlbumComponent username=''/>
        </div>;
}
