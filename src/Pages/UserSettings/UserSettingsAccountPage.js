import { useContext } from 'react'

import { Stack, Typography, Button, Box, Divider } from "@mui/material";
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

import { getAuth, signInWithPopup, TwitterAuthProvider } from "firebase/auth";

import { UserSettingsPage } from "./UserSettingsPage";
import { useUser } from 'Api/Hooks';

import { AuthContext } from 'Context/Auth/AuthProvider';
import { AppContext } from 'Context/AppProvider';
import { linkWithTwitter, unLinkTwitter } from 'Api/Endpoints';

const UserAccountCard = (props) => {
	const app = useContext(AppContext);

	const onLinkAccount = () => {
		if (!props.account) {
			const provider = new TwitterAuthProvider();
			const auth = getAuth();

			signInWithPopup(auth, provider)
				.then((result) => {
					console.log(result)
					const credential = TwitterAuthProvider.credentialFromResult(result);
					const token = credential.accessToken;
					const secret = credential.secret;

					// The signed-in user info.
					const handle = result.user?.reloadUserInfo?.screenName;
					const email = result.user?.email
					const id = result.user?.providerData[0]?.uid

					linkWithTwitter({ token, secret, email, handle, id }).then((result) => {
						console.log(result)
						app.alert.setSuccess('Account linked successfully');
						if (props.refreshUser && props.refreshUser instanceof Function)
							props.refreshUser()
					}).catch((error) => {
						console.log(error)
						app.alert.setError(`Account linking failed ${error}`);
					})

				}).catch((error) => {
					// Handle Errors here.
					//const errorCode = error.code;
					//console.log("error code", error)
					const errorMessage = error.message;
					//console.log("errorMessage", errorMessage)
					app.alert.setError(`Account linking failed: ${errorMessage}`);
				});
		} else {
			//console.log("user is already linked")
		}
	}

	const onUnlinkAccount = () => {
		if (props.account) {
			unLinkTwitter(props.userId).then((result) => {
				//console.log(result)
				app.alert.setSuccess('Your account has been unlinked');
				if (props.refreshUser && props.refreshUser instanceof Function)
					props.refreshUser()
			}).catch((error) => {
				//console.log(error)
				app.alert.setError(`Account unlinking failed: ${error.message}`);
			})
		}
	}

	const onUsePhoto = () => {
		console.log("onUsePhoto: ")
	}

	return (
		<Box sx={{
			width: "400px",
			height: "250px",
			display: 'grid',
			gridColumnGap: 10,
			gridTemplateRows: "2fr .1fr .9fr",
			gridTemplateColumns: "2fr 1fr",
			border: "#ccc 1px solid",
			borderRadius: "7px",
			alignItems: "center",
			opacity: props.disabled ? .7 : 1,
		}}>
			<Stack
				ml="20px"
				height="100%"
				alignItems="strat"
				justifyContent="space-around"
			>
				<Typography component="p" variant="h5" textAlign="start">
					{props.title}
				</Typography>
				<Button
					variant="contained"
					disabled={props.disabled}
					disableRipple={props.disabled || props.account}
					disableElevation={props.disabled || props.account}
					onClick={onLinkAccount}
					style={{ display: 'flex', justifyContent: 'space-evenly', width: "90%", textTransform: "none" }}
				>
					{<props.icon />}
					{props.account || props.buttonText}
				</Button>
			</Stack>

			<img
				style={{ width: "140px", height: "140px", borderRadius: "7px", margin: "20px 20px 0" }}
				src={props.image}
				alt={`${props.title} profile image`}
			/>

			<Divider style={{ marginTop: "25px", gridColumn: "1/3" }} />

			<Button
				variant="text"
				disabled={props.disabled || !Boolean(props.account)}
				onClick={onUnlinkAccount}
			>
				UNLINK
			</Button>
			<Button
				variant="text"
				disabled={props.disabled}
				onClick={onUsePhoto}
				sx={{ color: "#525253" }}
			>
				USE THIS PHOTO
			</Button>
		</Box>
	)
}

const UserSettingsAccountPage = (props) => {

	const user = useUser();

	const instagramProvider = {
		name: "instagram",
		token: "provider_token",
		secret: "provider_secret",
	}

	console.log(user.item)

	return (
		<UserSettingsPage title='Account'>
			<Stack
				width="100%"
				direction="row"
				justifyContent="start"
				alignItems="end"
				spacing={2}
			>
				<Typography variant="h5" component="p">
					Communication Channels
				</Typography>
				<Typography
					component="span"
					variant="subtitle2"
					sx={{ color: '#ccc', fontWeight: 500 }}
				>
					Your profile information can be edited below
				</Typography>
			</Stack>
			<div style={{ marginTop: "40px" }} />

			<Stack flex={1} direction="row" justifyContent="start" alignItems="start" spacing={3}>

				{/* ACCOUNT CARDS */}
				<Stack justifyContent="start" alignItems="start" spacing={2}>
					<UserAccountCard
						icon={TwitterIcon}
						title="Twitter Account"
						buttonText="LINK TWITTER"
						provider={'twitterProvider'}
						account={user.item?.twitter_profile?.screen_name ? `@${user.item?.twitter_profile?.screen_name}` : null}
						image={user.item?.twitter_profile?.profile_image?.replace("_normal", "") || ""}
						userId={user.item?.id}
						refreshUser={() => user.refresh()}
					/>

					{/* <UserAccountCard
						disabled
						icon={InstagramIcon}
						buttonText="LINK IG"
						title="Instagram Account"
						provider={instagramProvider}
						image={user.item?.instagram_profile?.profile_name}
						account={user.item?.instagram_profile?.screen_name}
					/> */}
				</Stack>

				{/* SMS/MMS CARD */}
				<Box sx={{
					width: "400px",
					height: "250px",
					display: 'grid',
					gridTemplateRows: "2fr .1fr .9fr",
					border: "#ccc 1px solid",
					borderRadius: "7px",
					alignItems: "center",
				}}>
					<Stack spacing={1} p="20px 20px 0 20px">
						<Typography variant="h5" >
							SMS/MMS
						</Typography>
						<Typography
							sx={{
								color: '#ccc', fontWeight: 500
							}}>
							Your profile information can be edited below
						</Typography>
						<Typography variant="h5">
							{user.item?.sms_number}
						</Typography>
						<Typography
							sx={{ color: '#ccc', fontWeight: 500 }}
						>
							To associate a different number to your account contact your account rep.
						</Typography>
					</Stack>

					<Divider style={{ marginTop: "7px", gridColumn: "1/2" }} />

					<Button
						variant="text"
						disabled={!user.item?.sms_number}
						style={{ justifySelf: "end", paddingRight: "20px" }}
					// onClick={}
					>
						UNLINK
					</Button>
				</Box>
			</Stack>
		</UserSettingsPage>
	)
}

export default UserSettingsAccountPage;