import React, { useState } from "react";
import {
  Container,
  Paper,
  Typography,
  Button,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Alert,
} from "@mui/material";

// Função para ler o CSV localmente
function parseCSV(file, callback) {
  const reader = new FileReader();
  reader.onload = function (event) {
    const text = event.target.result;
    const lines = text.split("\n").map((line) => line.replace("\r", ""));
    const headers = lines[0].split(",");
    const previewRows = lines.slice(1, 6).map((line) => line.split(","));
    callback({ headers, previewRows });
  };
  reader.readAsText(file);
}

export default function Importacao() {
  const [file, setFile] = useState(null);
  const [csvData, setCsvData] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleFileChange = (e) => {
    setError("");
    setSuccess("");
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    if (!selectedFile.name.endsWith(".csv")) {
      setError("Por favor, selecione um arquivo CSV.");
      return;
    }
    setFile(selectedFile);
    parseCSV(selectedFile, setCsvData);
  };

  const handleImport = () => {
    setError("");
    setSuccess("Importação realizada com sucesso! (Simulada)");
    // Aqui você pode enviar os dados para o backend no futuro
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 6 }}>
        <Typography variant="h5" gutterBottom>
          Importação de Planilha de Repasse
        </Typography>
        <Box sx={{ my: 2 }}>
          <Button variant="contained" component="label">
            Selecionar Arquivo CSV
            <input type="file" accept=".csv" hidden onChange={handleFileChange} />
          </Button>
        </Box>
        {file && (
          <Typography variant="subtitle1" gutterBottom>
            Arquivo selecionado: <b>{file.name}</b>
          </Typography>
        )}
        {csvData && (
          <>
            <Typography variant="subtitle2" sx={{ mt: 2 }}>
              Pré-visualização das primeiras linhas:
            </Typography>
            <TableContainer component={Paper} sx={{ mt: 1, mb: 2 }}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    {csvData.headers.map((header, idx) => (
                      <TableCell key={idx}>{header}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {csvData.previewRows.map((row, idx) => (
                    <TableRow key={idx}>
                      {row.map((cell, i) => (
                        <TableCell key={i}>{cell}</TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Button variant="contained" color="success" onClick={handleImport}>
              Importar Planilha
            </Button>
          </>
        )}
        {success && <Alert severity="success" sx={{ mt: 2 }}>{success}</Alert>}
        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
      </Paper>
    </Container>
  );
}