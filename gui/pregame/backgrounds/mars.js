g_BackgroundLayerData.push(
	[
		{
			"offset": (time, width) => 0.10 * width * Math.cos(0.04 * time),
			"sprite": "background-mars1_1",
			"tiling": true,
		},
		{
			"offset": (time, width) => 0.17 * width * Math.cos(0.05 * time) + width / 8,
			"sprite": "background-mars1_2",
			"tiling": false,
		}
	]
);
