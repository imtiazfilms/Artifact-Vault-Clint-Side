import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Error from "../Pages/Error";
import AddArtifact from "../Pages/AddArtifact";
import Artifacts from "../Pages/Artifacts";
import ArtifactDetails from "../Pages/ArtifactDetails";
import PrivetRoute from "./PrivetRoute";



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
                path: "/artifact-details/:id",
                element: <ArtifactDetails></ArtifactDetails>
            }
        ]
    },
    {
        path: "*",
        element: <Error></Error>
    }
])

export default Routes;