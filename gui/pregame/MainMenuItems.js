var g_MainMenuItems = [
	{
		"caption": translate("Play Story"),
		"tooltip": translate("Start the story."),
		"onPress": () => {
			Engine.SwitchGuiPage("page_autostart.xml", {
				"mapType": "scenario",
				"map": "maps/scenarios/mars_mountains",
				"settings": {
					"CheatsEnabled": true
				}
			});
		}
	},
	{
		"caption": translate("Load Story"),
		"tooltip": translate("Load a saved game."),
		"onPress": () => {
			Engine.PushGuiPage("page_loadgame.xml");
		}
	},
	{
		"caption": translate("Settings"),
		"tooltip": translate("Change game options."),
		"submenu": [
			{
				"caption": translate("Options"),
				"tooltip": translate("Adjust game settings."),
				"onPress": () => {
					Engine.PushGuiPage(
						"page_options.xml",
						{},
						fireConfigChangeHandlers);
				}
			},
			{
				"caption": translate("Language"),
				"tooltip": translate("Choose the language of the game."),
				"onPress": () => {
					Engine.PushGuiPage("page_locale.xml");
				}
			},
			{
				"caption": translate("Mod Selection"),
				"tooltip": translate("Select and download mods for the game."),
				"onPress": () => {
					Engine.SwitchGuiPage("page_modmod.xml");
				}
			},
		]
	},
	{
		"caption": translate("Scenario Editor"),
		"tooltip": translate('Open the Atlas Scenario Editor in a new window. You can run this more reliably by starting the game with the command-line argument "-editor".'),
		"onPress": () => {
			if (Engine.AtlasIsAvailable())
				showSpaceMessageBox(
					400,
					translate("Are you sure you want to quit 0 A.D. and open the Scenario Editor?"),
					translate("Confirmation"),
					[translate("Yes"), translate("No")],
					[Engine.RestartInAtlas, null]);
			else
				showSpaceMessageBox(
					400,
					translate("The scenario editor is not available or failed to load. See the game logs for additional information."),
					translate("Error"));
		}
	},
	{
		"caption": translate("Credits"),
		"tooltip": translate("Show the 0 A.D. credits."),
		"onPress": () => {
			Engine.PushGuiPage("page_credits.xml");
		}
	},
	{
		"caption": translate("Exit"),
		"tooltip": translate("Exit the game."),
		"onPress": () => {
			showSpaceMessageBox(
				400,
				translate("Are you sure you want to quit 0 A.D.?"),
				translate("Confirmation"),
				[translate("Yes"), translate("No")],
				[Engine.Exit, null]);
		}
	}
];
