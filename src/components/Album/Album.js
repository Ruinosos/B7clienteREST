import { CardGroup, Container,Row} from 'react-bootstrap';
import CardComponent from '../Card/Card';


export const AlbumComponent = () => {
    return (
        <CardGroup class="py-5 bg-light">
            <Container>
                <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                        <CardComponent></CardComponent>
                        <CardComponent></CardComponent>
                        <CardComponent></CardComponent>
                        <CardComponent></CardComponent>
                        <CardComponent></CardComponent>
                        <CardComponent></CardComponent>
                </div>
            </Container>
        </CardGroup>
    );
}

export default AlbumComponent;