import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";
import React from "react";
import { NavLink } from "react-router-dom";

function NavbarSH() {
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
        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex">
            <NavLink to="/login">Login</NavLink>
          </NavbarItem>
          <NavbarItem>
            <Button as={Link} color="primary" href="#" variant="flat">
              <NavLink to="/signup">Signup</NavLink>
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    </>
  );
}

export default NavbarSH;
