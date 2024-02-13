import {
	ComponentItemConfig,
	ItemType,
	LayoutConfig,
} from "golden-layout";

const miniRowConfig: LayoutConfig = {
	root: {
		type: ItemType.column,
		content: [{
			type: "component",
			title: "Init",
			header: { show: "top" },
			componentType: "Content1",
			width: 10,
			componentState: { abc: 'Yhea' },
		} as ComponentItemConfig]
	}
};

export const prefinedLayouts = {
	miniRow: miniRowConfig,
}