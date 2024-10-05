import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getUsers, deleteUser } from "../../services/userApi";
import {
  Button,
  CircularProgress,
  Typography,
  TextField,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
} from "@mui/material";
import { styled } from "@mui/system";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import DescriptionIcon from "@mui/icons-material/Description";

interface User {
  _id?: string;
  name: string;
  email: string;
  role: string;
  batch?: string;
  subGroup?: string;
}

interface UserListProps {
  onEdit: (user: User) => void;
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: "bold",
}));

const UserList: React.FC<UserListProps> = ({ onEdit }) => {
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState("");
  const [roleFilter, setRoleFilter] = useState<"Student" | "Instructor" | null>(
    null
  );

  const {
    data: users = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const filteredUsers = users.filter((user: User) => {
    const matchesName = user.name.toLowerCase().includes(filter.toLowerCase());
    const matchesRole = roleFilter === null || user.role === roleFilter;
    return matchesName && matchesRole;
  });

  const handleGenerateReport = () => {
    console.log("Generating user report...");
  };

  if (isLoading) return <CircularProgress />;
  if (error)
    return (
      <Typography color="error">
        An error occurred: {(error as Error).message}
      </Typography>
    );

  return (
    <Paper elevation={3} className="p-6">
      <Typography variant="h4" gutterBottom>
        User Management
      </Typography>

      {/* Filters Section */}
      <div className="flex justify-between items-center mb-6 gap-4">
        <TextField
          label="Filter by Name/Email"
          variant="outlined"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="flex-grow"
        />
        <div className="flex gap-2">
          <Chip
            label="Student"
            onClick={() => setRoleFilter("Student")}
            color={roleFilter === "Student" ? "primary" : "default"}
            clickable
          />
          <Chip
            label="Instructor"
            onClick={() => setRoleFilter("Instructor")}
            color={roleFilter === "Instructor" ? "primary" : "default"}
            clickable
          />
          <Chip
            label="Reset"
            onClick={() => setRoleFilter(null)}
            variant="outlined"
            clickable
          />
        </div>
        <Tooltip title="Generate Report">
          <IconButton onClick={handleGenerateReport} color="primary">
            <DescriptionIcon />
          </IconButton>
        </Tooltip>
      </div>

      {/* User Table */}
      <TableContainer component={Paper} elevation={1}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Role</StyledTableCell>
              <StyledTableCell>Batch</StyledTableCell>
              <StyledTableCell>Sub Group</StyledTableCell>
              <StyledTableCell align="right">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6}>
                  <Typography align="center">No users found.</Typography>
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map((user: User) => (
                <TableRow key={user._id} hover>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Chip
                      label={user.role}
                      color={user.role === "Student" ? "secondary" : "primary"}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{user.batch || "N/A"}</TableCell>
                  <TableCell>{user.subGroup || "N/A"}</TableCell>
                  <TableCell align="right">
                    <Tooltip title="Edit">
                      <IconButton
                        onClick={() => onEdit(user)}
                        color="primary"
                        size="small"
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton
                        onClick={() => deleteMutation.mutate(user._id!)}
                        color="error"
                        size="small"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default UserList;
