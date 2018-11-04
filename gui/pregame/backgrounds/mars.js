let time_scale = 0.05;

g_BackgroundLayerData.push(
	[
		{
			"offset": (time, width) => -width * 0.65 + 0.05 * width * Math.sin(time * time_scale),
			"sprite": "background-mars1_1",
			"tiling": true,
		},
		{
			"offset": (time, width) => -width * 0.65 + 0.16 * width * Math.sin(time * time_scale),
			"sprite": "background-mars1_2",
			"tiling": true,
		},
		{
			"offset": (time, width) => -width * 0.65 + 0.23 * width * Math.sin(time * time_scale),
			"sprite": "background-mars1_3",
			"tiling": true,
		},
		{
			"offset": (time, width) => -width * 0.65 + 0.28 * width * Math.sin(time * time_scale),
			"sprite": "background-mars1_4",
			"tiling": true,
		}
	]
);
