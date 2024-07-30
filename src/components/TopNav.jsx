import { mergeRefs, mergeStyles, styles, useHover } from "fhf-react";
import React, { useEffect, useState } from "react";
import placeHolderImg from "/placeholderProfImg.jpg";

import { LazyLoadImage } from "react-lazy-load-image-component";
import { useAuth } from "../contexts/AuthContext";
import { SignOut } from "../auth";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
	Button,
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerHeader,
	DrawerOverlay,
	transition,
	useDisclosure,
} from "@chakra-ui/react";

function TopNav() {
	const { currentUser } = useAuth();
	const [dispBtnNav, setDispBtnNav] = useState(false);
	const [profileImg, setProfileImg] = useState(placeHolderImg);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { refOfUseHover, useHoverIsHovered } = useHover();
	useEffect(() => {
		const img = new Image();
		img.src = currentUser?.providerData?.[0]?.photoURL || placeHolderImg;
		img.onload = () => setProfileImg(img.src);
		img.onerror = () => setProfileImg(placeHolderImg);
	}, [currentUser]);

	const navigate = useNavigate();

	const handleLogout = async () => {
		try {
			await SignOut();
			setDispBtnNav(false);
			navigate("/login");
		} catch (error) {
			Swal.fire({
				title: "Error",
				text: error.message,
				icon: "error",
			});
		}
	};

	return (
		<>
			<div
				className="top-nav"
				style={mergeStyles(
					styles.respPaddingTop(40, 60),
					styles.respPaddingBottom(20, 35)
				)}>
				<h1>FHF Agriculture</h1>
				<Button
					style={mergeStyles(
						{
							borderRadius: "50%",
						},
						styles.pxWidth(50),
						styles.pxHeight(50),
						styles.border(2, "solid", "rgb(182, 157, 230)"),
						styles.paddingNone
					)}
					ref={mergeRefs(refOfUseHover)}
					onClick={onOpen}
					aria-label="Toggle Navigation">
					<LazyLoadImage
						style={mergeStyles(
							{ borderRadius: "50%", transition: "filter 0.001s linear" },
							styles.fullWidthHeight,
							{ filter: useHoverIsHovered ? "grayscale(1)" : "grayscale(0)" }
						)}
						src={profileImg}
						alt="Profile"
						effect="blur"
					/>
				</Button>
			</div>
			<Drawer isOpen={isOpen} placement="right" onClose={onClose}>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerCloseButton />
					<DrawerHeader>Create your account</DrawerHeader>

					<DrawerBody
						display={"flex"}
						flexDirection={"column"}
						justifyContent={"space-between"}>
						<div>
							<p style={{ marginBottom: "10px" }}>
								Logged in as {currentUser?.displayName || "Unknown User"}
							</p>
							<p style={{ marginBottom: "10px" }}>
								Email: {currentUser?.email}
							</p>
							{currentUser?.emailVerified ? (
								<p style={{ marginBottom: "10px" }}>
									Your account is verified.
								</p>
							) : (
								<p style={{ marginBottom: "10px" }}>
									Please verify your email by checking your inbox.
								</p>
							)}
						</div>
						<Button
							bg="rgb(182, 157, 230)"
							color={"white"}
							onClick={handleLogout}
							mb={10}>
							Logout
						</Button>
					</DrawerBody>
				</DrawerContent>
			</Drawer>
		</>
	);
}

export default TopNav;
{
	/* <p>Logged in as {currentUser?.displayName || "Unknown User"}</p>
<p>Email: {currentUser?.email}</p>

<Button
	bg="rgb(182, 157, 230)"
	color={"white"}
	onClick={handleLogout}>
	Logout
</Button> */
}
