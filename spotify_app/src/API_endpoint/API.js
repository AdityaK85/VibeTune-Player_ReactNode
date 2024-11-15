import React, { useState } from 'react';
import axios from 'axios';
import { Header } from '../pages/layout/header';

const BASE_URL = 'http://localhost:8000/api'
const HEADER = { "Content-Type":"application/json" }

export const Spotify_API = {
    save_artist: async (data) => {
        var axiosConfig = {
            method: "post",
            url : `${BASE_URL}/save_category`,
            headers: HEADER,
            data
        };
        return await axios(axiosConfig);
    },
    get_artist: async () => {
        var axiosConfig = {
            method: "post",
            url : `${BASE_URL}/get_category`,
            headers: HEADER,
        };
        return await axios(axiosConfig);
    },
    del_artist: async (artist_id) => {
        var axiosConfig = {
            method: "post",
            url : `${BASE_URL}/delete_artist`,
            headers: HEADER,
            data:{'category_id': artist_id}
        };
        return await axios(axiosConfig);
    },
    saveUser: async (data) => {
        var axiosConfig = {
            method:"post",
            url: `${BASE_URL}/save_artists_user`,
            headers:HEADER['Content-Type'] = 'multipart/form-data' ,
            data: data
        }
        return await axios(axiosConfig);
    },
    getArtistProfileList: async () => {
        var axiosConfig = {
            method:"post",
            url : `${BASE_URL}/get_artists_profile_list`,
            headers:HEADER,
            data : {}
        }
        return await axios(axiosConfig);
    },
    saveNewMusic: async (data) => {
        var axiosConfig = {
            method: "post",
            url: `${BASE_URL}/save_new_music`,
            headers:HEADER['Content-Type'] = 'multipart/form-data' ,
            data : data
        }
        return await axios(axiosConfig)
    },
    updateMusic: async (data) => {
        var axiosConfig = {
            method: "post",
            url: `${BASE_URL}/update_new_music`,
            headers:HEADER,
            data : data
        }
        return await axios(axiosConfig)
    },
    getMusicList: async (data) => {
        var axiosConfig = {
            method:"post",
            url : `${BASE_URL}/music_list`,
            headers : HEADER,
            data : data
        }
        return await axios(axiosConfig)
    },
    deleteAudio: async (data) => {
        var axiosConfig = {
            method : "post",
            url : `${BASE_URL}/delete_audio`,
            headers : HEADER,
            data : data
        }
        return await axios(axiosConfig)
    },
    getOneAudio: async (data) => {
        var axiosConfig =  {
            method : "post",
            url : `${BASE_URL}/get_audio_by_id`,
            header : HEADER,
            data : data
        }
        return await axios(axiosConfig)
    },
    getMusiclistbyArtistId: async (data) => {
        var axiosConfig =  {
            method : "post",
            url : `${BASE_URL}/get_audio_list_by_artist_id`,
            header : HEADER,
            data : data
        }
        return await axios(axiosConfig)
    }
    
}
