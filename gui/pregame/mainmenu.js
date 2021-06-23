
/**
 * This is the handler that coordinates all other handlers.
 */
var g_MainMenuPage;

function init(data, hotloadData)
{
	g_MainMenuPage =
		new MainMenuPage(
			data,
			hotloadData,
			g_MainMenuItems,
			g_BackgroundLayerData,
			g_ProjectInformation,
			g_CommunityButtons);
}
