import { deleteUser, getAllUsers, updateUser } from "controllers/users";
import { Router } from "express";
import { isAuthenticated, isOwner } from "middleware";

export default (router: Router) => {
  router.get("/users", isAuthenticated, getAllUsers);
  router.delete("/users/:id", isAuthenticated, isOwner, deleteUser);
  router.patch("/users/:id", isAuthenticated, isOwner, updateUser);
};
