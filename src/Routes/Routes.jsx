import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Error from "../Pages/Error";
import AddArtifact from "../Pages/AddArtifact";
import Artifacts from "../Pages/Artifacts";
import PrivetRoute from "./PrivetRoute";
import ArtifactDetails from "../Pages/ArtifactDetails";
import MyArtifacts from "../Pages/MyArtifacts";
import UpdateArtifact from "../Pages/UpdateArtifact";
import LikedArtifacts from "../Pages/LikedArtifacts";




const Routes = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "/login",
                element: <Login></Login>
            },
            {
                path: "/register",
                element: <Register></Register>
            },
            {
                path: "/add-artifact",
                element: <PrivetRoute><AddArtifact></AddArtifact></PrivetRoute>
            },
            {
                path: "/artifacts",
                element: <Artifacts></Artifacts>
            },
            {
                path: "/artifact/:id",
                element: <PrivetRoute><ArtifactDetails></ArtifactDetails></PrivetRoute>
            },
            {
                path: "/my-artifacts",
                element: <PrivetRoute><MyArtifacts></MyArtifacts></PrivetRoute>
            },
            {
                path: "/update/:id",
                element: <PrivetRoute><UpdateArtifact></UpdateArtifact></PrivetRoute>
            },
            {
                path: "/liked",
                element: <PrivetRoute><LikedArtifacts></LikedArtifacts></PrivetRoute>
            }
        ]
    },
    {
        path: "*",
        element: <Error></Error>
    }
])

export default Routes;