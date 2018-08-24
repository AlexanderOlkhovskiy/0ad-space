function MapExplorationTracker() {}

MapExplorationTracker.prototype.Schema =
	"<element name='AwardMapExplorationInterval'>" +
		"<ref name='nonNegativeDecimal'/>" +
	"</element>" +
	"<element name='MapExplorationAward'>" +
		Resources.BuildSchema("nonNegativeDecimal") +
	"</element>";

MapExplorationTracker.prototype.Init = function()
{
	let cmpTimer = Engine.QueryInterface(SYSTEM_ENTITY, IID_Timer);
	this.updateTimer = cmpTimer.SetInterval(
		this.entity, IID_MapExplorationTracker, "AwardMapExploration", 0, +this.template.AwardMapExplorationInterval);
	this.percentMapExplored = 0;
	this.mapExplorationAward = this.template.MapExplorationAward;
};

MapExplorationTracker.prototype.GetPercentMapExplored = function()
{
	let cmpRangeManager = Engine.QueryInterface(SYSTEM_ENTITY, IID_RangeManager);
	let cmpPlayer = Engine.QueryInterface(this.entity, IID_Player);
	return cmpRangeManager.GetPercentMapExplored(cmpPlayer.GetPlayerID());
};

MapExplorationTracker.prototype.AwardMapExploration = function()
{
	let newPercentMapExplored = this.GetPercentMapExplored();
	let percentMapExploredDiff = newPercentMapExplored - this.percentMapExplored;
	if (percentMapExploredDiff == 0)
		return;

	let award = {};
	for (let type of Resources.GetCodes())
		award[type] = +this.mapExplorationAward[type] * percentMapExploredDiff;

	let cmpPlayer = Engine.QueryInterface(this.entity, IID_Player);
	cmpPlayer.AddResources(award);

	this.NotifyPlayer(award);

	let cmpTrigger = Engine.QueryInterface(SYSTEM_ENTITY, IID_Trigger);
	if (cmpTrigger && cmpPlayer)
		cmpTrigger.CallEvent("MapExplored", { "player": cmpPlayer.GetPlayerID(), "prevPercentMapExplored": this.percentMapExplored, "newPercentMapExplored": newPercentMapExplored });

	this.percentMapExplored = newPercentMapExplored;
};

MapExplorationTracker.prototype.NotifyPlayer = function(award)
{
	let awardMessage = "Map exploration award: ";
	let awards = [];
	for (let type of Resources.GetCodes())
		if (award[type] > 0)
			awards.push("" + award[type] + " " + type);
	awardMessage += awards.join(", ");

	let cmpGUIInterface = Engine.QueryInterface(SYSTEM_ENTITY, IID_GuiInterface);
	let cmpPlayer = Engine.QueryInterface(this.entity, IID_Player);
	cmpGUIInterface.PushNotification({
		"players": [cmpPlayer.GetPlayerID()],
		"message": awardMessage
	});
};


Engine.RegisterComponentType(IID_MapExplorationTracker, "MapExplorationTracker", MapExplorationTracker);
