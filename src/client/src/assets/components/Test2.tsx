import React, { useEffect } from 'react';
import axios from 'axios';

const SchoolsComponent: React.FC = () => {
    useEffect(() => {
        const fetchSchools = async () => {
            try {
                const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzdHVkZW50dXNlcjMiLCJpYXQiOjE3MzE2ODEzNTEsImV4cCI6MTczMTY4MTQ3MX0.Y3Nhl54pZ-6Y4qTlsVSXZddY1K0OOe4yxVdZnSG0qmQ';

                const response = await axios.get('http://localhost:8080/api/schools', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                console.log('Schools:', response.data);
            } catch (error) {
                console.error('Error fetching schools:', error);
            }
        };

        fetchSchools();
    }, []);

    return <div></div>;
};

export default SchoolsComponent;
