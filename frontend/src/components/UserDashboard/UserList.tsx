import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getUsers, deleteUser } from "../../services/userApi";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/system";

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

const StyledTableContainer = styled(TableContainer)({
  padding: "16px",
  borderRadius: "25px",
  boxShadow: "none", // Remove shadows
});

const StyledButton = styled(Button)({
  borderRadius: "20px",
  backgroundColor: "white",
  color: "black",
  "&:hover": {
    backgroundColor: "#1976d2",
    color: "white",
  },
});

const DeleteButton = styled(Button)({
  borderRadius: "20px",
  backgroundColor: "white",
  color: "black",
  "&:hover": {
    backgroundColor: "red",
    color: "white",
  },
});

const UserList: React.FC<UserListProps> = ({ onEdit }) => {
  const queryClient = useQueryClient();

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

  if (isLoading) return <CircularProgress />;
  if (error)
    return (
      <Typography color="error">
        An error occurred: {(error as Error).message}
      </Typography>
    );

  return (
    <StyledTableContainer component={Paper}>
      {users.length === 0 ? (
        <Typography>No users found.</Typography>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                Name
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                Email
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                Batch
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                Sub Group
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                Role
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          {/* Add line to separate header and body */}
          <TableBody sx={{ borderTop: "2px solid #ccc" }}>
            {users.map((user: User) => (
              <TableRow key={user._id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.batch}</TableCell>
                <TableCell>{user.subGroup}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <StyledButton
                    variant="contained"
                    onClick={() => onEdit(user)}
                    sx={{ mr: 1 }}
                  >
                    Edit
                  </StyledButton>
                  <DeleteButton
                    variant="contained"
                    onClick={() => deleteMutation.mutate(user._id!)}
                  >
                    Delete
                  </DeleteButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </StyledTableContainer>
  );
};

export default UserList;
