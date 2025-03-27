import React, { useEffect, useState } from "react";
import {
  Container,
  Card,
  CardContent,
  Avatar,
  Typography,
  IconButton,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box,
  useTheme,
  Pagination,
  InputAdornment,
} from "@mui/material";
import { Edit, Delete, Brightness4, Brightness7, Logout, Search } from "@mui/icons-material";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers, updateUser, deleteUser } from "../redux/usersSlice";

const Users = ({ toggleTheme, darkMode }) => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const status = useSelector((state) => state.users.status);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const usersPerPage = 6;
  const theme = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUsers());
    }
  }, [dispatch, status]);

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setOpenEdit(true);
  };

  const handleEditSave = () => {
    dispatch(updateUser(selectedUser));
    // toast.success("User details updated successfully!");
    setOpenEdit(false);
  };

  const handleDeleteClick = (userId) => {
    // if (!window.confirm("Are you sure you want to delete this user?")) return;
    dispatch(deleteUser(userId));
    // toast.success("User deleted successfully!");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully!");
    navigate("/");
  };

  const filteredUsers = users.filter((user) =>
    `${user.first_name} ${user.last_name}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const paginatedUsers = filteredUsers.slice((page - 1) * usersPerPage, page * usersPerPage);

  return (
    <Container maxWidth="lg">
      {/* Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", my: 3 }}>
        <Typography variant="h4" fontWeight="bold">Users Management</Typography>
        <Box>
          <IconButton onClick={toggleTheme} color="inherit" sx={{ mr: 2 }}>
            {darkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          <Button variant="contained" color="error" onClick={handleLogout} startIcon={<Logout />}>
            Logout
          </Button>
        </Box>
      </Box>

      {/* Search Bar */}
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search users..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{ mb: 3 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }}
      />

      {/* User Grid */}
      <Grid container spacing={4} justifyContent="center">
        {paginatedUsers.map((user) => (
          <Grid item xs={12} sm={6} md={4} key={user.id}>
            <Card
              sx={{
                width: "100%",
                maxWidth: 350,
                textAlign: "center",
                p: 2,
                boxShadow: 3,
                transition: "0.3s",
                "&:hover": { boxShadow: 6 },
                backgroundColor: theme.palette.mode === "dark" ? "#333" : "#f5f5f5",
                borderRadius: 2,
              }}
            >
              <Avatar src={user.avatar} alt={user.first_name} sx={{ width: 90, height: 90, mx: "auto", mb: 1 }} />
              <CardContent>
                <Typography variant="h6">{user.first_name} {user.last_name}</Typography>
                <Typography variant="body2" color="textSecondary">{user.email}</Typography>
                <Box mt={2} display="flex" justifyContent="center" gap={1}>
                  <Button variant="outlined" color="secondary" startIcon={<Edit />} onClick={() => handleEditClick(user)}>
                    Edit
                  </Button>
                  <Button variant="contained" color="error" startIcon={<Delete />} onClick={() => handleDeleteClick(user.id)}>
                    Delete
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Pagination (Moved Below) */}
      <Box display="flex" justifyContent="center" mt={4}>
        <Pagination
          count={Math.ceil(filteredUsers.length / usersPerPage)}
          page={page}
          onChange={(_, value) => setPage(value)}
          sx={{ "& .MuiPaginationItem-root": { fontSize: "16px", padding: "10px" } }}
          shape="rounded"
          showFirstButton
          showLastButton
        />
      </Box>

      {/* Edit User Modal */}
      <Dialog open={openEdit} onClose={() => setOpenEdit(false)} fullWidth maxWidth="sm">
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="First Name"
            value={selectedUser?.first_name || ""}
            onChange={(e) => setSelectedUser({ ...selectedUser, first_name: e.target.value })}
            margin="dense"
          />
          <TextField
            fullWidth
            label="Last Name"
            value={selectedUser?.last_name || ""}
            onChange={(e) => setSelectedUser({ ...selectedUser, last_name: e.target.value })}
            margin="dense"
          />
          <TextField
            fullWidth
            label="Email"
            value={selectedUser?.email || ""}
            onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEdit(false)} color="secondary">Cancel</Button>
          <Button onClick={handleEditSave} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Users;
