import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Box, Card, Grid, IconButton } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import PetsIcon from '@mui/icons-material/Pets';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { getPetById } from '../../api/pet/pet';
import { getUserById } from '../../api/user/user';
import { IPet } from '../../models/Pet';
import { IUser } from '../../models/user';

const PetDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [pet, setPet] = useState<IPet | null>(null);
    const [user, setUser] = useState<IUser | null>(null);

    useEffect(() => {
        const fetchPetAndUser = async () => {
            try {
                const petData = await getPetById(parseInt(id!, 10));
                setPet(petData);

                const userData = await getUserById(petData.created_by);
                setUser(userData);
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        };
        fetchPetAndUser();
    }, [id]);

    if (!pet || !user) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <Box sx={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <Box
                        sx={{
                            width: '100%',
                            height: '400px',
                            backgroundImage: `url(${
                                pet.image_url || '/placeholder.png'
                            })`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            borderRadius: '16px',
                            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
                        }}
                    />
                </Grid>

                <Grid item xs={12} md={8}>
                    <Card
                        sx={{
                            padding: '20px',
                            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
                            borderRadius: '16px',
                        }}
                    >
                        <Typography
                            variant='h3'
                            gutterBottom
                            sx={{ fontWeight: 'bold' }}
                        >
                            {pet.name}
                        </Typography>
                        <Typography variant='body1' gutterBottom>
                            <PetsIcon sx={{ marginRight: '8px' }} /> Breed ID:{' '}
                            {pet.breed_id}
                        </Typography>
                        <Typography variant='body1' gutterBottom>
                            <PetsIcon sx={{ marginRight: '8px' }} /> Age:{' '}
                            {pet.age}
                        </Typography>
                        <Typography variant='body1' gutterBottom>
                            <PetsIcon sx={{ marginRight: '8px' }} /> Gender:{' '}
                            {pet.gender}
                        </Typography>
                        <Typography variant='body1' gutterBottom>
                            <LocationOnIcon sx={{ marginRight: '8px' }} />
                            Location: {pet.location}
                        </Typography>
                        <Typography variant='body1'>
                            <strong>Description:</strong> {pet.description}
                        </Typography>
                    </Card>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Card
                        sx={{
                            padding: '20px',
                            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
                            borderRadius: '16px',
                            backgroundColor: '#f0f0f0',
                            textAlign: 'center',
                        }}
                    >
                        <Typography
                            variant='h5'
                            gutterBottom
                            sx={{ fontWeight: 'bold' }}
                        >
                            Uploaded by: {user.username}
                        </Typography>
                        <IconButton
                            href={`tel:${user.phone_number}`}
                            sx={{ marginTop: '10px' }}
                        >
                            <PhoneIcon fontSize='large' />
                            <Typography
                                variant='body1'
                                sx={{ fontWeight: 'bold', marginLeft: '10px' }}
                            >
                                {user.phone_number ? user.phone_number : 'N/A'}
                            </Typography>
                        </IconButton>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default PetDetail;
