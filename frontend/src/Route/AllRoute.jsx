import React from "react";
import { Route, Routes } from "react-router-dom";
import Register from "../page/Register";
import Login from "../page/Login";
import CreateEvent from "../page/CreateEvent";
import Dashboard from "../page/Dashboard";
import EventDetails from "../page/EventDetails";
import EnrolledPlayer from "../page/EnrolledPlayer";
import AllPlayers from "../page/AllPlayers";
import LoginUserAllEvent from "../page/LoginUserAllEvent";
import PrivateRoute from "../components/PrivateRoute";

const AllRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/create_event"
        element={
          <PrivateRoute>
            <CreateEvent />
          </PrivateRoute>
        }
      />
      <Route
        path="/event_details/:id"
        element={
          <PrivateRoute>
            <EventDetails />
          </PrivateRoute>
        }
      />
      <Route
        path="/all_player/:id"
        element={
          <PrivateRoute>
            <AllPlayers />
          </PrivateRoute>
        }
      />
      <Route
        path="/enrolled_player/:id"
        element={
          <PrivateRoute>
            <EnrolledPlayer />
          </PrivateRoute>
        }
      />
      <Route
        path="/user/allevent"
        element={
          <PrivateRoute>
            <LoginUserAllEvent />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default AllRoute;
