import Extended_School_Items from "../../components/ExtendedSchoolCard/ExtendedSchoolCard";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import './SchoolList.css';

const SchoolList = () => {
    return (
        <div className="page-container">
            <header>
                <Navbar />
            </header>

            <main className="main-content">
                <Extended_School_Items
                    name="Debreceni Egyetem Informatikai kar"
                    logo="images\svgg.png"
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut pharetra magna et consectetur rhoncus. Curabitur quis turpis eget eros pulvinar eleifend ut vel arcu. In sit amet viverra sem, quis finibus lorem. Proin in orci nisi. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aenean vestibulum pharetra massa, ac varius diam auctor sed. Ut ut lobortis nibh, eget tempus massa. Nullam at diam augue. Morbi luctus nulla id libero condimentum, at vulputate ante fermentum."       
                    rating="5.0"
                    additionalInfo={['Debrecen', 'Kollégium', 'Egyetem']}
                />
                <Extended_School_Items
                    name="Debreceni Egyetem Informatikai kar"
                    logo="images\svgg.png"
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut pharetra magna et consectetur rhoncus. Curabitur quis turpis eget eros pulvinar eleifend ut vel arcu. In sit amet viverra sem, quis finibus lorem. Proin in orci nisi. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aenean vestibulum pharetra massa, ac varius diam auctor sed. Ut ut lobortis nibh, eget tempus massa. Nullam at diam augue. Morbi luctus nulla id libero condimentum, at vulputate ante fermentum."       
                    rating="4.44"
                    additionalInfo={['Debrecen', 'Kollégium', 'Egyetem']}
                />
                <Extended_School_Items
                    name="Debreceni Egyetem Informatikai kar"
                    logo="images\svgg.png"
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut pharetra magna et consectetur rhoncus. Curabitur quis turpis eget eros pulvinar eleifend ut vel arcu. In sit amet viverra sem, quis finibus lorem. Proin in orci nisi. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aenean vestibulum pharetra massa, ac varius diam auctor sed. Ut ut lobortis nibh, eget tempus massa. Nullam at diam augue. Morbi luctus nulla id libero condimentum, at vulputate ante fermentum."       
                    rating="3.45"
                    additionalInfo={['Debrecen', 'Kollégium', 'Egyetem']}
                />
                <Extended_School_Items
                    name="Debreceni Egyetem Informatikai kar"
                    logo="images\svgg.png"
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut pharetra magna et consectetur rhoncus. Curabitur quis turpis eget eros pulvinar eleifend ut vel arcu. In sit amet viverra sem, quis finibus lorem. Proin in orci nisi. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aenean vestibulum pharetra massa, ac varius diam auctor sed. Ut ut lobortis nibh, eget tempus massa. Nullam at diam augue. Morbi luctus nulla id libero condimentum, at vulputate ante fermentum."       
                    rating="1.0"
                    additionalInfo={['Debrecen', 'Kollégium', 'Egyetem']}
                />
            </main>
                <Footer />
            </div>
    )
}

export default SchoolList


/*
        <Navbar />
        <Extended_School_Items
            name="Debreceni Egyetem Informatikai kar"
            logo="images\svgg.png"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut pharetra magna et consectetur rhoncus. Curabitur quis turpis eget eros pulvinar eleifend ut vel arcu. In sit amet viverra sem, quis finibus lorem. Proin in orci nisi. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aenean vestibulum pharetra massa, ac varius diam auctor sed. Ut ut lobortis nibh, eget tempus massa. Nullam at diam augue. Morbi luctus nulla id libero condimentum, at vulputate ante fermentum."       
            rating="5"
            additionalInfo={['Debrecen', 'Kollégium', 'Egyetem']}
            />
        <Footer />
*/