import React from 'react';
import { Stack, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const OrderConfirmation = ({ menu, cart, onClose, onCartEmpty, onRemoveRow }) => {
  const getOrderItems = () => {
    const items = [];

    for (const category of menu) {
      for (const product of category.products) {
        const quantity = cart[product.id] || 0;
        if (quantity > 0) {
          items.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity,
            total: product.price * quantity,
          });
        }
      }
    }

    return items;
  };

  const orderItems = getOrderItems();

  const getTotal = () => {
    return orderItems.reduce((total, item) => total + item.total, 0).toFixed(2);
  };
    
  return (
    <Stack spacing={2}>
      <Typography variant="h4"></Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Producto</TableCell>
              <TableCell align="right">Precio unitario</TableCell>
              <TableCell align="right">Subtotal</TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orderItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name} ({item.quantity})</TableCell>
                <TableCell align="right">${item.price}</TableCell>
                <TableCell align="right">${item.total.toFixed(2)}</TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => onRemoveRow(item.id)}
                    startIcon={<DeleteIcon />}
                  >
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Typography>Total del pedido: ${getTotal()}</Typography>
      <Button variant="contained" onClick={onClose} sx={{ height: 60 }} color="success">
        Confirmar pedido
      </Button>
      <Button variant="contained" onClick={onClose} sx={{ height: 60 }}>
        Volver al Menú
      </Button>
    </Stack>
  );
};

export default OrderConfirmation;
