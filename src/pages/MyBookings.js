import { MDBRow, MDBCol } from "mdb-react-ui-kit";
import { Container, ListGroup } from "react-bootstrap";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { getBookingsFromUser } from "../api/FetchDBData";
import Image from "react-bootstrap/Image";




export default function MyBookings() {

    const username = useParams().username;

    const getBookingsFromUserMethod = async (username) => {
        if (username === undefined){
          throw new Error('Username is undefined');
        }
        var bookings = await getBookingsFromUser(username);
        return bookings
      };
        
      const [bookings, setBookings] = useState([
        {
        id: '',
        start: "",
        ending: "",
        host:{ host_username : "" ,  host_email : "" },
        renter:{ renter_username : "" ,  host_email : "" },
        household:{ id : "" ,  title : "", address: {street: "", number: "", postal_code: ""}, photo: "" },
      }]);
    

        useEffect(() => {
          const temp = async () => {
            setBookings(await getBookingsFromUserMethod(username))
          }
          temp()
        }, [username]);

        return(
            
            <>
            
                <Container>
                    <MDBRow>
                        <h1> Tus reservas </h1>
                    </MDBRow>
    
                    <MDBRow>
                    <MDBCol xs={6}>
                        {bookings.map((booking) => (
                        <ListGroup key={booking.id}>
                            <ListGroup.Item>

                                <MDBRow>
                                    <MDBCol>
                                        <div><Image
                                        src={booking.household.photo}
                                        style={{
                                            height: "125px",
                                            width: "80%",
                                        }}
                                        ></Image></div>
                                    </MDBCol>

                                    <MDBCol>
                                        <MDBRow className='mt-2 ml-5'>
                                            <h4>{booking.household.title}</h4>
                                        </MDBRow>

                                        <MDBRow className='mt-2'>
                                            <h5>Anfitrión : {booking.host.host_username}</h5>

                                        </MDBRow>
                                        
                                        <MDBRow className='mt-2'>
                                            <h6>Fecha de comienzo: {new Date(booking.start).toLocaleDateString()}</h6>
                                        </MDBRow>

                                        <MDBRow className='mt-2'>
                                            <h6>Fecha de finalización: {new Date(booking.ending).toLocaleDateString()}</h6>
                                        </MDBRow>
                                

                                        

                                    </MDBCol>
                                </MDBRow>

        

                            </ListGroup.Item>
                        </ListGroup>
                        ))}
                    </MDBCol>
                </MDBRow>
            </Container>
            
        </>
        );
}
