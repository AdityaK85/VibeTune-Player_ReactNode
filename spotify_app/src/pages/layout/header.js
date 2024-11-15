import React , {useState, useEffect, useContext } from 'react'
import { Spotify_API } from '../../API_endpoint/API'
import { MusicPlayerContext } from '../components/MusicPlayerContext';
import { Link } from 'react-router-dom'
import '../components/header.css'



export const Header = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const { songs, setSongs, setAudioID } = useContext(MusicPlayerContext);

  const getMusicList = async () => {
      const response = await Spotify_API.getMusicList();
      if (response.status === 200) {
        setSongs(response.data.payload || []);
      }
  };

  useEffect(() => {
      getMusicList();
  }, []);



  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value) {
      const filtered = songs.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredResults(filtered);
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  };

  const handleSelectSuggestion = (suggestion, audio_id) => {
    setSearchTerm(suggestion);
    setShowDropdown(false);
    setAudioID(audio_id)
    setSearchTerm(null);
  };


  return (
    <>
      <nav
          className="navbar sticky-top px-3"
          style={{
            background: 'rgba(20, 20, 20, 0.8)',
            backdropFilter: 'blur(10px)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.5)',
          }}
        >
          <div className="container-fluid d-flex justify-content-between align-items-center">
            {/* Brand Logo */}
            <a
              className="navbar-brand text-white"
              style={{
                fontWeight: 'bolder',
                fontSize: '2rem',
                letterSpacing: '2px',
                textShadow: '0 0 8px rgba(0, 255, 200, 0.7)',
                cursor: 'pointer',
              }}
            ><span style={{color:'#ef5245 !important'}} >Vibe</span>
            Tune
            </a>

            {/* Home Button */}
            <div style={{display:'flex', width:'40%'}} >
              
                <Link
                  to="/"
                  title="Home"
                  aria-label="Home"
                  className="d-flex align-items-center justify-content-center mx-3"
                  style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #ff8a00, #e52e71)',
                    boxShadow: '0 0 15px rgba(255, 102, 204, 0.7)',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.2)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                >
                  <i className="fa-solid fa-house text-white"></i>
                </Link>

                {/* Search Bar */}
                <div className="input-group" style={{ maxWidth: '600px', flex: 1 }}>
                  <input
                    className="form-control text-white"
                    placeholder="Search your favorite music..."
                    style={{
                      background: 'rgba(30, 30, 30, 0.8)',
                      border: 'none',
                      color: '#ccc',
                      borderRadius: '25px',
                      padding: '10px 15px',
                      outline: 'none',
                      boxShadow: '0 0 5px rgba(0, 255, 200, 0.5)',
                      transition: 'box-shadow 0.3s ease',
                    }}
                    value={searchTerm}
                    onChange={handleSearchChange}
                    onFocus={() => searchTerm && setShowDropdown(true)}
                  />
                  {showDropdown && (
                    <ul
                      className="dropdown-menu show mt-2"
                      style={{
                        position: 'absolute',
                        top: '100%',
                        left: '0',
                        width: '100%',
                        backgroundColor: 'rgba(40, 40, 40, 0.9)',
                        border: '1px solid #555',
                        borderRadius: '10px',
                        zIndex: 1000,
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.6)',
                      }}
                    >
                      {filteredResults.length > 0 ? (
                        filteredResults.map((result, index) => (
                          <li
                            key={index}
                            className="dropdown-item text-white"
                            style={{
                              cursor: 'pointer',
                              padding: '10px',
                              transition: 'background 0.3s ease',
                            }}
                            onClick={() => handleSelectSuggestion(result, result._id)}
                          >
                            {result.name}
                          </li>
                        ))
                      ) : (
                        <li className="dropdown-item text-muted text-white">No results found</li>
                      )}
                    </ul>
                  )}
                </div>
            </div>
          </div>
        </nav>
    </>
  )
}
