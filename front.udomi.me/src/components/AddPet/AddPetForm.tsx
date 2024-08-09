import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { SelectChangeEvent } from '@mui/material/Select';
import { useUser } from '../../context/userContext/userContext';
import { createPet } from '../../api/pet/pet';
import { getBreeds } from '../../api/breed/breed';

interface PetData {
    name: string;
    breed_id: number;
    age: number;
    description: string;
    gender: string;
    image: File | null;
}

interface Breed {
    id: number;
    name: string;
}

const genderOptions = [
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
];

const AddPetForm: React.FC = () => {
    const [petData, setPetData] = useState<PetData>({
        name: '',
        breed_id: 0,
        age: 0,
        description: '',
        gender: '',
        image: null,
    });
    const [breeds, setBreeds] = useState<Breed[]>([]);
    const [error, setError] = useState<string | null>(null);

    const { user } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBreeds = async () => {
            try {
                const breedsData = await getBreeds();
                setBreeds(breedsData);
            } catch (error) {
                console.error('Failed to fetch breeds:', error);
            }
        };
        fetchBreeds();
    }, []);

    const handleTextFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPetData({
            ...petData,
            [name as string]: name === 'age' ? Number(value) : value,
        });
    };

    const handleSelectChange = (e: SelectChangeEvent<string | number>) => {
        const { name, value } = e.target;

        setPetData({
            ...petData,
            [name as string]: name === 'breed_id' ? Number(value) : value,
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setPetData({ ...petData, image: e.target.files[0] });
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            const formData = new FormData();
            formData.append('name', petData.name);
            formData.append('breed_id', petData.breed_id.toString());
            formData.append('age', petData.age.toString());
            formData.append('description', petData.description);
            formData.append('gender', petData.gender);
            formData.append('created_by', user!.id.toString());
            if (petData.image) {
                formData.append('image', petData.image);
            }

            await createPet(formData);
            setError(null);
            navigate('/'); // Redirect to the home page
        } catch (err) {
            console.error('Failed to add pet:', err); // Log the error for debugging
            setError('Failed to add pet');
        }
    };

    return (
        <Container>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '100vh',
                    padding: '20px',
                }}
            >
                <Paper
                    elevation={3}
                    sx={{
                        padding: '20px',
                        maxWidth: '400px',
                        width: '100%',
                    }}
                >
                    <Typography variant='h4' component='h1' gutterBottom>
                        Add a Pet for Adoption
                    </Typography>
                    <Box
                        component='form'
                        onSubmit={handleSubmit}
                        encType='multipart/form-data'
                    >
                        <TextField
                            label='Name'
                            variant='outlined'
                            fullWidth
                            margin='normal'
                            name='name'
                            value={petData.name}
                            onChange={handleTextFieldChange}
                        />
                        <FormControl fullWidth margin='normal'>
                            <Select
                                name='breed_id'
                                value={petData.breed_id.toString()} // Convert to string for comparison
                                onChange={handleSelectChange}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Breed' }}
                                renderValue={(selected) => {
                                    if (selected === '') {
                                        return <em>Select a breed</em>; // Use `em` correctly within JSX
                                    }
                                    const selectedBreedId = Number(selected); // Convert to number for comparison
                                    const selectedBreed = breeds.find(
                                        (breed) => breed.id === selectedBreedId
                                    );
                                    return selectedBreed ? (
                                        selectedBreed.name
                                    ) : (
                                        <em>Select a breed</em>
                                    ); // Use `em` correctly within JSX
                                }}
                            >
                                <MenuItem value='' disabled>
                                    Select a breed
                                </MenuItem>
                                {breeds.map((breed) => (
                                    <MenuItem key={breed.id} value={breed.id}>
                                        {breed.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <TextField
                            label='Age'
                            variant='outlined'
                            fullWidth
                            margin='normal'
                            name='age'
                            type='number'
                            value={petData.age}
                            onChange={handleTextFieldChange}
                        />
                        <FormControl fullWidth margin='dense'>
                            <Select
                                name='gender'
                                value={petData.gender}
                                onChange={handleSelectChange}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Gender' }}
                            >
                                <MenuItem value='' disabled>
                                    Select a gender
                                </MenuItem>
                                {genderOptions.map((option) => (
                                    <MenuItem
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <TextField
                            label='Description'
                            variant='outlined'
                            fullWidth
                            margin='normal'
                            name='description'
                            value={petData.description}
                            onChange={handleTextFieldChange}
                            multiline
                            rows={4} // Increase rows to provide more space
                        />
                        <input
                            accept='image/*'
                            type='file'
                            onChange={handleFileChange}
                        />
                        {error && (
                            <Typography color='error'>{error}</Typography>
                        )}
                        <Button
                            type='submit'
                            variant='contained'
                            color='primary'
                            fullWidth
                            sx={{ marginTop: '20px' }}
                        >
                            Add Pet
                        </Button>
                    </Box>
                </Paper>
            </Box>
        </Container>
    );
};

export default AddPetForm;
