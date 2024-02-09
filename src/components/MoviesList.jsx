import React, { useState, useEffect } from 'react';
import MovieCard from './MovieCard';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';

export default function MoviesList({ searchResults }) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const override = {
        display: "block",
        margin: "auto",
        textAlign: "left",
    };

    const fetchMovies = async (searchQuery) => {
        setLoading(true);
        try {
            const response = await axios.get(`https://imdb-top-100-movies.p.rapidapi.com?search=${searchQuery}`, {
                headers: {
                    'X-RapidAPI-Key': '931428392bmsh4d5e32447f6f4aep150cb9jsn21d67d7042ec',
                    'X-RapidAPI-Host': 'imdb-top-100-movies.p.rapidapi.com'
                }
            });
            setLoading(false);
            return response.data;
        } catch (error) {
            setLoading(false);
            console.error('Hata:', error);
            return null;
        }
    };

    useEffect(() => {
        const getMovies = async () => {
            if (searchResults) {
                const movies = await fetchMovies(searchResults);
                if (movies) {
                    setData(movies)
                }
            } else {
                // Eğer searchResults boşsa, tüm filmleri getir
                const allMovies = await fetchMovies('');
                if (allMovies) {
                    setData(allMovies)
                }
            }
        };

        getMovies();
    }, [searchResults]);

    return (
        <div>
            {loading ? (
                <ClipLoader
                    cssOverride={override}
                    size={60}
                    color="blue"
                    speedMultiplier={0.7}
                />
            ) : (
                <ul className='movies_list'>
                    {data && data.map((item, index) => (
                        <MovieCard
                            key={index}
                            image={item.image}
                            title={item.title}
                            year={item.year}
                        />
                    ))}
                </ul>
            )}
        </div>
    )
}
