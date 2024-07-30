import React from "react";
import { NavLink } from "react-router-dom";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";

function Nav() {
	return (
		<Menu>
			<MenuButton
				bg={"rgb(182, 157, 230)"}
				color={"white"}
				as={Button}
				rightIcon={<ChevronDownIcon />}>
				Actions
			</MenuButton>
			<MenuList>
				<NavLink to="/home/zitoun">
					<MenuItem>zitoun</MenuItem>
				</NavLink>
				<NavLink to="/home/kook">
					<MenuItem>kook</MenuItem>
				</NavLink>
				<NavLink to="/home/lim">
					<MenuItem>lim</MenuItem>
				</NavLink>
			</MenuList>
		</Menu>
	);
}

export default Nav;
