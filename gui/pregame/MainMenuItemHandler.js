/**
 * This class sets up the main menu buttons, animates submenu that opens when
 * clicking on category buttons, assigns the defined actions and hotkeys to every button.
 */
class MainMenuItemHandler
{
	constructor(menuItems)
	{
		this.menuItems = menuItems;
		this.lastTickTime = Date.now();

		this.lastOpenItem = undefined;

		this.mainMenu = Engine.GetGUIObjectByName("mainMenu");
		this.mainMenuButtons = Engine.GetGUIObjectByName("mainMenuButtons");
		this.submenu = Engine.GetGUIObjectByName("submenu");
		this.submenuButtons = Engine.GetGUIObjectByName("submenuButtons");

		this.setupMenuButtons(this.mainMenuButtons.children, this.menuItems);
		this.setupHotkeys(this.menuItems);

		this.tooltip = Engine.GetGUIObjectByName("pgToolTip");

		this.updateTooltipLayout(this.mainMenuButtons.children);
	}

	setupMenuButtons(buttons, menuItems)
	{
		buttons.forEach((button, i) => {
			let item = menuItems[i];
			button.hidden = !item;
			if (button.hidden)
				return;

			button.size = new GUISize(
				0, (this.ButtonHeight + this.Margin) * i,
				0, (this.ButtonHeight + this.Margin) * i + this.ButtonHeight,
				0, 0, 100, 0);
			button.caption = item.caption;
			button.tooltip = item.tooltip;
			button.enabled = item.enabled === undefined || item.enabled();
			button.onPress = this.pressButton.bind(this, item, i);
			button.hidden = false;
		});

		if (buttons.length < menuItems.length)
			error("GUI page has space for " + buttons.length + " menu buttons, but " + menuItems.length + " items are provided!");
	}

	/**
	 * Expand selected submenu, or collapse if it already is expanded.
	 */
	pressButton(item, i)
	{
		if (this.submenu.hidden)
		{
			this.performButtonAction(item, i);
		}
		else
		{
			this.closeSubmenu();
			if (this.lastOpenItem && this.lastOpenItem != item)
				this.performButtonAction(item, i);
			else
				this.lastOpenItem = undefined;
		}
	}

	/**
	 * Expand submenu or perform action specified by the button object.
	 */
	performButtonAction(item, i)
	{
		this.lastOpenItem = item;

		if (item.onPress)
			item.onPress();
		else
			this.openSubmenu(i);
	}

	setupHotkeys(menuItems)
	{
		for (let i in menuItems)
		{
			let item = menuItems[i];
			if (item.onPress && item.hotkey)
				Engine.SetGlobalHotkey(item.hotkey, "Press", () => {
					this.closeSubmenu();
					item.onPress();
				});

			if (item.submenu)
				this.setupHotkeys(item.submenu);
		}
	}

	openSubmenu(i)
	{
		this.mainMenuButtons.hidden = true;

		let backButton = {
			"caption": translate("\u25c0 Back"),
			"tooltip": translate("Back to Main Menu."),
			"onPress": () => {
				this.closeSubmenu();
			}
		};
		this.setupMenuButtons(this.submenuButtons.children, [backButton].concat(this.menuItems[i].submenu));

		this.submenu.hidden = false;

		this.updateTooltipLayout(this.submenuButtons.children);
	}

	closeSubmenu()
	{
		this.submenu.hidden = true;
		this.submenu.size = this.mainMenu.size;

		this.mainMenuButtons.hidden = false;

		this.updateTooltipLayout(this.mainMenuButtons.children);
	}

	updateTooltipLayout(buttons)
	{
		let top = this.mainMenuButtons.size.top;
		let size = this.tooltip.size;
		buttons.forEach((button, i) => {
			if (button.hidden)
				return;
			size.top = Math.max(size.top, top + button.size.bottom + this.ButtonHeight);
		});
		size.rtop = 0;
		size.bottom = size.top + 200;
		size.rbottom = 0;
		this.tooltip.size = size;
	}
}

/**
 * Vertical size per button.
 */
MainMenuItemHandler.prototype.ButtonHeight = 40;

/**
 * Distance between consecutive buttons.
 */
MainMenuItemHandler.prototype.Margin = 0;

/**
 * Collapse / expansion speed in pixels per milliseconds used when animating the button menu size.
 */
MainMenuItemHandler.prototype.MenuSpeed = 1.2;
