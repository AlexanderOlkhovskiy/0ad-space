/**
 * Order in which the tabs should show up.
 */
var g_OrderTabNames = [
	"special",
	"programming",
	"art",
	"audio",
	"maps",
	"history",
	"balancing",
	"community",
	"translators",
	"donators"
];

function init()
{
	new BackgroundHandler(pickRandom(g_BackgroundLayerData), true);

	let creditsPageText = "";
	// Load credits list from the disk and parse them
	for (let category of g_OrderTabNames)
	{
		let json = Engine.ReadJSONFile("gui/credits/texts/" + category + ".json");
		if (!json || !json.Content)
		{
			error("Could not load credits for " + category + "!");
			continue;
		}
		translateObjectKeys(json, ["Title", "Subtitle"]);
		creditsPageText += setStringTags((json.Title || category) + "\n\n", { "font": "sans-bold-20" });
		creditsPageText += parseHelper(json.Content) + "\n\n";
	}

	Engine.GetGUIObjectByName("creditsPageBackButton").caption = translate("\u25c0 Back");
	Engine.GetGUIObjectByName("creditsText").caption = creditsPageText;
}

// Run through a "Content" list and parse elements for formatting and translation
function parseHelper(list)
{
	let result = "";

	for (let object of list)
	{
		if (object.LangName)
			result += setStringTags(object.LangName + "\n", { "font": "sans-bold-16" });

		if (object.Title)
			result += setStringTags(object.Title + "\n", { "font": "sans-bold-16" });

		if (object.Subtitle)
			result += setStringTags(object.Subtitle + "\n", { "font": "sans-bold-16" });

		if (object.List)
		{
			for (let element of object.List)
			{
				let credit;
				if (element.nick && element.name)
					credit = sprintf(translate("%(nick)s — %(name)s"), { "nick": element.nick, "name": element.name });
				else if (element.nick)
					credit = element.nick;
				else if (element.name)
					credit = element.name;

				if (credit)
					result += setStringTags(credit + "\n", { "font": "sans-16" });
			}

			result += "\n";
		}

		if (object.Content)
			result += "\n" + parseHelper(object.Content) + "\n";
	}

	return result;
}
