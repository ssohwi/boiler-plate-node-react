import React, {useEffect} from 'react';
import axios from "axios";

function LandingPage() {

    useEffect(() => {
        axios.get('/api/hello')
            .then(function (response) {
                // handle success
                console.log(response.data);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function () {
                // always executed
            });
    }, []);

    return (
        <div>
            LandingPage
        </div>
    );
}

export default LandingPage;