import { Box, Card, CardContent, CardHeader, Divider, LinearProgress, Typography } from "@mui/material";
import type { PokemonCardProps } from "../types/pokemon-battle.types";

export default function PokemonCard({
  title,
  img,
  showStats,
  isAttackerSelected,
  isDefenderSelected,
  onClick,
  attack,
  defense,
  hp,
  speed,
}: PokemonCardProps): JSX.Element {

  const calculateProgress = (stat: number): number => {
    return (stat / 6) * 100;
  }

  return (
    <Card
      sx={{
        marginTop: 2,
        marginBottom: 2,
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1), -8px 0px 8px rgba(0, 0, 0, 0.1), 0px 8px 8px rgba(0, 0, 0, 0.1)',
        borderRadius: "10px",
        border: isAttackerSelected ? "3px solid red" : isDefenderSelected ? "3px solid blue" : 'initial',
        cursor: !showStats ? 'pointer' : '',
        width: showStats ? "300px" : "initial"
      }}
      onClick={onClick}
    >
      <CardHeader
        sx={{pb: showStats ? 0 : '16px'}}
        title={
          <>
            <img
              src={img}
              alt={title}
              style={{ width: "100%", }}
            />
            <Typography
              variant="h5"
              color="var(--text-subtitle)"
              sx={{ fontWeight: 700, fontSize: showStats ? "22px" : "16px" }}
            >
              {title}
            </Typography>
          </>
        }
      />
      {showStats && (
        <CardContent sx={{pt: 0}}>
          <Divider sx={{mb: 2}} />
          <Box>
            <Typography sx={{ fontWeight: 500, fontSize: "12px" }}>
              HP
            </Typography>
            <LinearProgress
              variant="determinate"
              value={calculateProgress(hp)}
              sx={{ marginBottom: 1, height: '8px', borderRadius: "5px", backgroundColor: "#9f979759", '& .MuiLinearProgress-bar': {
                backgroundColor: '#89f561',
              } }}
            />
          </Box>
          <Box>
            <Typography sx={{ fontWeight: 500, fontSize: "12px" }}>Attack</Typography>
            <LinearProgress
              variant="determinate"
              value={calculateProgress(attack)}
              sx={{ marginBottom: 1, height: '8px', borderRadius: "5px", backgroundColor: "#9f979759", '& .MuiLinearProgress-bar': {
                backgroundColor: '#89f561',
              } }}
            />
          </Box>
          <Box>
            <Typography sx={{ fontWeight: 500, fontSize: "12px" }}>Defense</Typography>
            <LinearProgress
              variant="determinate"
              value={calculateProgress(defense)}
              sx={{ marginBottom: 1, height: '8px', borderRadius: "5px", backgroundColor: "#9f979759", '& .MuiLinearProgress-bar': {
                backgroundColor: '#89f561',
              } }}
            />
          </Box>
          <Box>
            <Typography sx={{ fontWeight: 500, fontSize: "12px" }}>Speed</Typography>
            <LinearProgress
              variant="determinate"
              value={calculateProgress(speed)}
              sx={{ marginBottom: 1, height: '8px', borderRadius: "5px", backgroundColor: "#9f979759", '& .MuiLinearProgress-bar': {
                backgroundColor: '#89f561',
              } }}
            />
          </Box>
        </CardContent>
      )}
    </Card>
  );
}
