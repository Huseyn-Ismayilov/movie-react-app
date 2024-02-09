import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function MoviesList() {
    const [data, setData] = useState(null);

    const options = {
        method: 'GET',
        url: 'https://imdb-top-100-movies.p.rapidapi.com',
        headers: {
            'X-RapidAPI-Key': '1b96c343a9msh3207582d8b84a8cp1922a5jsn6a9df798c655',
            'X-RapidAPI-Host': 'imdb-top-100-movies.p.rapidapi.com'
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.request(options);
                console.log(response.data);
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchData();
    }, []);


    return (
        <div>
            {
                // data.map((item, index) => (
                //    <div >
                //     {item.name}
                //    </div>
                // ))
                data ? (
                    <ul>
                        {data.map((item,index) => (
                            <li key={index}>{item.rank}</li>
                        ))}
                    </ul>
                ) : 
                null
            }
        </div>
    )
}