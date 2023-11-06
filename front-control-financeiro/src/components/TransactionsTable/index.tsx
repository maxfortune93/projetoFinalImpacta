import { useEffect, useState } from "react";
import { Container, menuFontSize } from "./styles";
import { useTransactionServices } from "../../services/useTransactionsServices";
import { Box, Fab, IconButton, ListItemIcon, Menu, MenuItem, Tooltip } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NewTransactionModal } from "../NewTransactionModal";
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons/faEllipsisV';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import { useNavigate } from "react-router-dom";
import { SpinnerLoad }  from "../SpinnerLoad";


interface Transaction {
  id: number;
  title: string;
  amount: number;
  type: string;
  category: string;
  createdAt: string;
};

function ButtonMenu(props: any) {

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
      const open = Boolean(anchorEl);
      const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
      };
      const handleClose = () => {
        setAnchorEl(null);
      };
      return (
        <>
          <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
           
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
              >
               <FontAwesomeIcon icon={faEllipsisV} />
              </IconButton>
            </Tooltip>
          </Box>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                '&:before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 19,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
           
            <MenuItem style={menuFontSize} onClick={props.onEdit}>
              <ListItemIcon>
                <CreateOutlinedIcon   fontSize="small" />
              </ListItemIcon>
              Atualizar
            </MenuItem>

            <MenuItem style={menuFontSize} onClick={props.onDelete}>
              <ListItemIcon>
                <DeleteIcon fontSize="small" />
              </ListItemIcon>
             Deletar
            </MenuItem>
            
          </Menu>
        </>
      );
    }
    
export function TransactionsTable({ onTransactionDataChange }: any) {

  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);

  const [loading, setLoading] = useState(false);

  const { getAllTransactions, deleteTransactions } = useTransactionServices();

  const [isNewTransactionsModalOpen, setIsNewTransactionsModalOpen] = useState(false);

  const navigate = useNavigate();

  function handleOpenNewTransactionModal() {
    setIsNewTransactionsModalOpen(true);
  }

  function handleCloseNewTransactionModal() {
    setIsNewTransactionsModalOpen(false);
    initialize();
  }

  const handleDataUpdate = (value:any) => {
     onTransactionDataChange(value);
};

  const initialize = async () => {
    setLoading(true);
    try {
        const transact = await getAllTransactions();
        handleDataUpdate(transact.transactions);
        setTransactions(transact.transactions);
    } catch (error) {
        console.error('Erro ao obter transações:', error);
    } finally {
        setLoading(false);
    }
};

  const handleDelete = async (value: any) =>{ 
    const result = await deleteTransactions(value.id);
    if(result.message){
      navigate('/teste');
      await initialize();
    }
  }

 const handleEdit = async (value: any) => {
  setEditingTransaction(value);
  setIsNewTransactionsModalOpen(true);
};
  

useEffect(() => {
  initialize(); 
}, []);


  return (
    <>
    {loading && <SpinnerLoad />}
    {!loading && <Container>
      <table>
        <thead>
          <tr>
            <th>Titulo</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
          </tr>
        </thead>

        <tbody>
            {transactions.map(transaction => {
              return (
                <tr key={transaction.id}>
                  <td>{transaction.title}</td>
                  <td className={transaction.type}>
                    {new Intl.NumberFormat('pt-BR',{
                      style: 'currency',
                      currency: 'BRL'
                    }).format(transaction.amount)}
                  </td>
                  <td>{transaction.category}</td>
                  <td>
                    {new Intl.DateTimeFormat('pt-BR').format(new Date(transaction.createdAt))}
                  </td>
                  <td style={{width:'20px'}}>
                  <ButtonMenu onDelete={() => handleDelete(transaction)} onEdit={() => handleEdit(transaction)} />
                  </td>
                </tr>
              )
            })}
        </tbody>
      </table>

      <div style={{ margin: 10, right: 40, bottom: 20, position: 'fixed' }}>
        <Fab style={{ backgroundColor: 'var(--blue)', color: 'white' }}  aria-label="add" onClick={handleOpenNewTransactionModal}>
            <AddIcon />
        </Fab>
     </div>
    </Container>
  }
    
    
    <NewTransactionModal
        isOpen={isNewTransactionsModalOpen}
        onRequestClose={handleCloseNewTransactionModal}
        editedTransaction={editingTransaction}

      />
    </>
  );
}
