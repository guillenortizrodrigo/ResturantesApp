import React, { useState, useEffect } from 'react';
import { Card, Image } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';

export default function CategoriesList(props) {
    const navigate = useNavigate();
    const location = useLocation();
    const { categories } = props;

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const goToCategory = (id) => {
        navigate(`${location.pathname}/${id}`);
    };

    return (
        <div>
            {categories.map((category) => (
                <Card
                    bg="dark"
                    text="white"
                    className="d-flex flex-row align-items-center mb-3 p-3 border border-white"
                    style={{ cursor: 'pointer' }}
                    key={category.id}
                    onClick={() => goToCategory(category.id)}
                >
                    {/* Responsive Image Size */}
                    <Image
                        src={category.image}
                        style={{
                            width: windowWidth > 768 ? "250px" : "50px",
                            height: windowWidth > 768 ? "200px" : "50px"
                        }}
                    />

                    {/* Responsive Title Size */}
                    {windowWidth > 768 ? (
                        <h1 className="ms-3">{category.title}</h1>
                    ) : (
                        <span className="ms-3">{category.title}</span>
                    )}
                </Card>
            ))}
        </div>
    );
}
