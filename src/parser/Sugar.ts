export interface Sugar {
	tag: string;
	syntax: SugarSyntax;
}

export interface SugarSyntax {
	start: string;
	separator?: string;
	end: string;
}
