import React, { useState } from "react";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  Stack,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

// Mock de lojas
const lojas = [
  "Todas",
  "Loja Exemplo",
  "Loja Teste",
  "Loja XPTO"
];

// Dados fictícios para exemplo
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

// Filtros
function filtrarRepasses({ busca, dataInicio, dataFim, loja, ordenarPor, ordenarSentido }) {
  let filtered = repassesMock.filter((item) => {
    const texto = [item.numeroPedido, item.loja, item.eventos, item.observacoes].join(" ").toLowerCase();
    if (busca && !texto.includes(busca.toLowerCase())) return false;
    if (loja !== "Todas" && item.loja !== loja) return false;
    if (dataInicio && item.data < dataInicio) return false;
    if (dataFim && item.data > dataFim) return false;
    return true;
  });
  filtered = filtered.sort((a, b) => {
    let campoA = ordenarPor === "data" ? a.data : a.repasseReal;
    let campoB = ordenarPor === "data" ? b.data : b.repasseReal;
    if (ordenarSentido === "asc") {
      return campoA < campoB ? -1 : campoA > campoB ? 1 : 0;
    } else {
      return campoA > campoB ? -1 : campoA < campoB ? 1 : 0;
    }
  });
  return filtered;
}

const COLORS = ["#1976d2", "#2e7d32", "#d32f2f", "#ffa000"];

export default function Dashboard() {
  const [busca, setBusca] = useState("");
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [loja, setLoja] = useState("Todas");
  const [ordenarPor, setOrdenarPor] = useState("data");
  const [ordenarSentido, setOrdenarSentido] = useState("desc");

  const filtered = filtrarRepasses({ busca, dataInicio, dataFim, loja, ordenarPor, ordenarSentido });

  // Resumo
  const totalRepasse = filtered.reduce((acc, r) => acc + r.repasseReal, 0);
  const totalPedidos = filtered.length;
  const totalCustos = filtered.reduce((acc, r) => acc + r.frete + r.comissao + r.taxaFixa + r.afiliados + r.demaisAcrescimos + r.demaisDespesas, 0);
  const totalComissao = filtered.reduce((acc, r) => acc + r.comissao, 0);

  // Gráficos
  const custos = [
    { name: "Frete", value: filtered.reduce((acc, r) => acc + r.frete, 0) },
    { name: "Comissão", value: filtered.reduce((acc, r) => acc + r.comissao, 0) },
    { name: "Taxa Fixa", value: filtered.reduce((acc, r) => acc + r.taxaFixa, 0) },
    { name: "Demais", value: filtered.reduce((acc, r) => acc + r.afiliados + r.demaisAcrescimos + r.demaisDespesas, 0) },
  ];
  const pedidosPorLoja = lojas.slice(1).map((nome) => ({
    loja: nome,
    pedidos: filtered.filter((r) => r.loja === nome).length,
  }));

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard de Projeção de Repasse
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
      <Grid container spacing={3}>
        {/* Cards resumo */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderLeft: `6px solid #1976d2` }}>
            <CardContent>
              <Typography variant="subtitle2" color="textSecondary">
                Total Repasse
              </Typography>
              <Typography variant="h5">
                R$ {totalRepasse.toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderLeft: `6px solid #2e7d32` }}>
            <CardContent>
              <Typography variant="subtitle2" color="textSecondary">
                Pedidos
              </Typography>
              <Typography variant="h5">{totalPedidos}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderLeft: `6px solid #d32f2f` }}>
            <CardContent>
              <Typography variant="subtitle2" color="textSecondary">
                Custos
              </Typography>
              <Typography variant="h5">
                R$ {totalCustos.toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderLeft: `6px solid #ffa000` }}>
            <CardContent>
              <Typography variant="subtitle2" color="textSecondary">
                Comissão
              </Typography>
              <Typography variant="h5">
                R$ {totalComissao.toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Distribuição dos Custos
            </Typography>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={custos}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={40}
                  outerRadius={80}
                  fill="#1976d2"
                  label
                >
                  {custos.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Pedidos por Loja
            </Typography>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={pedidosPorLoja}>
                <XAxis dataKey="loja" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="pedidos" fill="#1976d2" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
      <Box mt={4}>
        <Typography variant="caption" color="textSecondary">
          * Os dados acima são exemplos. Conecte ao backend/importação de planilha para valores reais.
        </Typography>
      </Box>
    </Container>
  );
}
