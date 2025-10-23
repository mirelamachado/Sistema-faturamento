import React, { useState } from "react";
import {
  Container,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Box,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Stack,
} from "@mui/material";

// Mock de marketplaces/lojas
const lojas = [
  "Todas",
  "Loja Exemplo",
  "Loja Teste",
  "Loja XPTO"
];

// Dados fictícios de repasses
const repassesMock = [
  {
    numeroPedido: "12345",
    loja: "Loja Exemplo",
    entrega: "Expressa",
    data: "2025-10-21",
    valorProdutos: 1000,
    frete: 50,
    comissao: 100,
    taxaFixa: 10,
    afiliados: 20,
    demaisAcrescimos: 5,
    demaisDespesas: 15,
    eventos: "Black Friday",
    reenvio: 0,
    devolucao: 0,
    repasseReal: 900,
    observacoes: "Pedido sem observações",
  },
  {
    numeroPedido: "67890",
    loja: "Loja Teste",
    entrega: "Normal",
    data: "2025-10-22",
    valorProdutos: 500,
    frete: 20,
    comissao: 50,
    taxaFixa: 5,
    afiliados: 10,
    demaisAcrescimos: 0,
    demaisDespesas: 5,
    eventos: "Promoção Dia das Mães",
    reenvio: 0,
    devolucao: 0,
    repasseReal: 455,
    observacoes: "Reenvio solicitado",
  },
  {
    numeroPedido: "54321",
    loja: "Loja XPTO",
    entrega: "Expressa",
    data: "2025-10-20",
    valorProdutos: 800,
    frete: 30,
    comissao: 80,
    taxaFixa: 8,
    afiliados: 15,
    demaisAcrescimos: 2,
    demaisDespesas: 10,
    eventos: "Semana do Consumidor",
    reenvio: 0,
    devolucao: 50,
    repasseReal: 685,
    observacoes: "Devolução parcial",
  },
];

export default function Repasses() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [busca, setBusca] = useState("");
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [loja, setLoja] = useState("Todas");
  const [ordenarPor, setOrdenarPor] = useState("data");
  const [ordenarSentido, setOrdenarSentido] = useState("desc");

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // Filtragem
  let filtered = repassesMock.filter((item) => {
    const texto = [item.numeroPedido, item.loja, item.eventos, item.observacoes].join(" ").toLowerCase();
    if (busca && !texto.includes(busca.toLowerCase())) return false;
    if (loja !== "Todas" && item.loja !== loja) return false;
    if (dataInicio && item.data < dataInicio) return false;
    if (dataFim && item.data > dataFim) return false;
    return true;
  });

  // Ordenação
  filtered = filtered.sort((a, b) => {
    let campoA = ordenarPor === "data" ? a.data : a.repasseReal;
    let campoB = ordenarPor === "data" ? b.data : b.repasseReal;
    if (ordenarSentido === "asc") {
      return campoA < campoB ? -1 : campoA > campoB ? 1 : 0;
    } else {
      return campoA > campoB ? -1 : campoA < campoB ? 1 : 0;
    }
  });

  return (
    <Container maxWidth="xl" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Listagem Detalhada de Repasses e Custos
        </Typography>
        <Stack direction={{ xs: "column", md: "row" }} spacing={2} sx={{ my: 2 }}>
          <TextField
            label="Buscar por pedido, loja ou evento"
            variant="outlined"
            size="small"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            fullWidth
          />
          <FormControl size="small" sx={{ minWidth: 140 }}>
            <InputLabel>Marketplace/Loja</InputLabel>
            <Select
              label="Marketplace/Loja"
              value={loja}
              onChange={(e) => setLoja(e.target.value)}
            >
              {lojas.map((l) => (
                <MenuItem key={l} value={l}>{l}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Data Inicial"
            type="date"
            size="small"
            value={dataInicio}
            onChange={(e) => setDataInicio(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Data Final"
            type="date"
            size="small"
            value={dataFim}
            onChange={(e) => setDataFim(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Ordenar por</InputLabel>
            <Select
              label="Ordenar por"
              value={ordenarPor}
              onChange={(e) => setOrdenarPor(e.target.value)}
            >
              <MenuItem value="data">Data</MenuItem>
              <MenuItem value="valor">Repasse Real</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Sentido</InputLabel>
            <Select
              label="Sentido"
              value={ordenarSentido}
              onChange={(e) => setOrdenarSentido(e.target.value)}
            >
              <MenuItem value="asc">Crescente</MenuItem>
              <MenuItem value="desc">Decrescente</MenuItem>
            </Select>
          </FormControl>
        </Stack>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Nº Pedido</TableCell>
                <TableCell>Loja</TableCell>
                <TableCell>Entrega</TableCell>
                <TableCell>Data</TableCell>
                <TableCell>Valor Produtos</TableCell>
                <TableCell>Frete</TableCell>
                <TableCell>Comissão</TableCell>
                <TableCell>Taxa Fixa</TableCell>
                <TableCell>Afiliados</TableCell>
                <TableCell>Demais Acréscimos</TableCell>
                <TableCell>Demais Despesas</TableCell>
                <TableCell>Eventos/Promoções</TableCell>
                <TableCell>Reenvio</TableCell>
                <TableCell>Devolução</TableCell>
                <TableCell>Repasse Real</TableCell>
                <TableCell>Observações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, idx) => (
                  <TableRow key={row.numeroPedido + idx}>
                    <TableCell>{row.numeroPedido}</TableCell>
                    <TableCell>{row.loja}</TableCell>
                    <TableCell>{row.entrega}</TableCell>
                    <TableCell>{row.data}</TableCell>
                    <TableCell>R$ {row.valorProdutos.toFixed(2)}</TableCell>
                    <TableCell>R$ {row.frete.toFixed(2)}</TableCell>
                    <TableCell>R$ {row.comissao.toFixed(2)}</TableCell>
                    <TableCell>R$ {row.taxaFixa.toFixed(2)}</TableCell>
                    <TableCell>R$ {row.afiliados.toFixed(2)}</TableCell>
                    <TableCell>R$ {row.demaisAcrescimos.toFixed(2)}</TableCell>
                    <TableCell>R$ {row.demaisDespesas.toFixed(2)}</TableCell>
                    <TableCell>{row.eventos}</TableCell>
                    <TableCell>R$ {row.reenvio.toFixed(2)}</TableCell>
                    <TableCell>R$ {row.devolucao.toFixed(2)}</TableCell>
                    <TableCell>
                      <b>R$ {row.repasseReal.toFixed(2)}</b>
                    </TableCell>
                    <TableCell>{row.observacoes}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={filtered.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25, 50]}
        />
      </Paper>
    </Container>
  );
}
