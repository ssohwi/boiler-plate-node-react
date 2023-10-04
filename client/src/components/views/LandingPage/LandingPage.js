import React, {useEffect} from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";

function LandingPage() {
    const navigate = useNavigate();

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

    const onClickHandler = () => {
        axios.get('api/users/logout')
            .then(response => {
                if(response.data.success) {
                    navigate('/login');
                } else {
                    alert('로그아웃 하는데 실패했습니다.');
                }
            })
    }

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center'
            , width: '100%', height: '100vh'
        }}>
            <h2>시작 페이지</h2>
            <button onClick={onClickHandler}>
                logout
            </button>
        </div>
    );
}

export default LandingPage;