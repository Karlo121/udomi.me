import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
    Typography,
    Box,
    Card,
    Grid,
    IconButton,
    Button,
    Alert,
} from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import PetsIcon from '@mui/icons-material/Pets';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { getPetById } from '../../api/pet/pet';
import { getUserById } from '../../api/user/user';
import { getBreedById } from '../../api/breed/breed';
import { IPet } from '../../models/Pet';
import { IUser } from '../../models/user';
import { IBreed } from '../../models/breed';
import { useUser } from '../../context/userContext/userContext';
import { createAdoption } from '../../api/adoption/adoption';

const PetDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [pet, setPet] = useState<IPet | null>(null);
    const [user, setUser] = useState<IUser | null>(null);
    const [breed, setBreed] = useState<IBreed | null>(null);
    const { user: currentUser } = useUser();
    const [errorMessage, setErrorMessage] = useState<string | null>(null); // State for error message
    const [successMessage, setSuccessMessage] = useState<string | null>(null); // State for success message

    useEffect(() => {
        const fetchPetAndUserAndBreed = async () => {
            try {
                const petData = await getPetById(parseInt(id!, 10));
                setPet(petData);

                const userData = await getUserById(petData.created_by);
                setUser(userData);

                const breedData = await getBreedById(petData.breed_id);
                setBreed(breedData);
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        };
        fetchPetAndUserAndBreed();
    }, [id]);

    const handleAdoptClick = async () => {
        if (pet && currentUser) {
            const adoptionData = {
                pet_id: pet.id,
                user_id: currentUser.id,
                owner_id: pet.created_by,
                status: 'pending',
                request_date: new Date().toISOString(),
            };

            try {
                const response = await createAdoption(adoptionData);
                console.log('Adoption successful:', response);
                setErrorMessage(null);
                setSuccessMessage('Adoption request successful!');
            } catch (error: any) {
                console.error('Adoption failed:', error);
                setSuccessMessage(null);
                setErrorMessage(
                    error.response?.data?.message ||
                        'Failed to request adoption.'
                );
            }
        }
    };

    if (!pet || !user || !breed) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <Box sx={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
            <Grid container spacing={4}>
                {/* Image Section */}
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

                {/* Pet Details Section */}
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
                            <PetsIcon sx={{ marginRight: '8px' }} /> Breed:{' '}
                            {breed.name}
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

                {/* User Information Section */}
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
                            sx={{ marginTop: '10px', marginBottom: '20px' }}
                        >
                            <PhoneIcon fontSize='large' />
                            <Typography
                                variant='body1'
                                sx={{ fontWeight: 'bold', marginLeft: '10px' }}
                            >
                                {user.phone_number ? user.phone_number : 'N/A'}
                            </Typography>
                        </IconButton>
                        {/* Adopt Button */}
                        {currentUser?.id !== pet.created_by && (
                            <>
                                <Button
                                    variant='contained'
                                    color='success'
                                    startIcon={<PetsIcon />}
                                    onClick={handleAdoptClick}
                                    sx={{
                                        marginTop: '20px',
                                        fontSize: '1.2rem',
                                        padding: '15px 30px',
                                    }}
                                    fullWidth
                                >
                                    Adopt
                                </Button>
                                {/* Display error or success message */}
                                {errorMessage && (
                                    <Alert
                                        severity='error'
                                        sx={{ marginTop: '20px' }}
                                    >
                                        {errorMessage}
                                    </Alert>
                                )}
                                {successMessage && (
                                    <Alert
                                        severity='success'
                                        sx={{ marginTop: '20px' }}
                                    >
                                        {successMessage}
                                    </Alert>
                                )}
                            </>
                        )}
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default PetDetail;
