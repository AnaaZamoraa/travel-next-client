import './Homepage.css';
import SearchBar from '../../components/SearchBar/SearchBar';

function HomePage() {
  return (
    <div className='HomePage'>
      <img src='https://res.cloudinary.com/dv7nx2bxb/image/upload/v1716392690/travel-next/kzkfkhxcl4lhkkelwmte.png' alt='HomePage background' className='background'/>
      <div className='search-container'>
        <SearchBar />
      </div>
    </div>
  );
}

export default HomePage;
