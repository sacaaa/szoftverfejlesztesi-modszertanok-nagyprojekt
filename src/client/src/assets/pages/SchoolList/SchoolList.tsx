// SchoolList.tsx
import React, { useState } from 'react';
import ExtendedSchoolCard from '../../components/ExtendedSchoolCard/ExtendedSchoolCard';
import SimpleSchoolCard from '../../components/SimpleSchoolCard/SimpleSchoolCard';
import '../SchoolList/SchoolList.css'
import SearchBar from '../../components/SearchBar/SearchBar';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';


const SchoolList: React.FC = () => {
    const [isExtended, setIsExtended] = useState(false);
    

    const schoolData = {
        name: "Debreceni Egyetem Informatikai Kar",
        logo: "public/images/svgg.png",
        rating: "4.5",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut pharetra magna et consectetur rhoncus. Curabitur quis turpis eget eros pulvinar eleifend ut vel arcu. In sit amet viverra sem, quis finibus lorem. Proin in orci nisi. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aenean vestibulum pharetra massa, ac varius diam auctor sed. Ut ut lobortis nibh, eget tempus massa. Nullam at diam augue. Morbi luctus nulla id libero condimentum, at vulputate ante fermentum.",
        additionalInfo: ["Debrecen", "Kollégium", "Egyetem"],
    };

    return (
        <>  
            <Navbar />
            <div className='seach-bar'>
                <SearchBar toggleView={setIsExtended} />
            </div>

            <div className= {!isExtended ? 'main-content' : 'ext-main-content'}>
                <div>
                    {isExtended ? (
                        <ExtendedSchoolCard 
                            name={schoolData.name} 
                            logo={schoolData.logo} 
                            rating={schoolData.rating} 
                            description={schoolData.description} 
                            additionalInfo={schoolData.additionalInfo}
                        />
                    ) : (
                        <SimpleSchoolCard 
                            name={schoolData.name} 
                            logo={schoolData.logo} 
                            rating={schoolData.rating} 
                            additionalInfo={schoolData.additionalInfo}
                        />
                    )}
                </div>
                <div>
                    {isExtended ? (
                        <ExtendedSchoolCard 
                            name={schoolData.name}  
                            logo={schoolData.logo} 
                            rating={schoolData.rating} 
                            description={schoolData.description} 
                            additionalInfo={schoolData.additionalInfo}
                        />
                    ) : (
                        <SimpleSchoolCard 
                            name={schoolData.name} 
                            logo={schoolData.logo} 
                            rating={schoolData.rating} 
                            additionalInfo={schoolData.additionalInfo}
                        />
                    )}
                </div>
                <div>
                    {isExtended ? (
                        <ExtendedSchoolCard 
                            name={schoolData.name} 
                            logo={schoolData.logo} 
                            rating={schoolData.rating} 
                            description={schoolData.description} 
                            additionalInfo={schoolData.additionalInfo}
                        />
                    ) : (
                        <SimpleSchoolCard 
                            name={schoolData.name} 
                            logo={schoolData.logo} 
                            rating={schoolData.rating} 
                            additionalInfo={schoolData.additionalInfo}
                        />
                    )}
                </div>
                <div>
                    {isExtended ? (
                        <ExtendedSchoolCard 
                            name={schoolData.name} 
                            logo={schoolData.logo} 
                            rating={schoolData.rating} 
                            description={schoolData.description} 
                            additionalInfo={schoolData.additionalInfo}
                        />
                    ) : (
                        <SimpleSchoolCard 
                            name={schoolData.name} 
                            logo={schoolData.logo} 
                            rating={schoolData.rating} 
                            additionalInfo={schoolData.additionalInfo}
                        />
                    )}
                </div>
            </div>

            <Footer />
        </>

    );
}

export default SchoolList;
