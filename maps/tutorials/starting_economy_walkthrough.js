Trigger.prototype.tutorialGoals = [
	{
		"instructions": [
			markForTranslation("Welcome to the Space Mod Tutorial!\n"),
			markForTranslation("The Space Mod is a space-themed mod with emphasis on exploration and research.\n")
		]
	},
	{
		"instructions": [
			markForTranslation("You start the mission with the Curiosity rover.\n"),
			markForTranslation("Your first goal is to explore the area and find a suitable base location.\n"),
			markForTranslation("Goal: explore the map to reach 500 units of funding (funding is granted for each percent of map discovery).\n")
		]
		// TODO: add "500 funding" condition
	},
	// TODO: add more items here
	{
		"instructions": [
			markForTranslation("Congratulations, you have finished the tutorial!\n")
		]
	}
];

{
	let cmpTrigger = Engine.QueryInterface(SYSTEM_ENTITY, IID_Trigger);
	cmpTrigger.playerID = 1;
	cmpTrigger.RegisterTrigger("OnInitGame", "InitTutorial", { "enabled": true });
}