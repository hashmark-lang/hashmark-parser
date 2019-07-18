export const RootTag = "_root";

export interface IRNode {
	namespace: string;
	tag: string | typeof RootTag;
	props: {
		[name: string]: IRNodeList;
	};
}

export type IRNodeList = Array<string | IRNode>;
