import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPets } from '../../api/pet/pet';
import { Grid, Card, CardContent, Typography, Box } from '@mui/material';

interface Pet {
    id: number;
    name: string;
    breed_id: number;
    age: number;
    description: string;
    gender: string;
    image_url: string;
}

const PetList: React.FC = () => {
    const [pets, setPets] = useState<Pet[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPets = async () => {
            try {
                const petsData = await getPets();
                setPets(petsData);
            } catch (error) {
                console.error('Failed to fetch pets:', error);
            }
        };
        fetchPets();
    }, []);

    const handleCardClick = (id: number) => {
        navigate(`/pet/${id}`);
    };

    return (
        <Box
            sx={{ display: 'flex', justifyContent: 'center', padding: '20px' }}
        >
            <Grid container spacing={3} sx={{ maxWidth: '800px' }}>
                {pets.map((pet) => (
                    <Grid item xs={12} sm={6} key={pet.id}>
                        <Card
                            sx={{
                                maxWidth: '100%',
                                borderRadius: '16px',
                                boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
                                overflow: 'hidden',
                                display: 'flex',
                                flexDirection: 'column',
                                height: '100%',
                                padding: 0,
                                cursor: 'pointer',
                                transition: 'transform 0.2s, box-shadow 0.2s',
                                '&:hover': {
                                    boxShadow:
                                        '0px 8px 30px rgba(0, 0, 0, 0.2)',
                                },
                                '&:active': {
                                    transform: 'scale(0.98)',
                                },
                            }}
                            onClick={() => handleCardClick(pet.id)}
                        >
                            {/* Top part with background image */}
                            <Box
                                sx={{
                                    width: '100%',
                                    height: 150,
                                    backgroundImage: `url(${
                                        pet.image_url || '/placeholder.png'
                                    })`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    backgroundRepeat: 'no-repeat',
                                    margin: 0,
                                }}
                            />
                            {/* Bottom part with content */}
                            <CardContent sx={{ padding: '15px', flexGrow: 1 }}>
                                <Typography variant='h5' component='div'>
                                    {pet.name}
                                </Typography>
                                <Typography
                                    variant='body2'
                                    color='text.secondary'
                                >
                                    {pet.description}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default PetList;
