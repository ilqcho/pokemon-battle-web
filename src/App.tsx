import { Alert, AlertTitle, Button, Container, Grid, Typography } from '@mui/material';
import { toast } from "sonner";
import type { Pokemon, BattleBody } from './types/pokemon-battle.types';
import apiService from './service/apiServce';
import { useEffect, useState } from 'react';
import PokemonCard from './components/PokemonCard';
import { getRandomDefender } from './utils/pokemon.utils';

function App() {
  const [pokemonsList, setPokemonsList] = useState<Pokemon[] | null>(null);
  const [selectedAttacker, setSelectedAttacker] = useState<Pokemon | null>(null);
  const [selectedDefender, setSelectedDefender] = useState<Pokemon | null>(null);
  const [winner, setWinner] = useState<string | null>(null);

  useEffect(() => {
    const fetchPokemons = async (): Promise<void> => {
      const {data, error} = await apiService.get("pokemons");

      if(error){
        toast.error(error);
      }
      setPokemonsList(data.pokemons);
    };

    fetchPokemons();
  }, []);

  const selectAttacker = (attacker: Pokemon): void => {
    if (selectedAttacker && selectedAttacker.id === attacker.id) {
      setSelectedAttacker(null);
      setSelectedDefender(null);
      setWinner(null);
    } else {
      setSelectedAttacker(attacker);
    }
  };

  const pokemonBattle = async (body: BattleBody): Promise<void> => {
    const {data, error} = await apiService.post("pokemons/battle", body);

    if(error){
      toast.error(error);
    }
    setWinner(data.message);
  };

  const handleStartBattle = (): void => {
    if(pokemonsList && selectedAttacker){
      const newDefender = getRandomDefender(pokemonsList, selectedAttacker.id);
      if (!newDefender) {
        toast.error("Cannot get defender Pokemon.");
        return;
      }
      setSelectedDefender(newDefender);

      const body = {
        attackerId: selectedAttacker.id,
        defenderId: newDefender.id,
      };
      pokemonBattle(body);
    }
  }

  return (
    <Container sx={{height: "97vh", pt: {xs: 2, sm: 2, md: 5}}}>
      <Typography sx={{ fontWeight: 600, fontSize: {xs: "25px", sm: "25px", md: "35px"} }}>Battle of Pokemon</Typography>
      <Typography sx={{ fontWeight: 500, fontSize: {xs: "18px", sm: "18px", md: "25px"}, mt: {xs: 2, sm: 2, md: 5} }}>Select your pokemon</Typography>
      <Grid container spacing={3}>
        {
          pokemonsList?.map((pokemon) => (
            <Grid item xs={6} sm={4} md={2.4} key={pokemon.id}>
              <PokemonCard 
                {...pokemon}
                title={pokemon.name}
                img={pokemon.imageUrl}
                showStats={false}
                isAttackerSelected={selectedAttacker?.id === pokemon.id}
                isDefenderSelected={selectedDefender?.id === pokemon.id}
                onClick={() => selectAttacker(pokemon)}
              />
            </Grid>
          ))
        }
      </Grid>
      {
        winner && (
          <Alert sx={{border: "3px solid black", my: 3, py: 1, px: 4, boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1), -8px 0px 8px rgba(0, 0, 0, 0.1), 0px 8px 8px rgba(0, 0, 0, 0.1)',}} severity="info" icon={false}>
            <AlertTitle sx={{fontSize: "22px", mb: 0}}>{winner}</AlertTitle>
          </Alert>
        )
      }
      {
        selectedAttacker && (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={4} sx={{display: "flex", justifyContent: {xs: "center", sm: "center", md: "flex-start"}}}>
              <PokemonCard 
                {...selectedAttacker}
                key={selectedAttacker.id}
                title={selectedAttacker.name}
                img={selectedAttacker.imageUrl}
                showStats={true}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
              <Button onClick={handleStartBattle}  sx={{textTransform: 'none', width: "150px", height: "45px", fontSize:"18px"}} color="success" variant="contained">Start Battle</Button>
            </Grid>
            <Grid item xs={12} sm={12} md={4} sx={{ display: 'flex', justifyContent: {xs: "center", sm: "center", md:'flex-end'} }}>
              {
                selectedDefender && (
                  <PokemonCard 
                    {...selectedDefender}
                    key={selectedDefender.id}
                    title={selectedDefender.name}
                    img={selectedDefender.imageUrl}
                    showStats={true}
                  />
                )
              }
            </Grid>
          </Grid>
        )
      }
    </Container>
  )
}

export default App
