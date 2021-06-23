function showSpaceMessageBox(width, message, title, buttonCaptions, buttonCodes, callbackArgs)
{
	Engine.PushGuiPage(
		"page_messagebox.xml",
		{
			"width": width,
			"message": message,
			"title": title,
			"buttonCaptions": buttonCaptions
		},
		buttonCode => {
			if (buttonCodes !== undefined && buttonCodes[buttonCode])
				buttonCodes[buttonCode](callbackArgs ? callbackArgs[buttonCode] : undefined);
		});
}
