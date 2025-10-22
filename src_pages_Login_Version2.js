import React, { useState } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
} from "@mui/material";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !senha) {
      setErro("Por favor, preencha todos os campos.");
      return;
    }
    setErro("");
    window.location.hash = "/dashboard";
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} sx={{ padding: 4, mt: 8 }}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography variant="h5" gutterBottom>
            Login - App de Repasse
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
            <TextField
              label="E-mail"
              variant="outlined"
              margin="normal"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Senha"
              type="password"
              variant="outlined"
              margin="normal"
              fullWidth
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
            {erro && (
              <Typography color="error" variant="body2">
                {erro}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
            >
              Entrar
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}

export default Login;