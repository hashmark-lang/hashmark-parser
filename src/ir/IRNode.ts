export interface IRNode {
	namespace: string;
	tag: string;
	props: {
		[name: string]: IRNodeList;
	};
}

export type IRNodeList = Array<string | IRNode>;
