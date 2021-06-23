/**
 * Currently limited to at most 3 buttons per message box.
 * The convention is to have "cancel" appear first.
 */
function init(data)
{
	new BackgroundHandler(pickRandom(g_BackgroundLayerData), true);

	const textHorizontalPadding = 16;
	const textVerticalPadding = 20;
	const rowHeight = 40;

	// Set title
	Engine.GetGUIObjectByName("messageBoxTitleBar").caption = data.title;

	// Set subject
	let textObj = Engine.GetGUIObjectByName("messageBoxText");
	textObj.caption = data.message;
	if (data.font)
		textObj.font = data.font;
	textObj.size = "" + textHorizontalPadding + " 60 " + (data.width - textHorizontalPadding) + " 100%";

	// Default behaviour
	let cancelHotkey = Engine.GetGUIObjectByName("messageBoxCancelHotkey");
	cancelHotkey.onPress = Engine.PopGuiPage;

	let captions = data.buttonCaptions || [translate("OK")];

	// Calculate size
	let height = (captions.length + 1) * rowHeight + textVerticalPadding * 2 + textObj.getTextSize().height;
	let mbLRDiff = data.width / 2;
	let mbUDDiff = height / 2;
	Engine.GetGUIObjectByName("messageBoxMain").size = "50%-" + mbLRDiff + " 50%-" + mbUDDiff + " 50%+" + mbLRDiff + " 50%+" + mbUDDiff;

	// Set button captions and visibility
	let buttons = [];
	captions.forEach((caption, i) => {
		buttons[i] = Engine.GetGUIObjectByName("messageBoxButton" + (i + 1));
		buttons[i].caption = caption;
		buttons[i].hidden = false;
		buttons[i].onPress = () => {
			Engine.PopGuiPage(i);
		};

		// Convention: Cancel is the last button
		if (i == captions.length - 1)
			cancelHotkey.onPress = buttons[i].onPress;
	});

	// Distribute buttons horizontally
	for (let idx = 0; idx < captions.length; ++idx)
	{
		let offset = (captions.length - idx - 1) * 40;
		buttons[idx].size = "4 100%-" + (offset + 40) + " 100% 100%-" + offset;
	}
}
