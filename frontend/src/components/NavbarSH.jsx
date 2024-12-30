import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";
import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { dataContext } from "../context/DataContext";

function NavbarSH() {
  const { currentUserData } = useContext(dataContext);

  return (
    <>
      <Navbar>
        <NavbarBrand>
          <p className="font-extrabold text-inherit text-2xl">STAY HUB</p>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            <NavLink to="/profile">Bookings</NavLink>
          </NavbarItem>
          <NavbarItem isActive>
            <NavLink to="/">Home</NavLink>
          </NavbarItem>
          <NavbarItem>
            <NavLink to="/profile">Profile</NavLink>
          </NavbarItem>
        </NavbarContent>

        {currentUserData ? (
          <>
            <NavbarContent justify="end">
              <NavbarItem className="hidden lg:flex">
                <NavLink to="/login">Login</NavLink>
              </NavbarItem>
              <NavbarItem>
                <NavLink to="/signup">
                  <Button as={Link} color="primary" href="#" variant="flat">
                    Signup
                  </Button>
                </NavLink>
              </NavbarItem>
            </NavbarContent>
          </>
        ) : (
          <>
            <NavbarContent justify="end">
              <Button as={Link} color="primary" href="#" variant="flat">
                Logout
              </Button>
            </NavbarContent>
          </>
        )}
      </Navbar>
    </>
  );
}

export default NavbarSH;
