import React, { useState, useEffect } from 'react';
import axios from 'axios';
import OrderConfirmation from './OrderConfirmation';
import { Stack, Typography, Button } from '@mui/material';
import { yellow } from '@mui/material/colors';


const Menu = () => {
  const [menu, setMenu] = useState([]);
  const [cart, setCart] = useState({});
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    // Simulación con archivo estático
    axios.get('menu-data.json')
      .then(response => setMenu(response.data))
      .catch(error => console.error('Error fetching menu:', error));
  }, []);

  const addToCart = (product) => {
    setCart(prevCart => {
      const newCart = { ...prevCart };
      newCart[product.id] = (newCart[product.id] || 0) + 1;
      return newCart;
    });
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => {
      const newCart = { ...prevCart };
      if (newCart[productId] > 0) {
        newCart[productId] -= 1;
        if (newCart[productId] === 0) {
          delete newCart[productId];
        }
      }
      return newCart;
    });
  };

  const showOrderConfirmation = () => {
    setShowConfirmation(true);
  };

  const isItemSelected = (productId) => {
    return cart[productId] && cart[productId] > 0;
  };

  const isCartEmpty = () => {
	return Object.keys(cart).length === 0;
  };

  const handleRemoveRow = (productId) => {
    setCart(prevCart => {
      const newCart = { ...prevCart };
	  delete newCart[productId];
	  
    if (Object.keys(newCart).length === 0) {
      setShowConfirmation(false);
      onCartEmpty();
    }
	  
      return newCart;
    });
  };
  
  const onCartEmpty = () => {
    console.log('Carrito vacío');
  };


  return (
    <Stack spacing={3}>
      {!showConfirmation ? (
        <>
          {menu.map(category => (
            <Stack key={category.id} spacing={2}>
              <Typography variant="h4">{category.name}</Typography>
              {category.products.map(product => (
                <Stack key={product.id} direction="row" spacing={2} sx={{padding:'1em',backgroundColor: isItemSelected(product.id) ? yellow[100] : 'inherit'}}>
                  <img src={product.image} alt={product.name} width="100" height="100" />
                  <div>
                    <Typography variant="h5">{product.name}</Typography>
                    <Typography>{product.description}</Typography>
                    <Typography>${product.price}</Typography>
					<Stack direction="row" spacing={1} alignItems="center">
					  <Button variant="contained" onClick={() => removeFromCart(product.id)}>-</Button>
						<Typography variant="body1">{cart[product.id] || 0}</Typography>
					  <Button variant="contained" onClick={() => addToCart(product)}>+</Button>
					</Stack>
                  </div>
                </Stack>
              ))}
            </Stack>
          ))}
          <Button variant="contained" onClick={showOrderConfirmation} sx={{ height: 60 }} disabled={isCartEmpty()}>Ver Pedido</Button>
        </>
      ) : (
        <OrderConfirmation menu={menu} cart={cart} onClose={() => setShowConfirmation(false)} onCartEmpty={() => setShowConfirmation(false)} onRemoveRow={handleRemoveRow} />
      )}
    </Stack>
  );
};

export default Menu;
