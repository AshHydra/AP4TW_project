// weather app

// importing our header component
import Header from './wrappers/Header.jsx';

// importing our hero component
import Hero from './wrappers/Hero.jsx';



export default function Home() {
  return (
    <div className="">
      
      
      {/*  
        render our header 
        containing our 3 child components; 
        - searchbar
        - darkmode
        - currentlocation
      */}
      <Header />

      {/* 
        render our hero section containing our weather data 
      */}
      <Hero />

    
    </div>
  );
}
