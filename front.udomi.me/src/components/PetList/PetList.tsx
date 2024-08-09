import React, { useEffect, useState } from 'react';
import { getPets } from '../../api/pet/pet';

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

    return (
        <div>
            {pets.map((pet) => (
                <div key={pet.id}>
                    <h2>{pet.name}</h2>
                    {pet.image_url && (
                        <img
                            src={pet.image_url}
                            alt={pet.name}
                            style={{ width: '200px', height: '200px' }}
                        />
                    )}
                    <p>Breed ID: {pet.breed_id}</p>
                    <p>Age: {pet.age}</p>
                    <p>Description: {pet.description}</p>
                    <p>Gender: {pet.gender}</p>
                </div>
            ))}
        </div>
    );
};

export default PetList;
