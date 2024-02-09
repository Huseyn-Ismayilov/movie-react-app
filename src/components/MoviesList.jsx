import React, { useState, useEffect } from 'react';
import MovieCard from './MovieCard';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';

export default function MoviesList({ searchResults }) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const override = {
        display: "block",
        margin: "auto",
        textAlign: "left",
    };

    const fetchMovies = async (searchQuery) => {
        setLoading(true);
        try {
            const response = await axios.get(`https://imdb-top-100-movies.p.rapidapi.com`, {
                headers: {
                    'X-RapidAPI-Key': 'aea0e43a78msh0eb9e096b145f77p1669fajsn9f23d5ad176f',
                    'X-RapidAPI-Host': 'imdb-top-100-movies.p.rapidapi.com'
                },
                params: {
                    title: searchQuery
                }
            });
            setLoading(false);
            return response.data;
        } catch (error) {
            setLoading(false);
            console.error('error:', error);
            return null;
        }
    };


    useEffect(() => {
        const getMovies = async () => {
            if (!searchResults) { 
                setSearchTerm('');
                const allMovies = await fetchMovies(''); 
                if (allMovies) {
                    setData(allMovies);
                }
            } else {
                setSearchTerm(searchResults);
                const movies = await fetchMovies(searchResults);
                if (movies) {
                    setData(movies);
                }
            }
        };

        getMovies();
    }, [searchResults]);
    const filteredMovies = data && data.filter(movie =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
                    {filteredMovies && filteredMovies.map((item, index) => (
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
