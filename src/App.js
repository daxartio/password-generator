import { Icon16CopyOutline, Icon28CheckCircleOutline } from "@vkontakte/icons";
import {
	AppRoot,
	Button,
	Checkbox,
	FormField,
	FormItem,
	IconButton,
	Input,
	Panel,
	PanelHeader,
	Slider,
	Snackbar,
	SplitCol,
	SplitLayout,
	View,
} from "@vkontakte/vkui";
import React from "react";

import "./App.css";

function generatePassword(
	length = 20,
	useNumbers = true,
	useLowercase = true,
	useUppercase = true,
	useSimbols = true,
) {
	var wishList = "";
	if (useNumbers) {
		wishList += "0123456789";
	}
	if (useUppercase) {
		wishList += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	}
	if (useLowercase) {
		wishList += "abcdefghijklmnopqrstuvwxyz";
	}
	if (useSimbols) {
		wishList += "~!@-#$";
	}

	return Array.from(crypto.getRandomValues(new Uint32Array(length)))
		.map((x) => wishList[x % wishList.length])
		.join("");
}

const copyToClipboard = (str) => {
	const el = document.createElement("textarea");
	el.value = str;
	el.setAttribute("readonly", "");
	el.style.position = "absolute";
	el.style.left = "-9999px";
	document.body.appendChild(el);
	el.select();
	document.execCommand("copy");
	document.body.removeChild(el);
};

function App() {
	const [pwdLenght, setPwdLenght] = React.useState(12);
	const [password, setPassword] = React.useState("");
	const [useLowercase, setUseLowercase] = React.useState(true);
	const [useUppercase, setUseUppercase] = React.useState(true);
	const [useNumbers, setUseNumbers] = React.useState(true);
	const [useSimbols, setUseSimbols] = React.useState(true);
	const [snackbar, setSnackbar] = React.useState(null);
	const passwordInput = React.createRef();
	const copyPassword = () => {
		copyToClipboard(passwordInput.current.value);
		showCopied();
	};
	const showCopied = () => {
		if (snackbar) return;
		setSnackbar(
			<Snackbar
				onClose={() => setSnackbar(null)}
				before={
					<Icon28CheckCircleOutline fill="var(--vkui--color_icon_positive)" />
				}
			>
				Copied
			</Snackbar>,
		);
	};
	const generateNew = () => {
		setPassword(
			generatePassword(
				Number(pwdLenght),
				useNumbers,
				useLowercase,
				useUppercase,
				useSimbols,
			),
		);
	};
	const style = {
		width: "100%",
	};
	React.useEffect(() => {
		generateNew();
	}, [pwdLenght, useLowercase, useNumbers, useUppercase, useSimbols]);
	return (
		<AppRoot>
			<SplitLayout header={<PanelHeader separator={false} />}>
				<SplitCol autoSpaced>
					<View activePanel="main">
						<Panel id="main">
							<PanelHeader>Password On</PanelHeader>
							<FormItem>
								<FormField>
									<Input
										getRef={passwordInput}
										type="text"
										readOnly
										style={style}
										placeholder="Password"
										value={password}
										after={
											<IconButton
												hoverMode="opacity"
												aria-label="Copy"
												onClick={copyPassword}
											>
												<Icon16CopyOutline />
											</IconButton>
										}
									/>
								</FormField>
							</FormItem>
							<FormItem top={`Lenght·${pwdLenght}`}>
								<Slider
									min={4}
									max={48}
									step={1}
									value={Number(pwdLenght)}
									onChange={setPwdLenght}
								/>
							</FormItem>
							<FormItem>
								<Checkbox
									checked={useLowercase}
									onChange={() => setUseLowercase(!useLowercase)}
								>
									a-z
								</Checkbox>
								<Checkbox
									checked={useUppercase}
									onChange={() => setUseUppercase(!useUppercase)}
								>
									A-Z
								</Checkbox>
								<Checkbox
									checked={useNumbers}
									onChange={() => setUseNumbers(!useNumbers)}
								>
									0-9
								</Checkbox>
								<Checkbox
									checked={useSimbols}
									onChange={() => setUseSimbols(!useSimbols)}
								>
									~!@-#$
								</Checkbox>
							</FormItem>
							<FormItem>
								<Button size="l" stretched onClick={generateNew}>
									Generate new
								</Button>
							</FormItem>
							{snackbar}
						</Panel>
					</View>
				</SplitCol>
			</SplitLayout>
		</AppRoot>
	);
}

export default App;
