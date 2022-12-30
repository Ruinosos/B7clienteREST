import { useEffect } from "react";
import {
    PayPalScriptProvider,
    PayPalButtons,
    usePayPalScriptReducer
} from "@paypal/react-paypal-js";
import { useParams,useLocation } from "react-router";
import { createBooking } from "../api/FetchDBData";
import React from "react";

// This values are the props in the UI

const currency = "EUR";
const style = { "layout": "vertical" };

function useQuery() {
    const { search } = useLocation();
  
    return React.useMemo(() => new URLSearchParams(search), [search]);
  }

// Custom component to wrap the PayPalButtons and handle currency changes
const ButtonWrapper = ({ currency, showSpinner }) => {

    const amount = useParams().price;

    // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
    // This is the main reason to wrap the PayPalButtons in a new component
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

    useEffect(() => {
        dispatch({
            type: "resetOptions",
            value: {
                ...options,
                currency: currency,
            },
        });
    }, [currency, showSpinner, dispatch]);

    const query = useQuery();
    const startingDate = query.get("startingDate");
    const endingDate = query.get("endingDate");
    const household = query.get("household");

    return (<>
        {(showSpinner && isPending) && <div className="spinner" />}
        <PayPalButtons
            style={style}
            disabled={false}
            forceReRender={[amount, currency, style]}
            fundingSource={undefined}
            createOrder={(data, actions) => {
                return actions.order
                    .create({
                        purchase_units: [
                            {
                                amount: {
                                    currency_code: currency,
                                    value: amount,
                                },
                            },
                        ],
                    })
                    .then((orderId) => {
                        // Your code here after create the order
                        return orderId;
                    });
            }}
            onApprove={function (data, actions) {
                return actions.order.capture().then(function () {
                    // Your code here after capture the order
                    
                    var jsonData = {
                        "start": startingDate,
                        "ending": endingDate,
                        "host": {
                            "host_username": "string",
                            "host_email": "string@gmail.com"
                        },
                        "renter": {
                            "renter_username": JSON.parse(localStorage.getItem("profile")).sub,
                            "renter_email": JSON.parse(localStorage.getItem("profile")).email
                        },
                        "household": {
                            "id": household,
                            "title": "string",
                            "address": {
                              "street": "string",
                              "number": "string",
                              "postal_code": 0
                            },
                            "photo": [
                              "string"
                            ]
                          }
                    }
                    createBooking(jsonData);
                    window.location.href = '/';      
            });
                }}
            />
    </>
    );
}

export default function PaypalGateway() {
    return (
        <div style={{ maxWidth: "750px", minHeight: "200px" }} className='d-flex justify-content-center align-items-center mx-auto'>
            <PayPalScriptProvider
                options={{
                    "client-id": "test",
                    components: "buttons",
                    currency: "USD"
                }}
            >
                <ButtonWrapper
                    currency={currency}
                    showSpinner={false}
                />
            </PayPalScriptProvider>
        </div>
    );
}